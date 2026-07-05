import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import crypto from "crypto";

dotenv.config();

const token = "8742442972:AAHc39lPyYyLlWIcyRK7NPRoBeCgdO_YfF8";

// Initialize bot
let bot: TelegramBot | null = null;
if (token) {
  try {
    bot = new TelegramBot(token, { polling: true });
    
    bot.on('polling_error', (error) => {
      console.warn('Telegram polling error (ignored, another instance might be running):', error.message);
    });
    
    bot.onText(/\/start(.*)/, (msg, match) => {
      const chatId = msg.chat.id;
      const refCode = match ? match[1].trim() : '';
      
      const appUrl = process.env.APP_URL || "https://ais-dev-dzzvywm772ajvhzlpspbph-370307513775.us-east1.run.app/";
      
      const opts: TelegramBot.SendMessageOptions = {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Open OBO Birr",
                web_app: { url: appUrl }
              }
            ],
            [
              {
                text: "Join Official Channel",
                url: "https://t.me/obobir"
              }
            ]
          ]
        }
      };

      bot?.sendMessage(
        chatId, 
        `Welcome to OBO Birr! 🚀\n\nEarn ETB by completing simple tasks, referring friends, and participating in our community.\n\nClick below to open the app and start earning!`, 
        opts
      );
    });

    console.log("Telegram bot initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Telegram bot:", error);
  }
} else {
  console.log("No TELEGRAM_BOT_TOKEN provided, skipping bot initialization.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", bot_active: !!bot });
  });

  const { requireAuth } = await import("./src/middleware/auth.ts");
  const { getOrCreateUser, getUser } = await import("./src/db/users.ts");

  app.post("/api/auth/telegram", async (req, res) => {
    try {
      const { initData } = req.body;
      if (!initData) {
        return res.status(400).json({ error: "Missing initData" });
      }

      const urlParams = new URLSearchParams(initData);
      const hash = urlParams.get("hash");
      if (!hash) {
        return res.status(400).json({ error: "Missing hash in initData" });
      }

      urlParams.delete("hash");
      const keys = Array.from(urlParams.keys()).sort();
      const dataCheckString = keys.map((key) => `${key}=${urlParams.get(key)}`).join("\n");

      const secretKey = crypto.createHmac("sha256", "WebAppData").update(token).digest();
      const expectedHash = crypto.createHmac("sha256", secretKey).update(dataCheckString).digest("hex");

      if (expectedHash !== hash) {
        return res.status(401).json({ error: "Invalid Telegram authentication" });
      }

      const userStr = urlParams.get("user");
      if (!userStr) {
        return res.status(400).json({ error: "Missing user data" });
      }

      const user = JSON.parse(userStr);
      const telegramId = user.id.toString();
      
      const jwt = await import("jsonwebtoken");
      const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-development";
      const token = jwt.default.sign({ uid: telegramId }, JWT_SECRET, { expiresIn: '30d' });
      
      res.json({ token });
    } catch (error: any) {
      console.error("Telegram auth error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/users/sync", requireAuth, async (req: any, res) => {
    try {
      const user = req.user;
      const dbUser = await getOrCreateUser(user.uid, user.email || '');
      res.json(dbUser);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/users/me", requireAuth, async (req: any, res) => {
    try {
      const user = req.user;
      const dbUser = await getUser(user.uid);
      if (!dbUser) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(dbUser);
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

  // Add demo route for web login without actual Telegram hash validation
  app.post("/api/auth/telegram-demo", async (req, res) => {
    try {
      const { telegramId } = req.body;
      if (!telegramId) return res.status(400).json({ error: "Missing ID" });
      
      const jwt = await import("jsonwebtoken");
      const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-for-development";
      const token = jwt.default.sign({ uid: telegramId }, JWT_SECRET, { expiresIn: '30d' });
      res.json({ token });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  const isProduction = process.env.NODE_ENV === "production" || fs.existsSync(path.join(process.cwd(), "dist", "index.html"));
  
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();

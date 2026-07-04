import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const token = "8742442972:AAHc39lPyYyLlWIcyRK7NPRoBeCgdO_YfF8";

// Initialize bot
let bot: TelegramBot | null = null;
if (token) {
  try {
    bot = new TelegramBot(token, { polling: true });
    
    bot.onText(/\/start(.*)/, (msg, match) => {
      const chatId = msg.chat.id;
      const refCode = match ? match[1].trim() : '';
      
      const appUrl = process.env.APP_URL || "https://t.me/obobirr_bot";
      
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
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

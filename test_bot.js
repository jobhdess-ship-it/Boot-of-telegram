const TelegramBot = require('node-telegram-bot-api');
const token = process.env.TELEGRAM_BOT_TOKEN || "8742442972:AAHc39lPyYyLlWIcyRK7NPRoBeCgdO_YfF8";
console.log("Token length:", token.length);
console.log("Token starts with:", token.substring(0, 10));
const bot = new TelegramBot(token, { polling: true });
bot.on('polling_error', (error) => {
  console.log("Polling error:", error.code, error.message);
  process.exit(1);
});
setTimeout(() => {
  console.log("Success");
  process.exit(0);
}, 3000);

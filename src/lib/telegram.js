// Telegram
const TelegramBot = require("node-telegram-bot-api");
const chatId = process.env.telegram_chat_id;
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.telegram_bot_token;
const rate_limit = 100;
const telegramBuffer = [];
const options = { looper: false, verbose: false };
// Create a bot that uses 'polling' to fetch new updates
const tgBot = new TelegramBot(token, { polling: false });

const bot = {
  sendMessage: (message) => {
    telegramBuffer.push(message);
  },
  stop: () => {
    options.looper = false;
  },
  start: () => {
    options.looper = true;
    sendMessagesWorker();
  }
};

async function sendMessagesWorker() {
  (async () => {
    while (options.looper) {
      try {
        if (telegramBuffer.length > 0) {
          let botMessage = telegramBuffer.shift();
          tgBot.sendMessage(chatId, botMessage, { parse_mode: "HTML" });
        }
      } catch (ex) {
        console.log("Telegram Error");
        if (options.verbose) {
          console.log(ex);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, rate_limit)); // rate limit
    }
  })();
}

module.exports = bot;

const TelegramApi = require("node-telegram-bot-api");

const token = "5442224028:AAGAKmnDcFTsC57CajCUW8gsahAz6sFNsPA";
const chats = {};

const {gameOptions,againOptions}  = require('./options')


const bot = new TelegramApi(token, {
	polling: true,
});
bot.setMyCommands([
	{ command: "/start", description: "Начальное приветствие" },
	{ command: "/info", description: "Получить информацию о пользователе" },
	{ command: "/game", description: "Игра угадайка" },
]);
const startGame = async(chatId) => {
	await bot.sendMessage(
        chatId,
        `Сейчас я загадаю цифру от 0 до 9 а ты должен ее угадать`
    );
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, "Отгадывай", gameOptions);
}
const start = () => {
	bot.on("message", async (msg) => {
		const text = msg.text;
		const chatId = msg.chat.id;
		if (text === "/start") {
			await bot.sendSticker(
				chatId,
				"https://tlgrm.eu/_/stickers/1b5/0ab/1b50abf8-8451-40ca-be37-ffd7aa74ec4d/2.webp"
			);
			return bot.sendMessage(chatId, `добро пожаловать`);
		}
		if (text === "/info") {
			return bot.sendMessage(
				chatId,
				`Привет, ${msg.from.first_name} ${msg.from.last_name}`
			);
		}
		if (text === "/game") {
		   return startGame(chatId)
		}
		return bot.sendMessage(chatId, "Ну ты еблан, вот скажи?");
	});

	bot.on("callback_query",async  (msg) => {
		const data = msg.data;
		const chatId = msg.message.chat.id;

        if (data === '/again') {
        return  startGame(chatId )
        }


        if (data === chats[chatId]) {
            return await bot.sendMessage(chatId,`Поздравляем, ты отгадал цифру ${chats[chatId]}`, againOptions)
        }
        else {
            return await bot.sendMessage(chatId, `ты еблан ${chats[chatId]}`,againOptions)
        }
	
	});
};
start();

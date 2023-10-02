const TelegramApi = require("node-telegram-bot-api");

const token = "5442224028:AAGAKmnDcFTsC57CajCUW8gsahAz6sFNsPA";
const chats = {};

const {
	gameOptions,
	gameOptions1,
	gameOptions2,
	gameOptions3,
	gameOptions4,
	againOptions,
} = require("./options");

const bot = new TelegramApi(token, {
	polling: true,
});
bot.setMyCommands([

	{ command: "/game", description: "Игра миллионер" },
]);
let count = 1;
let win = 0;
let garantWin = 0;
const startGame = async (chatId) => {
	win = 0;
	 garantWin = 0;
	await bot.sendMessage(
		chatId,
		`Игра Кто хочет стать миллионером? - это конкурс викторина, 
		в котором участники должны правильно ответить на ряд вопросов 
		с несколькими вариантами ответов, чтобы перейти на следующий уровень.
		 Всего 7 вопросов, каждый вопрос стоит определенной суммы денег,
		  участники не имеют никаких временных ограничений для предоставления ответа.`
	);
	// 
	chats[chatId] = 1;

	await bot.sendMessage(
		chatId,
		`Что такое зарплата?
	1. Заработная плата — вознаграждение за труд или участие в работе.
	2. Заработная плата - это кредит, который нужно вернуть через несколько лет.
	3. Заработная плата - это специальные купоны для покупок в супермаркете.
	4. Заработная плата - это бесплатные билеты на кино.
	текущий выигрыш:  ${win}
	текущий несгораемый выигрыш: ${garantWin} 
	`,
		gameOptions
	);
};
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
			return startGame(chatId);
		}
		return bot.sendMessage(chatId, "Ну ты еблан, вот скажи?");
	});

	bot.on("callback_query", async (msg) => {
		const data = msg.data;
		const chatId = msg.message.chat.id;

		if (data === "/again") {
			return startGame(chatId);
		}
		if (+data === 5) {
			return await bot.sendMessage(
				chatId,
				`Вы закончили игру!
				Ваш выигрыш: ${win + garantWin}`,
				againOptions
			);
		}
		if (count == 1) {
			if (+data === chats[chatId]) {
				win += 100;
				chats[chatId] = 3;
				count++;
				await bot.sendMessage(
					chatId,
					`что такое трудовой договор?
				1. Трудовой договор - это документ, который нужно подписать, чтобы стать подопечным знаменитого футболиста.
				2. Трудовой договор - это соглашение, которое позволяет работать без каких-либо обязанностей.
				3. Трудовой договор - это соглашение между работником и работодателем, которое устанавливает их взаимные права и обязанности
				4. Трудовой договор - это путешествие в другую страну на работу.
				текущий выигрыш:  ${win}
				текущий несгораемый выигрыш: ${garantWin} `,
					gameOptions
				);
			} else {
				console.log(chats[chatId], "chats");
				console.log(+data, "data");
				await bot.sendMessage(
					chatId,
					`Неправильный ответ!`,
					againOptions
				);
				return await bot.sendMessage(chatId, `Ваш выигрыш: ${win + garantWin} денег`);
				
			}
		} else if (count == 2) {
		
			// несгорайка)
			if (+data === chats[chatId]) {
				win += 100;
				chats[chatId] = 1;
				count++;
				await bot.sendMessage(
					chatId,
					`Что составляет частную собственность граждан?
				1. Частная собственность граждан включает в себя недвижимость, автомобили, финансовые счета и инвестиции, а также личные вещи и имущество.
				2. Частная собственность граждан включает в себя только одежду и обувь.
				3. Частная собственность граждан включает только дома и квартиры, и не включает движимое имущество.
				4. Частная собственность граждан включает только деньги наличными и не включает недвижимость и другую недвижимость.
				текущий выигрыш:  ${win}
				текущий несгораемый выигрыш: ${garantWin} `,
					gameOptions
				);
			} else {
				count = 1;
				console.log(chats[chatId], "chats");
				console.log(+data, "data");
				await bot.sendMessage(
					chatId,
					`Неправильный ответ!`,
					againOptions
				);
				return await bot.sendMessage(chatId, `Ваш выигрыш: ${win + garantWin} денег`);
				
			}
		} else if (count == 3) {
			
			if (+data === chats[chatId]) {
				garantWin += 1000;
				win += 1000;
				chats[chatId] = 2;
				count++;
				await bot.sendMessage(
					chatId,
					`в какой форме могут создаваться организации?
				1. Организации могут создаваться только в форме цирка.
				2. Организации могут создаваться в различных формах, таких как общества с ограниченной ответственностью (ООО), акционерные общества (АО), индивидуальные предприниматели (ИП)
				3. Организации могут создаваться только в форме кулинарного кружка.
				4. Организации могут создаваться только в форме студенческого театрального коллектива.
				текущий выигрыш:  ${win}
				текущий несгораемый выигрыш: ${garantWin}`,
					gameOptions
				);
			} else {
				count = 1;
				console.log(chats[chatId], "chats");
				console.log(+data, "data");
				await bot.sendMessage(
					chatId,
					`Неправильный ответ!`,
					againOptions
				);
				return await bot.sendMessage(chatId, `Ваш выигрыш: ${win + garantWin} денег`);
				
			}
		} else if (count == 4) {
			if (+data === chats[chatId]) {
				win += 1000;
				chats[chatId] = 3;
				count++;
				await bot.sendMessage(
					chatId,
					`Что такое ООО?
				1. Осязаемые Объекты Обетованных
				2. ООО - это организация, занимающаяся производством органических овощей.
				3. ООО (Общество с ограниченной ответственностью) - это форма организации бизнеса, где участники несут ответственность по обязательствам компании в пределах своего вклада
				4. Очень Опытные Осьминоги
				текущий выигрыш:  ${win}
				текущий несгораемый выигрыш: ${garantWin}`,
					gameOptions
				);
			} else {
				count = 1;
				console.log(chats[chatId], "chats");
				console.log(+data, "data");
				await bot.sendMessage(
					chatId,
					`Неправильный ответ!`,
					againOptions
				);
				return await bot.sendMessage(chatId, `Ваш выигрыш: ${win + garantWin} денег`);
				
			}
		} else if (count == 5) {
		
			if (+data === chats[chatId]) {
				win += 1000;
				garantWin += 10000;
				chats[chatId] = 1;
				count++;
				await bot.sendMessage(
					chatId,
					`Что такое акционерское общество?
				1. Акционерское общество - это форма организации, где участники владеют акциями и несут ответственность по обязательствам компании пропорционально своему вкладу.
				2. Акционерское общество - это общество, основанное для проведения акций и спортивных соревнований.
				3. Акционерское общество - это форма организации, которая специализируется на производстве и реализации аккумуляторных батарей.
				4. Акционерское общество - это форма организации, где деятельность направлена на продажу аксессуаров и ювелирных изделий.
				текущий выигрыш:  ${win}
				текущий несгораемый выигрыш: ${garantWin}`,
					gameOptions
				);
			} else {
				count = 1;
				console.log(chats[chatId], "chats");
				console.log(+data, "data");
				await bot.sendMessage(
					chatId,
					`Неправильный ответ!`,
					againOptions
				);
				return await bot.sendMessage(chatId, `Ваш выигрыш: ${win + garantWin} денег`);
				
			}
		} else if (count == 6) {
			if (+data === chats[chatId]) {
				win += 10000;
				chats[chatId] = 1;
				count++;
				await bot.sendMessage(
					chatId,
					`Что такое унитарное предприятие?
				1. Унитарное предприятие - это организационно-правовая форма, при которой все имущество и ответственность принадлежат государству, а оно само осуществляет свою деятельность.
				2. Унитарное предприятие - это предприятие, специализирующееся на производстве униформы и костюмов для театра.
				3. Унитарное предприятие - это предприятие, которое занимается поставкой унитазов и сантехнического оборудования.
				4.  Унитарное предприятие - это предприятие, занимающееся организацией экскурсий и туристических поездок.
				текущий выигрыш:  ${win}
				текущий несгораемый выигрыш: ${garantWin}`,
					gameOptions
				);
			} else {
				count = 1;
				console.log(chats[chatId], "chats");
				console.log(+data, "data");
				await bot.sendMessage(
					chatId,
					`Неправильный ответ!`,
					againOptions
				);
				return await bot.sendMessage(chatId, `Ваш выигрыш: ${win + garantWin} денег`);
				
			}
		} else if (count == 7) {
			if (+data === chats[chatId]) {
				win += 10000;
				chats[chatId] = 4;
				count++;
				await bot.sendMessage(
					chatId,
					`В каких случаях организация может провести процесс ликвидации?
				1. Организация может провести процесс ликвидации, если решила изменить свой фирменный стиль или название.
				2. Организация может провести процесс ликвидации, если столкнулась с праздником национального значения.
				3. Организация может провести процесс ликвидации, если достигла максимального уровня прибыли.
				4. Организация может провести процесс ликвидации в случае принятия решения об упразднении, невозможности дальнейшего функционирования или достижения целей, предусмотренных своим учредительным документом.
				текущий выигрыш:  ${win}
				текущий несгораемый выигрыш: ${garantWin}`,
					gameOptions
				);
			
			} else {
				count = 1;
				console.log(chats[chatId], "chats");
				console.log(+data, "data");
				await bot.sendMessage(
					chatId,
					`Неправильный ответ!`,
					againOptions
				);
				return await bot.sendMessage(chatId, `Ваш выигрыш: ${win + garantWin} денег`);
				
			}
		} else if (count == 8) {
			if (+data === chats[chatId]) {
				win += 632466;
				count++;
				await bot.sendMessage(chatId, `Поздравляем, вы - гусейн гасанов!!!!!`);
				bot.sendMessage(chatId, `Ваш выигрыш: ${win + garantWin} денег`);
				await bot.sendSticker(
					chatId,
					"https://tlgrm.ru/_/stickers/cc6/2f2/cc62f219-5ab1-4040-a1c8-fb1db7ba0491/2.webp"
				);
			} else {
				count = 1;
				console.log(chats[chatId], "chats");
				console.log(+data, "data");
				await bot.sendMessage(
					chatId,
					`Неправильный ответ!`,
					againOptions
				);
				return await bot.sendMessage(chatId, `Ваш выигрыш: ${win + garantWin} денег`);
				
			}
		}
	});
};
start();

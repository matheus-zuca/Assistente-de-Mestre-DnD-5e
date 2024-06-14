const Discord = require('discord.js');
const { token } = require('./auth.json');
intents = Discord.Intents.ALL
const bot = new Discord.Client(intents=intents);
bot.commands = new Discord.Collection();
const functions = require('./modules/functions.js');
const variables = require('./modules/variables.js');



variables.fileSave.readdir("./commands/", (err, file) => {
	if (err) {
		console.log(err);
	}

	let jsfile = file.filter(f => f.split(".").pop() === "js")
	jsfile.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${f} carregou`);
		bot.commands.set(props.help.code, props);
		variables.ajuda[props.help.name] = `${variables.prefix}${props.help.code}: ${props.help.description}`;
	});
});

bot.login(token);

bot.on('message', async message => {
	var comando = (message.content.slice(1)).split(" ");
	var personagemDoJogador = variables.chars[message.author.id];
	let commandFile = bot.commands.get(comando[0].toLowerCase());
	teste = message.content;
	if (message.content.substring(0, 1) == variables.prefix) {
		if (commandFile) {
			commandFile.run(bot, message, comando, personagemDoJogador);
		}
	}



});
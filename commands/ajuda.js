const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    var ajuda = new Discord.MessageEmbed()
        .setTitle("Ajuda")
        .setDescription("Bem vindo ao Assistente de Mestre! Estamos em fase beta por enquanto então se tiver algo errado, sinto muito. Mas vamos arrumar \n ```Agora vamos mostrar as opções que temos disponiveis neste bot```")
                for (const [key, value] of Object.entries(variables.ajuda)) {
                    ajuda.addField(key, value);
                  }
    message.author.send(ajuda);
}

module.exports.help = {
    name: "Ajuda",
    code: "help",
    description: "[FEITO]para verificar os comandos disponíveis"
}
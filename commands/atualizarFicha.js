const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    message.channel.send("O programador está trabalhando neste comando. Em breve servirá para alterar sua ficha");
}

module.exports.help = {
    name: "Atualizar ficha",
    code: "a",
    description: "[EM TESTES] Atualiza partes da sua ficha."
} 
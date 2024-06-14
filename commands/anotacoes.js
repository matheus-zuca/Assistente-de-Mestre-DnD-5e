const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    anotacoes = new Discord.MessageEmbed();
    anotacoes.setTitle("Suas anotações")
    anotacoes.setDescription(personagemDoJogador.Anotacoes)
    message.author.send(anotacoes);
    message.channel.send("Suas anotações foram enviadas!");
}

module.exports.help = {
    name: "Anotação",
    code: "va",
    description: "Envia sua lista de anotações para seu usuário no Discord."
} 
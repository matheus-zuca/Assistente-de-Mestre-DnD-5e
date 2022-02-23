const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    message.channel.send(`Você tem :
    ${personagemDoJogador.Moedas.Pl} PL,
    ${personagemDoJogador.Moedas.Po} PO,
    ${personagemDoJogador.Moedas.Pe} PE
    ${personagemDoJogador.Moedas.Pp} PP
    ${personagemDoJogador.Moedas.Pc} PC`);
}

module.exports.help = {
    name: "Controle Financeiro",
    code: "bal",
    description: "Verifica quanto dinheiro vocÊ tem."
} 
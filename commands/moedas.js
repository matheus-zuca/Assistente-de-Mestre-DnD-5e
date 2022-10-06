const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    if (!comando[1]) {
        message.channel.send(`Você tem :
    ${personagemDoJogador.Moedas.Pl} PL,
    ${personagemDoJogador.Moedas.Po} PO,
    ${personagemDoJogador.Moedas.Pe} PE
    ${personagemDoJogador.Moedas.Pp} PP
    ${personagemDoJogador.Moedas.Pc} PC`);
    }

    moeda = comando[2].substr(comando[2].length - 2);
    qtdeMoedas = comando[2].substr(0, comando[2].length - 2);

    if(comando[1].substr(0,1) == "+"){
        
    }

}

module.exports.help = {
    name: "Controle Financeiro",
    code: "bal",
    description: "Verifica quanto dinheiro você tem."
} 
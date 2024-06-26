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
        return;
    }

    moeda = (comando[2].substr(comando[2].length - 2)).charAt(0).toUpperCase() + (comando[2].substr(comando[2].length - 2)).slice(1).toLowerCase();
    qtdeMoedas = parseInt(comando[1]);

    if (personagemDoJogador.Moedas[moeda] == undefined) {
        message.channel.send("Essa moeda não foi encontrada");
        return;
    }

    if (!isNaN(qtdeMoedas)){
        message.channel.send("Digite um valor númerico");
        return;
    }

    if ((personagemDoJogador.Moedas[moeda] + qtdeMoedas) <= 0) {
        message.channel.send("Você não tem dinheiro suficiente pra isso");
        return;
    } else {
        personagemDoJogador.Moedas[moeda] += qtdeMoedas;
    }

    functions.SaveJson(variables.chars, variables.fileSave);

}

module.exports.help = {
    name: "Controle Financeiro",
    code: "bal",
    description: "Verifica quanto dinheiro você tem."
} 
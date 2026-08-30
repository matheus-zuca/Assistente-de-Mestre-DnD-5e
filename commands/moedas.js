const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    if (!comando[1]) {
        message.channel.send(`Você tem :
    ${personagemDoJogador.Moedas.pl} PL (Peças de Platina),
    ${personagemDoJogador.Moedas.po} PO (Peças de Ouro),
    ${personagemDoJogador.Moedas.pe} PE (Peças de Electrum),
    ${personagemDoJogador.Moedas.pp} PP (Peças de Prata),
    ${personagemDoJogador.Moedas.pc} PC  (Peças de Cobre)`);
        return;
    }

    qtdeMoedas = parseInt((comando[2].substr(comando[2].length - 2)))
    moeda = comando[1].toLowerCase();
    console.log(qtdeMoedas)

    if (personagemDoJogador.Moedas[moeda] == undefined) {
        console.log(moeda)
        message.channel.send("Essa moeda não foi encontrada");
        return;
    }

    if (isNaN(qtdeMoedas)){
        message.channel.send("Digite um valor númerico");
        return;
    }

    if ((personagemDoJogador.Moedas[moeda] + qtdeMoedas) < 0) {
        message.channel.send("Você não tem dinheiro suficiente pra isso");
        return;
    } else {
        personagemDoJogador.Moedas[moeda] += qtdeMoedas;
        message.channel.send("Sua conta bancária foi atualizada!");
    }

    functions.SaveJson(variables.chars, variables.fileSave);

}

module.exports.help = {
    name: "Controle Financeiro",
    code: "bal",
    description: "Verifica quanto dinheiro você tem."
} 
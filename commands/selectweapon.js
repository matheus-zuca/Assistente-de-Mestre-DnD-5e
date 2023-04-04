const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    if (isNaN(comando[1])) {
        message.channel.send("Escolha pelos números");
    } else {
        selecionada = personagemDoJogador.Armas[comando[1] - 1];

        if (selecionada) {
            message.channel.send(`${selecionada} selecionada`);
            personagemDoJogador.ArmaSelecionada = selecionada;
            functions.SaveJson(variables.chars, variables.fileSave);
        }else{
            message.channel.send(`Código não encontrado. Você tem ${personagemDoJogador.Armas.length} armas no seu inventário. Escolha-as pelo número`);
        }
    }
}

module.exports.help = {
    name: "Escolher Arma",
    code: "select",
    description: "[INCONCLUIDO] Selecione sua arma para poder atacar"
} 
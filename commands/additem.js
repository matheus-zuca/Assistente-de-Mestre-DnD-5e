const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {

    console.log(comando[1]);

    var alvo;
    var artigo;

    switch (comando[1].toLowerCase()) {
        case "item":
            alvo = personagemDoJogador.Itens;
            artigo = "o";
            break;
        case "arma":
            alvo = personagemDoJogador.Armas;
            artigo = "a";
            break;
        default:
            alvo = null;
            break;
    }

    note = `${comando.slice(2, comando.lenght).join(" ")}`;
    console.log(note);
    console.log(typeof alvo);
    alvo.push(note);

    if(alvo = personagemDoJogador.Armas && personagemDoJogador.ArmaSelecionada == ""){
        personagemDoJogador.ArmaSelecionada = note;
    }

    functions.SaveJson(variables.chars, variables.fileSave);
    message.channel.send(comando[1].charAt(0).toUpperCase() + comando[1].slice(1) + " salv" + artigo + " com sucesso!");
}

module.exports.help = {
    name: "Adicionar item",
    code: "add",
    description: "[FEITO] Adiciona  itens a seu inventário. Após o comando, especifique se é item ou arma e digite o nome."
} 
const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {

    var alvo;
    note = `${comando.slice(1, comando.lenght).join(" ")}`;

    if (variables.weapons[note]) {
        alvo = personagemDoJogador.Armas;
    } else {
        alvo = personagemDoJogador.Itens;
    }

    console.log(note);
    console.log(typeof alvo);
    alvo.push(note);

    if (alvo = personagemDoJogador.Armas && personagemDoJogador.ArmaSelecionada == "") {
        personagemDoJogador.ArmaSelecionada = note;
    }

    functions.SaveJson(variables.chars, variables.fileSave);
    message.channel.send("Item salvo com sucesso!");
}

module.exports.help = {
    name: "Adicionar item",
    code: "add",
    description: "Adiciona  itens a seu inventário. Após o comando, especifique se é item ou arma e digite o nome."
} 
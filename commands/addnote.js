const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    var note = "";
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    note += `**${today}**: ${comando.slice(1, comando.lenght).join(" ")}`
    personagemDoJogador.Anotacoes.push(note);
    message.delete();
    functions.SaveJson(variables.chars, variables.fileSave);
}

module.exports.help = {
    name: "Adicionar anotação",
    code: "addnote",
    description: "Caso tenha alguma anotação que queira fazer"
} 
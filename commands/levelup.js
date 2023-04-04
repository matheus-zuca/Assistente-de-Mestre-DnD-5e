const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {

    var filter = m => m.author.id === message.author.id;
    message.channel.send("Qual classe você vai subir?");
    var temp = await message.channel.awaitMessages(filter, { max: 1 });
    classe = temp.first().content;

    if (Object.keys(personagemDoJogador.Level).includes(classe)) {
        personagemDoJogador.Level[classe]++;
    }

    var leveltotal = Object.values(personagemDoJogador.Level).reduce((a, b) => { return a + b });
    personagemDoJogador.ValorProficiencia = parseInt(variables.rel_prof_nivel().getKeyByValue(leveltotal));
    functions.SaveJson(variables.chars, variables.fileSave);

}

module.exports.help = {
    name: "Level Up",
    code: "levelup",
    description: "[A PROGRAMAR] Subiu de nivel? Digita !levelup e ele vai fazer a conta automaticamente pra você sobre sua proficiencia. Em breve, rolagem de vida também."
}

Object.prototype.getKeyByValue = function (value) {
    for (var key in this) {
        if (this[key].includes(value)) {
            return key;
        }
    }
}
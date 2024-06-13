const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {

    if (!comando[1]) {
        message.channel.send(`Você tem ${personagemDoJogador.XP} pontos de Experiencia`);
        return;
    }

    if (isNaN(parseInt(comando[1]))) {
        return;
    }

    xpAtual = personagemDoJogador.XP
    personagemDoJogador.XP += parseInt(comando[1])
    message.channel.send(`XP atualizado. Você tem ${personagemDoJogador.XP} pontos de Experiencia`);

    var leveltotal = Object.values(personagemDoJogador.Level).reduce((a, b) => { return a + b });

    if (personagemDoJogador.XP < variables.niveis()[leveltotal + 1]) {
        return;
    }

    message.channel.send("Você subiu de nivel!")
    var filter = m => m.author.id === message.author.id;

    classe = ""
    while (!Object.keys(personagemDoJogador.Level).includes(classe)) {
        message.channel.send("Qual classe você quer subir?");
        var temp = await message.channel.awaitMessages(filter, { max: 1 });
        classe = temp.first().content;
    }
    personagemDoJogador.Level[classe]++;
    leveltotal++;

    personagemDoJogador.ValorProficiencia = parseInt(variables.rel_prof_nivel().getKeyByValue(leveltotal));

    dadoDeVida = variables.rel_dv_class().getKeyByValue(classe)

    message.channel.send(`Seu dado de vida é um ${dadoDeVida}`)
    message.channel.send(`Vamos ver sua sorte...`)
    vidaSomada = functions.Rolagem(1, parseInt(dadoDeVida.slice(1)))
    message.channel.send(`Você ganhou ${vidaSomada} pontos de vida`)
    personagemDoJogador.HP += vidaSomada


    //functions.SaveJson(variables.chars, variables.fileSave);

}

module.exports.help = {
    name: "XP",
    code: "xp",
    description: "[A PROGRAMAR] Calcula e atualiza o nível de proficiência do seu personagem baseado na sua subida de nivel."
}

Object.prototype.getKeyByValue = function (value) {
    for (var key in this) {
        if (this[key].includes(value)) {
            return key;
        }
    }
}
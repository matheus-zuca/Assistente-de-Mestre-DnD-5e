const Discord = require('discord.js');
const prefix = require('../auth.json');
const variables = require('../modules/variables.js');
const functions = require('../modules/functions.js');

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    if (personagemDoJogador.Level.Clerigo == 0 && personagemDoJogador.Level.Druida == 0 && personagemDoJogador.Level.Paladino == 0 && personagemDoJogador.Level.Mago == 0) {
        message.channel.send("Não é necessário preparar magias pras suas classes atuais")
        return;
    }

    message.channel.send("Pra qual classe quer preparar as Magias? Digite-a corretamente, sem acento");
    var filter = m => m.author.id === message.author.id;
    temp = await message.channel.awaitMessages(filter, { max: 1 });
    resposta = temp.first().content;

    if (!personagemDoJogador.Level[resposta]) {
        message.channel.send(`Classe Inválida. Digite ${prefix}${this.help.code} e tente novamente`);
        return;
    }

    habilidadeConjuradora = variables.rel_class_habconju().getKeyByValue(resposta);
    magiasPreparadas = variables.qtde_magias_preparadas(personagemDoJogador[habilidadeConjuradora], personagemDoJogador.Level[resposta]);

    message.channel.send(magiasPreparadas);


}

module.exports.help = {
    name: "Separar Magias Preparadas",
    code: "prep",
    description: "Escolher as Magias que serão preparadas no dia"
}

Object.prototype.getKeyByValue = function (value) {
    for (var key in this) {
        if (this[key].includes(value)) {
            return key;
        }
    }
}

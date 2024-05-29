const Discord = require('discord.js');
const prefix = require('../auth.json');
const variables = require('../modules/variables.js');
const functions = require('../modules/functions.js');

module.exports.run = async (bot, message, comando, personagemDoJogador) => {

    lvl_prep_magia = 0;
    text_prep_magia = ""
    total_magias_prep = 0;
    variables.Classes_Prep_Magia.forEach(className => {
        lvl_prep_magia += personagemDoJogador.Level[className];
        if(personagemDoJogador.Level[className]>0){
            text_prep_magia += className + "\n"
        }
    });

    if (lvl_prep_magia == 0) {
        message.channel.send("Não é necessário preparar magias pras suas classes atuais")
        return;
    }


    message.channel.send(`Pra qual classe quer preparar as Magias? Você pode preparar magias para as suas seguintes classes:\n ${text_prep_magia}`);
    var filter = m => m.author.id === message.author.id;
    temp = await message.channel.awaitMessages(filter, { max: 1 });
    resposta = temp.first().content;

    if (!personagemDoJogador.Level[resposta]) {
        message.channel.send(`Classe Inválida. Digite ${prefix}${this.help.code} e tente novamente`);
        return;
    }

    //habilidadeConjuradora = variables.rel_class_habConju().getKeyByValue(resposta);
    magiasPreparadas = 0//variables.qtde_magias_preparadas(personagemDoJogador[habilidadeConjuradora], personagemDoJogador.Level[resposta]);

    message.channel.send(`Você pode preparar ${magiasPreparadas} magias de ${resposta}\n Você pode escolher as seguintes magias:`);

    console.log(variables.rel_class_magias()[resposta]);

}

module.exports.help = {
    name: "Separar Magias Preparadas",
    code: "prep",
    description: "Separa as magias que serão preparadas no dia"
}

Object.prototype.getKeyByValue = function (value) {
    for (var key in this) {
        if (this[key].includes(value)) {
            return key;
        }
    }
}

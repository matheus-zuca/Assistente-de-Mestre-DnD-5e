const Discord = require('discord.js');
const prefix = require('../auth.json');
const variables = require('../modules/variables.js');
const functions = require('../modules/functions.js');

module.exports.run = async (bot, message, comando, personagemDoJogador) => {

    var magia = comando.slice(1, comando.lenght).join(" ");

    if(magia == ""){
        message.channel.send(personagemDoJogador.Magias_Preparadas.sort().reduce((acc, curr) => {
            acc += curr + "\n";
            return acc;
        }, ""))

        return;
    }

    for(var classe in variables.Classes_Prep_Magia){
        if(personagemDoJogador.Level[variables.Classes_Prep_Magia[classe]] == 0){
            continue;
        }
        magias_conhecidas = variables.rel_class_magias()[variables.Classes_Prep_Magia[classe]][personagemDoJogador.Level[variables.Classes_Prep_Magia[classe]]]
        for(var key in magias_conhecidas){
            if(magias_conhecidas[key] > 0){
                lvl_max_permitido = key;
            }
        }

        if(variables.spells[magia].classes.includes(variables.Classes_Prep_Magia[classe]) && variables.spells[magia].Nivel <= lvl_max_permitido){
            console.log(variables.spells[magia].classes.includes(variables.Classes_Prep_Magia[classe]))
            console.log(variables.Classes_Prep_Magia[classe])
            personagemDoJogador.Magias_Preparadas.push(magia)
            message.channel.send("Magia Preparada com Sucesso")
            return;
        }
    }

    message.channel.send("Não foi possível encontrar a magia em questão")


    /*lvl_prep_magia = 0;
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

    habilidadeConjuradora = variables.rel_class_habConju().getKeyByValue(resposta);
    magiasPreparadas = variables.qtde_magias_preparadas(personagemDoJogador[habilidadeConjuradora], personagemDoJogador.Level[resposta]);

    message.channel.send(`Você pode preparar ${magiasPreparadas} magias de ${resposta}\n`);
    magias = variables.rel_class_magias()[resposta][personagemDoJogador.Level[resposta]]
    lvl_magias = {}
    lvl_max_permitido = 0;

    for(var key in magias){
        if(magias[key] > 0){
            lvl_magias[key] = magias[key]
            lvl_max_permitido = key;
        }
    }

    todas_magias = [];
    for(var i = lvl_max_permitido; i>=0; i--){
        for(var magia in variables.spells){
            if(variables.spells[magia].Nivel == i && variables.spells[magia].classes.includes(resposta)){
                todas_magias.push(`${magia} - Magia de ${i}º Ciclo`)
            }
        }  
    }

    EmbedMagia = new Discord.MessageEmbed().setTitle("Você pode escolher as seguintes magias:");
    EmbedMagia.setDescription(todas_magias);

    message.channel.send(EmbedMagia);*/

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

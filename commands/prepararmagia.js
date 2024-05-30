const Discord = require('discord.js');
const prefix = require('../auth.json');
const variables = require('../modules/variables.js');
const functions = require('../modules/functions.js');

module.exports.run = async (bot, message, comando, personagemDoJogador) => {

    var magia = comando.slice(1, comando.length).join(" ");

    if(magia == ""){
        magiasAtuais = []
        for(let classe in personagemDoJogador.Magias_Preparadas){
            if(!(typeof(personagemDoJogador.Magias_Preparadas[classe]) === 'function')){
                magiasAtuais = magiasAtuais.concat(personagemDoJogador.Magias_Preparadas[classe])
            }
        }

        if(magiasAtuais.length == 0){
            message.channel.send("Você não tem nenhuma magia preparada")  
        }else{
            message.channel.send(magiasAtuais.sort().reduce((acc, curr) => {
                acc    += curr + "\n";
                return acc;
            }, ""))
        }
        
        return;
    }

    for(var classe in variables.Classes_Prep_Magia){
        if(typeof(variables.Classes_Prep_Magia[classe]) === 'function'){
            break;
        }

        if(variables.spells[magia] == undefined){
            message.channel.send("Magia não encontrada");
            return;
        }

        if(personagemDoJogador.Level[variables.Classes_Prep_Magia[classe]] == 0){
            continue;
        }
        
        magias_conhecidas = variables.rel_class_magias()[variables.Classes_Prep_Magia[classe]][personagemDoJogador.Level[variables.Classes_Prep_Magia[classe]]]
        for(var key in magias_conhecidas){
            if(magias_conhecidas[key] > 0){
                lvl_max_permitido = key;
            }
        }

        
        if(!(variables.spells[magia].classes.includes(variables.Classes_Prep_Magia[classe]) && variables.spells[magia].Nivel <= lvl_max_permitido)){
            continue;
        }

        lvl_magia = variables.spells[magia].Nivel;

        if (personagemDoJogador.Magias_Preparadas[variables.Classes_Prep_Magia[classe]].includes(magia)){
            message.channel.send("Você já tem essa magia preparada")
            return;
        }

        if(personagemDoJogador.Magias_Preparadas[variables.Classes_Prep_Magia[classe]].length == (parseInt(functions.GetHabilidadeConjuradora(personagemDoJogador, variables.Classes_Prep_Magia[classe])) + personagemDoJogador.Level[variables.Classes_Prep_Magia[classe]])){
            message.channel.send("Você já preparou todas as magias possiveis.")
            return;
        }else{
            personagemDoJogador.Magias_Preparadas[variables.Classes_Prep_Magia[classe]].push(magia)
            functions.SaveJson(variables.chars, variables.fileSave);
            message.channel.send("Magia Preparada com Sucesso")
            return;
        }
    }

    message.channel.send("Você não precisa preparar essa magia ou não tem nível suficiente para ela")
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

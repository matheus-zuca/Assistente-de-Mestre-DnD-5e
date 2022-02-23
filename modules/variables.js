const Discord = require('discord.js');
const functions = require("../modules/functions.js");

var Pericias = {
    "Força": ["Atletismo"],
    "Destreza": ["Acrobacia", "Prestidigitação", "Furtividade"],
    "Constituição": [],
    "Inteligência": ["Arcanismo", "História", "Investigação", "Natureza", "Religião"],
    "Sabedoria": ["Lidar", "Intuição", "Medicina", "Percepção", "Sobrevivência"],
    "Carisma": ["Enganação", "Intimidação", "Atuação", "Persuasão"]
}

module.exports = {

    ajuda: {

    },


    Pericias: {
        "Força": ["Atletismo"],
        "Destreza": ["Acrobacia", "Prestidigitação", "Furtividade"],
        "Constituição": [],
        "Inteligência": ["Arcanismo", "História", "Investigação", "Natureza", "Religião"],
        "Sabedoria": ["Lidar", "Intuição", "Medicina", "Percepção", "Sobrevivência"],
        "Carisma": ["Enganação", "Intimidação", "Atuação", "Persuasão"]
    },

    arrayHabilidades: function() {
        return Object.keys(Pericias);
    },

    chars: require('../chars.json'),

    weapons: require('../weaponsinfo.json'),

    fileSave: require('fs'),

    sheetsinfo: require('../sheetsinfo.json'),

    rel_prof_nivel: function () {
        return this.sheetsinfo.LevelProficiencia;
    },

    rel_dv_class: function () {
        return this.sheetsinfo.ClasseDadoVida;
    },

    classes: function () {
        var arrP = Object.values(this.rel_dv_class());
        var arrFP = [];

        for (i = 0; i < arrP.length; i++) {
            for (j = 0; j < arrP[i].length; j++) {
                arrFP.push(arrP[i][j]);
            }
        }

        return arrFP;
    }

}
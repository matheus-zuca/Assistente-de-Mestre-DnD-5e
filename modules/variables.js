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

    arrayHabilidades: function () {
        return Object.keys(Pericias);
    },

    chars: require('../chars.json'),

    //weapons: require('../weaponsinfo.json'),

    fileSave: require('fs'),

    spells: require('../spellsinfo.json'),

    sheetsinfo: require('../sheetsinfo.json'),

    racas: function () {
        return Object.keys(this.sheetsinfo.Raças);
    },

    qtde_magias_preparadas: function (habilidade, nivel) {
        return habilidade + nivel;
    },

    rel_class_habConju: function () {
        return this.sheetsinfo.Relacao_Classe_HabilidadeConjuradora;
    },

    rel_prof_nivel: function () {
        return this.sheetsinfo.LevelProficiencia;
    },

    rel_dv_class: function () {
        return this.sheetsinfo.Relacao_Classe_DadoVida;
    },

    rel_class_bal: function () {
        return this.sheetsinfo.Relacao_Classe_Riqueza;
    },

    rel_class_habProf: function () {
        return this.sheetsinfo.Relacao_Classe_HabilidadeProficiencia;
    },

    rel_ante_prof: function () {
        return this.sheetsinfo.Relacao_Antecedente_Proficiencia;
    },

    antecedentes: function () {
        var antecedenteTemp = [];
        for (const [key, value] of Object.entries(this.rel_ante_prof())){
            antecedenteTemp = antecedenteTemp.concat(value);
        }

        antecedente = antecedenteTemp.filter((item, i) => antecedenteTemp.indexOf(item) === i).sort();

        return antecedente;
    },

    rel_class_perProf: function(){
        return this.sheetsinfo.Relacao_Classe_PericiasProficiencia;
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
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

    Classes_Prep_Magia:["Clerigo", "Druida", "Paladino", "Mago"],

    prefix: "/",

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

    Ferramentas_de_Artesão: [
        "Feramentas de Tecelão",
        "Ferramentas de Carpintaria",
        "Ferramentas de Cartografia",
        "Ferramentas de Ceramista",
        "Ferramentas de Cozinha",
        "Ferramentas de Couraria",
        "Ferramentas de Entalhador",
        "Ferramentas de Ferreiro",
        "Ferramentas de Funileiro",
        "Ferramentas de Joalheria",
        "Ferramentas de Pedraria",
        "Ferramentas de Sapataria",
        "Ferramentas de Soprador de Vidro",
        "Suprimentos de Alquimia",
        "Suprimentos de Caligrafia",
        "Suprimentos de Cervejaria",
        "Suprimentos de Pintura"
    ],

    Alinhamentos: ["Leal e Bom", "Leal e Neutro", "Leal e Mau", "Neutro e Bom", "Neutro", "Neutro e Mau", "Caótico e Bom", "Caótico e Neutro", "Caótico e Mau"],

    arrayHabilidades: function () {
        return Object.keys(Pericias);
    },

    Alinhamentos: ["Leal e Bom", "Leal e Neutro", "Leal e Mau", "Neutro e Bom", "Neutro", "Neutro e Mau", "Caótico e Bom", "Caótico e Neutro", "Caótico e Mau"],

    chars: require('../chars.json'),

    weapons: require('../weaponsinfo.json'),

    armors: require('../armorinfo.json'),

    fileSave: require('fs'),

    spells: require('../spellsinfo.json'),

    sheetsinfo: require('../sheetsinfo.json'),

    niveis: function(){
        return this.sheetsinfo.Niveis;
    },

    racas: function () {
        return Object.keys(this.sheetsinfo.Raças);
    },

    qtde_magias_preparadas: function (Personagem) {
        return functions.GetHabilidadeConjuradora(Personagem) + Personagem.Nivel;
    },

    rel_class_magias: function(){
        return this.sheetsinfo.Relacao_Classe_Magias;
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

    rel_class_equip: function(){
        return this.sheetsinfo.Relacao_Classe_Equipamento;
    },

    rel_ante_prof_pericia: function () {
        return this.sheetsinfo.Relacao_Antecedente_Proficiencia_Pericia;
    },

    rel_raca_hab: function () {
        return this.sheetsinfo.Relacao_Raca_Habilidades;
    },

    antecedentes: function () {
        var antecedenteTemp = [];
        for (const [key, value] of Object.entries(this.rel_ante_prof_pericia())) {
            antecedenteTemp = antecedenteTemp.concat(value);
        }

        antecedente = antecedenteTemp.filter((item, i) => antecedenteTemp.indexOf(item) === i).sort();

        return antecedente;
    },

    rel_class_perProf: function () {
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
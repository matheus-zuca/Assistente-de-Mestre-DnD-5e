const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");
var PersonagemNovo = {};

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    if (!personagemDoJogador) {
        result = "Sua ficha está sendo criada. Digite o nome de seu personagem: ";
        var filter = m => m.author.id === message.author.id;

        message.channel.send(result);
        var temp = await message.channel.awaitMessages(filter, { max: 1 });
        nomePersonagem = temp.first().content;

        PersonagemNovo = {
            Personagem: nomePersonagem,
            Level: {
                "Barbaro": 0,
                "Bardo": 0,
                "Clerigo": 0,
                "Druida": 0,
                "Guerreiro": 0,
                "Monge": 0,
                "Paladino": 0,
                "Ranger": 0,
                "Ladino": 0,
                "Feiticeiro": 0,
                "Warlock": 0,
                "Mago": 0
            },
            CA: 0,
            XP: 0,
            Inspiração: 0,
            ValorProficiencia: 2,
            Moedas: {
                "Pl": 0,
                "Po": 0,
                "Pe": 0,
                "Pp": 0,
                "Pc": 0
            },
            Itens: [],
            Anotacoes: [],
            Sucessos: 0,
            Falhas: 0,
            ArmaSelecionada: ""
        }

        await DefinirRaca(message, filter);
        await DefinirClasse(message, filter);
        await DefinirAtributos(message, filter);
        await DefinirProficiencias(message, filter);

        personagemDoJogador = PersonagemNovo;

        functions.SaveJson(variables.chars, variables.fileSave);

        result = "Sua ficha foi criada";
    } else {
        result = "Sua ficha já está feita. Digite !c se quiser consulta-la ou !a se quiser altera-la. Se quiser exclui-la, digite e";
        message.channel.send(result);
    }

    if (result) {
        message.channel.send(result);
    }
}

async function DefinirRaca(message, filter) {
    var raca = "";
    while (!variables.racas().includes(raca)) {
        message.channel.send("Agora diga sua raça. Essa mensagem irá aparecer novamente se escolher uma raça não disponivel:");
        temp = await message.channel.awaitMessages(filter, { max: 1 });
        raca = temp.first().content;
    }
}

async function DefinirClasse(message, filter) {
    var classe = "";
    while (!variables.classes().includes(classe)) {
        message.channel.send("Agora diga sua classe. Essa mensagem irá aparecer novamente se escolher uma classe não disponivel:");
        temp = await message.channel.awaitMessages(filter, { max: 1 });
        classe = temp.first().content;
    }

    dadoRolagem = variables.rel_class_bal().getKeyByValue(classe);
    moedasInicio = functions.Rolagem(dadoRolagem[0], dadoRolagem[2]).reduce((a, b) => a + b, 0);
    if (classe != "Monge") {
        moedasInicio *= 10;
    }
    PersonagemNovo.Level[classe]++;
    PersonagemNovo.DadoVida = variables.rel_dv_class().getKeyByValue(classe);
    PersonagemNovo.Moedas.Po = moedasInicio;
}

async function DefinirAtributos(message, filter) {
    message.channel.send("Ok, " + nomePersonagem + ". \n Vamos aos atributos");

    var atribs = [];
    var atribOrdem = [];
    var modOrdem = [];

    for (var i = 0; i < 6; i++) {
        atribs[i] = functions.RolagemAtributos(4, 6);
    }

    for (var i = 0; i < 6; i++) {
        var atribV = await functions.EscolhaAtributos(atribs, i, message, "", variables.arrayHabilidades());
        atribs.splice(atribs.indexOf(atribV), 1);
        atribOrdem[i] = atribV;
        modOrdem[i] = functions.ConvertHabilidadeAtrib(atribOrdem[i]);
    }

    PersonagemNovo.HPMax = parseInt(PersonagemNovo.DadoVida.splice(1)) + modOrdem[2];
    PersonagemNovo.HabilidadeForça = atribOrdem[0];
    PersonagemNovo.HabilidadeDestreza = atribOrdem[1];
    PersonagemNovo.HabilidadeConstituição = atribOrdem[2];
    PersonagemNovo.HabilidadeInteligência = atribOrdem[3];
    PersonagemNovo.HabilidadeSabedoria = atribOrdem[4];
    PersonagemNovo.HabilidadeCarisma = atribOrdem[5];
    PersonagemNovo.Força = modOrdem[0];
    PersonagemNovo.Destreza = modOrdem[1];
    PersonagemNovo.Constituição = modOrdem[2];
    PersonagemNovo.Inteligência = modOrdem[3];
    PersonagemNovo.Sabedoria = modOrdem[4];
    PersonagemNovo.Carisma = modOrdem[5];
}

async function DefinirProficiencias(message, filter) {
    var profEsc = [];

    message.channel.send("Agora vamos para as Proficiencias! Por padrão, temos duas Habilidades e duas Pericias. Se tiver mais, pode alterar a ficha depois. \n");

    for (var i = 0; i < 4; i++) {
        if (i < 2) {
            profEsc[i] = await functions.EscolherProficiencia(message, arrayHabilidades);
        } else {
            profEsc[i] = await functions.EscolherProficiencia(message, functions.arrayPericias());
        }
    }

    PersonagemNovo.Proficiencias = [profEsc[0], profEsc[1], profEsc[2], profEsc[3]];
}

module.exports.help = {
    name: "Criar Ficha",
    code: "m",
    description: "[EM TESTES] Cria a ficha de personagem do zero."
}

Object.prototype.getKeyByValue = function (value) {
    for (var key in this) {
        if (this[key].includes(value)) {
            return key;
        }
    }
}
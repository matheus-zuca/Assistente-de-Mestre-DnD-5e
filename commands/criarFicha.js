const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");
var PersonagemNovo = {};
var nomeClasse;

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    //if (!personagemDoJogador) {
    result = "Sua ficha está sendo criada. Digite o nome de seu personagem: ";
    var filter = m => m.author.id === message.author.id;

    message.channel.send(result);
    var temp = await message.channel.awaitMessages(filter, { max: 1 });
    nomePersonagem = temp.first().content;

    PersonagemNovo = {
        Nome: nomePersonagem,
        Raca: "",
        Inspiracao: 0,
        Level: {
            Barbaro: 0,
            Bardo: 0,
            Clerigo: 0,
            Druida: 0,
            Guerreiro: 0,
            Monge: 0,
            Paladino: 0,
            Ranger: 0,
            Ladino: 0,
            Feiticeiro: 0,
            Warlock: 0,
            Mago: 0,
        },
        HP: 0,
        CA: 0,
        HPMax: 0,
        DadoVida: "",
        Dados: 0,
        Força: 0,
        Destreza: 0,
        Constituicao: 0,
        Inteligencia: 0,
        Sabedoria: 0,
        Carisma: 0,
        Proficiencias: [],
        ValorProficiencia: 0,
        Itens: [],
        Anotacoes: [],
        Moedas: {
            Pl: 0,
            Po: 0,
            Pe: 0,
            Pp: 0,
            Pc: 0
        },
        ArmaSelecionada: "",
        Armas: [],
        Sucessos: 0,
        Falhas: 0,
        Magias_Preparadas: {}
    }
    

    await DefinirRaca(message, filter);
    await DefinirClasse(message, filter);
    await DefinirAtributos(message, filter);
    await DefinirAntecedentes(message, filter);
    await DefinirProficiencias(message, filter);


    personagemDoJogador = PersonagemNovo;

    //functions.SaveJson(variables.chars, variables.fileSave);

    result = "Sua ficha foi criada";
    /*} else {
        result = "Sua ficha já está feita. Digite !c se quiser consulta-la ou !a se quiser altera-la. Se quiser exclui-la, digite e";
        message.channel.send(result);
    }*/

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

    PersonagemNovo.Raca = raca;
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
    nomeClasse = classe;
    PersonagemNovo.Level[classe]++;
    PersonagemNovo.Magias_Preparadas[classe] = [];
    PersonagemNovo.DadoVida = variables.rel_dv_class().getKeyByValue(classe);
    PersonagemNovo.Moedas.Po = moedasInicio;
}

async function DefinirAntecedentes(message, filter) {
    var profEsc = [];
    message.channel.send("Ok, " + nomePersonagem + ". \n Agora vamos escolher seu antecedente. Isso é o que define o que seu personagem era antes de se tornar um aventureiro");

    mensagem = "As opções são:"
    for (i = 0; i < variables.antecedentes().length; i++) {
        mensagem += variables.antecedentes()[i] + "\n";
    }

    resposta = "";
    while (!variables.antecedentes().includes(resposta)) {
        message.channel.send(mensagem);
        temp = await message.channel.awaitMessages(filter, { max: 1 });
        resposta = temp.first().content;
    }

    for (var i in Object.entries(variables.rel_ante_prof())) {
        if (Object.entries(variables.rel_ante_prof())[i][0]) {
            if (Object.entries(variables.rel_ante_prof())[i][1].includes(resposta)) {
                profEsc.push(Object.entries(variables.rel_ante_prof())[i][0]);
            }
        }
    }

    console.log(profEsc);

    if (!PersonagemNovo.Proficiencias) {
        PersonagemNovo.Proficiencias = [];
    }

    PersonagemNovo.Proficiencias.push(profEsc);

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

    console.log(PersonagemNovo.DadoVida);
    PersonagemNovo.HPMax = parseInt(PersonagemNovo.DadoVida.slice(1)) + modOrdem[2];
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
    periciasDisponiveis = [];
    if (variables.rel_class_perProf()[nomeClasse].Pericias) {
        periciasDisponiveis = variables.rel_class_perProf()[nomeClasse].Pericias;
    } else {
        for (var i in Object.values(variables.Pericias)) {
            if (typeof (Object.values(variables.Pericias)[i]) == "function") {

            } else {
                periciasDisponiveis = periciasDisponiveis.concat(Object.values(variables.Pericias)[i]);
                console.log(Object.values(variables.Pericias)[i])
                console.log(periciasDisponiveis);
            }
        }
    }

    if (!PersonagemNovo.Proficiencias) {
        PersonagemNovo.Proficiencias = [];
    }

    message.channel.send(`Agora vamos para as Proficiencias!\n Você, como ${nomeClasse} tem direito a escolher ${variables.rel_class_perProf()[nomeClasse].Quantidade} pericias.`);

    for (var i = 0; i < variables.rel_class_perProf()[nomeClasse].Quantidade; i++) {
        var atribV = await functions.EscolherProficiencia(message, periciasDisponiveis);
        periciasDisponiveis.splice(periciasDisponiveis.indexOf(atribV), 1);
        PersonagemNovo.Proficiencias.push(atribV);
    }

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
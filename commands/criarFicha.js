const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");
var PersonagemNovo = {};
var nomeClasse;

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    /*if (personagemDoJogador) {
        message.channel.send(`Sua ficha já está feita. Digite ${variables.prefix}c se quiser consulta-la ou ${variables.prefix}a se quiser altera-la. Se quiser exclui-la, digite e`)
        return;
    }*/


    var filter = m => m.author.id === message.author.id;
    message.channel.send("Sua ficha está sendo criada. Digite o nome de seu personagem: ");
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


    await DefinirAtributos(message, filter);
    await DefinirRaca(message, filter);
    await DefinirClasse(message, filter);
    await DefinirAntecedentes(message, filter);
    await DefinirProficiencias(message, filter);


    personagemDoJogador = PersonagemNovo;

    //functions.SaveJson(variables.chars, variables.fileSave);
    var ficha = new Discord.MessageEmbed()
					.setTitle("Ficha de Personagem")
					.addFields(
						{ name: 'Nome:', value: personagemDoJogador.Nome, inline: true },
						{ name: "Raça", value: personagemDoJogador.Raça, inline: true },
						{ name: "Classe e Nivel", value: functions.GetClass(personagemDoJogador), inline: true },
						{ name: "Tendência", value: "Alguma", inline: true },
						{ name: "HP", value: personagemDoJogador.HP + " (" + personagemDoJogador.HPMax + ")", inline: true },
						{ name: "CA", value: personagemDoJogador.CA, inline: true }
					)
					.addField("\u200B", "\u200B")
					.addFields(
						{ name: "Força", value: personagemDoJogador.HabilidadeForça + " (" + personagemDoJogador.Força + ")", inline: true },
						{ name: "Destreza", value: personagemDoJogador.HabilidadeDestreza + " (" + personagemDoJogador.Destreza + ")", inline: true },
						{ name: "Constituição", value: personagemDoJogador.HabilidadeConstituição + " (" + personagemDoJogador.Constituição + ")", inline: true },
						{ name: "Inteligência", value: personagemDoJogador.HabilidadeInteligência + " (" + personagemDoJogador.Inteligência + ")", inline: true },
						{ name: "Sabedoria", value: personagemDoJogador.HabilidadeSabedoria + " (" + personagemDoJogador.Sabedoria + ")", inline: true },
						{ name: "Carisma", value: personagemDoJogador.HabilidadeCarisma + " (" + personagemDoJogador.Carisma + ")", inline: true }
					)
					.addField("Proficiências", "" + personagemDoJogador.Proficiencias.join(", ") + "")
					.addField("Valor da Proficiência", personagemDoJogador.ValorProficiencia)

    message.channel.send("Sua ficha foi criada");
    message.channel.send(ficha)
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

    console.log(modOrdem[5])
}

async function DefinirRaca(message, filter) {
    var raca = "";
    while (!variables.racas().includes(raca)) {
        message.channel.send("Agora diga sua raça. Essa mensagem irá aparecer novamente se escolher uma raça não disponivel:");
        temp = await message.channel.awaitMessages(filter, { max: 1 });
        raca = temp.first().content;
    }

    PersonagemNovo.Raca = raca;

    for (var item in variables.rel_raca_hab()) {
        if (item == "getKeyByValue") {
            continue;
        }

        if (variables.rel_raca_hab()[item].includes(raca)) {
            valor = item.split(" ")
            habilidadeAtual = `Habilidade${valor[0]}`
            console.log(PersonagemNovo[valor[0]])
            console.log(PersonagemNovo.Carisma)
            PersonagemNovo[habilidadeAtual] += parseInt(valor[1])
            PersonagemNovo[valor[0]] = functions.ConvertHabilidadeAtrib(PersonagemNovo[habilidadeAtual])
            message.channel.send(`Por causa de seu bônus racial, ${valor[0]} agora é ${PersonagemNovo[habilidadeAtual]} e o modificador foi para ${PersonagemNovo[valor[0]]}`)
        }
    }
    return;


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

    for (var i in Object.entries(variables.rel_ante_prof_pericia())) {
        if (i == "getKeyByValue") {
            continue;
        }

        if (Object.entries(variables.rel_ante_prof_pericia())[i][0]) {
            if (Object.entries(variables.rel_ante_prof_pericia())[i][1].includes(resposta)) {
                profEsc.push(Object.entries(variables.rel_ante_prof_pericia())[i][0]);
            }
        }
    }

    console.log(profEsc);

    if (!PersonagemNovo.Proficiencias) {
        PersonagemNovo.Proficiencias = [];
    }

    PersonagemNovo.Proficiencias.push(profEsc);

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
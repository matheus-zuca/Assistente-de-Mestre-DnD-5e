const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    if (!personagemDoJogador) {
        result = "Sua ficha está sendo criada. Digite o nome de seu personagem: ";
        var filter = m => m.author.id === message.author.id;

        message.channel.send(result);
        var temp = await message.channel.awaitMessages(filter, { max: 1 });
        nomePersonagem = temp.first().content;

        message.channel.send("Agora diga sua raça:");
        temp = await message.channel.awaitMessages(filter, { max: 1 });
        raca = temp.first().content;

        var classe = "";
        while (!variables.classes().includes(classe)) {
            message.channel.send("Agora diga sua classe. Essa mensagem irá aparecer novamente se escolher uma classe não disponivel:");
            temp = await message.channel.awaitMessages(filter, { max: 1 });
            classe = temp.first().content;
        }

        dadodevida = variables.rel_dv_class().getKeyByValue(classe);

        dadoRolagem = variables.rel_class_bal().getKeyByValue(classe);
        moedasInicio = functions.Rolagem(dadoRolagem[0], dadoRolagem[2]).reduce((a, b) => a + b, 0);
        if (classe != "Monge") {
            moedasInicio *= 10;
        }

        message.channel.send("Ok, " + nomePersonagem + ". \n Vamos aos atributos");

        var profEsc = [];
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

        let hpMax = parseInt(dadodevida.splice(1)) + modOrdem[2];

        message.channel.send("Agora vamos para as Proficiencias! Por padrão, temos duas Habilidades e duas Pericias. Se tiver mais, pode alterar a ficha depois. \n");

        for (var i = 0; i < 4; i++) {
            if (i < 2) {
                profEsc[i] = await functions.EscolherProficiencia(message, arrayHabilidades);
            } else {
                profEsc[i] = await functions.EscolherProficiencia(message, functions.arrayPericias());
            }
        }

        personagemDoJogador = {
            Personagem: nomePersonagem,
            Raça: raca,
            Classe: classe,
            Level: 1,
            CA: 0,
            XP: 0,
            Inspiração: 0,
            HP: hpMax,
            HPMax: hpMax,
            DadoVida: dadodevida,
            HabilidadeForça: atribOrdem[0],
            HabilidadeDestreza: atribOrdem[1],
            HabilidadeConstituição: atribOrdem[2],
            HabilidadeInteligência: atribOrdem[3],
            HabilidadeSabedoria: atribOrdem[4],
            HabilidadeCarisma: atribOrdem[5],
            Força: modOrdem[0],
            Destreza: modOrdem[1],
            Constituição: modOrdem[2],
            Inteligência: modOrdem[3],
            Sabedoria: modOrdem[4],
            Carisma: modOrdem[5],
            Proficiencias: [profEsc[0], profEsc[1], profEsc[2], profEsc[3]],
            ValorProficiencia: 2,
            Moedas: {
                "Pl": 0,
                "Po": moedasInicio,
                "Pe": 0,
                "Pp": 0,
                "Pc": 0
            },
            Itens: [],
            Anotacoes: [],
            Sucessos: 0,
            Falhas: 0
        }

        functions.SaveJson(variables.chars, variables.fileSave);

        result = "Sua ficha foi criada";
    } else {
        result = "Sua ficha já está feita. Digite !c se quiser consulta-la ou !a se quiser altera-la. Se quiser exclui-la, digite e";
        message.channel.send(result);
        var retemp = await message.channel.awaitMessages(filter, { max: 1 });
        if (retemp.first().content === "e") {
            personagemDoJogador = undefined;
            result = "Seu personagem foi deletado";
            functions.SaveJson(variables.chars, variables.fileSave);
        }

    }

    if (result) {
        message.channel.send(result);
    }
}

module.exports.help = {
    name: "Criar Ficha",
    code: "m",
    description: "Para criar a sua ficha. FUNCIONALIDADE SENDO TESTADA"
}

Object.prototype.getKeyByValue = function (value) {
    for (var key in this) {
        if (this[key].includes(value)) {
            return key;
        }
    }
}
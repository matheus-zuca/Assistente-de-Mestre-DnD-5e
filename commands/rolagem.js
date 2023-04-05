const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    if (comando[2]) {
        verificaVantagem = comando[2];
    } else {
        verificaVantagem = "n";
    }

    var rolagem = comando[1];
    var confereHabilidade = variables.arrayHabilidades().includes(rolagem);

    if (isNaN(rolagem.substring(0, 1)) == false) {
        var separators = ['d', '\\\+', '-'];
        var dado = rolagem.split(new RegExp(separators.join('|')));
        var valor = functions.Rolagem(parseInt(dado[0]), parseInt(dado[1]));
        var total = valor.reduce((a, b) => a + b, 0);

        if (dado[2]) {
            if (rolagem.includes("-")) {
                total -= parseInt(dado[2]);
            }
            else {
                total += parseInt(dado[2]);
            }
        }

        if (personagemDoJogador) {
            autor = personagemDoJogador.Nome;
        } else {
            autor = message.author.name;
        }
        result = autor + ' rolou: ' + valor + " = " + total;

    }
    //Confere se é uma rolagem de Habilidade
    else if (functions.CheckPericia(variables.Pericias, rolagem) || confereHabilidade) {
        //Verificação pra Rolagem de Habilidade
        if (personagemDoJogador.hasOwnProperty(rolagem)) {
            result = functions.RolagemComplexa(rolagem, rolagem, personagemDoJogador, verificaVantagem);
        }
        //Confere se é uma rolagem de Pericia
        else if (variables.Pericias.getKeyByValue(rolagem) !== null) {
            var pericia = variables.Pericias.getKeyByValue(rolagem);
            result = functions.RolagemComplexa(rolagem, pericia, personagemDoJogador, verificaVantagem);
        }
    } else {
        //Se não for nada disso, aparece que a rolagem não foi encontrada
        result = 'Rolagem não encontrada';
    }
    
    if (result) {
        message.channel.send(result);
    }
}

module.exports.help = {
    name: "Rolagem",
    code: "r",
    description: "[FEITO] Realiza uma rolagem de dados, podendo ser simples, com somas ou subtração. Além disso, caso já tenha sua ficha cadastrada, você pode apenas apertar !r e digitar a habilidade ou pericia que quer rolar como '!r Força' por exemplo. Já conta também com rolagem de vantagem baseado em quantos pontos de inspiração você tem"
}

Object.prototype.getKeyByValue = function (value) {
	for (var key in this) {
		if (this[key].includes(value)) {
			return key;
		}
	}
}
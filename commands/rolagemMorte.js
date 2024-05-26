const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    if (personagemDoJogador.HP > 0) {
        message.channel.send("Tá querendo matar seu personagem antes da hora? Seu personagem tá vivo! Não dá pra fazer rolagem de morte!")
    } else {
        d20padrao = bot.emojis.cache.get("714935762491277413").toString();
        d20falha = bot.emojis.cache.get("714935809769341018").toString();
        d20sucesso = bot.emojis.cache.get("714935825904828446").toString();
        dadossucesso = "";
        dadosfalha = "";
        resultMorte = null;

        dadoMorte = functions.Rolagem(1, 20);

        if (dadoMorte[0] > 10) {
            if (dadoMorte[0] == 20) {
                personagemDoJogador.Sucessos = 3;
                personagemDoJogador.HP++;
            } else {
                personagemDoJogador.Sucessos++;
            }
        } else {
            if (dadoMorte[0] == 1) {
                personagemDoJogador.Falhas += 2;
            } else {
                personagemDoJogador.Falhas++;
            }

        }

        for (var i = 1; i <= personagemDoJogador.Sucessos; i++) {
            dadossucesso += d20sucesso;
        }

        for (var i = 1; i <= (3 - personagemDoJogador.Sucessos); i++) {
            dadossucesso += d20padrao;
        }

        for (var i = 1; i <= personagemDoJogador.Falhas; i++) {
            dadosfalha += d20falha;
        }

        for (var i = 1; i <= (3 - personagemDoJogador.Falhas); i++) {
            dadosfalha += d20padrao;
        }

        if (personagemDoJogador.Sucessos == 3) {
            personagemDoJogador.Sucessos = 0;
            personagemDoJogador.Falhas = 0;
            resultMorte = "Você sobreviveu! Parabéns! :heart:";
        } else if (personagemDoJogador.Falhas == 3) {
            personagemDoJogador.Sucessos = 0;
            personagemDoJogador.Falhas = 0;
            resultMorte = "Você morreu! Sinto muito :slight_frown:";
        }

        functions.SaveJson(variables.chars, variables.fileSave);

        message.channel.send("Você, " + personagemDoJogador.Nome + ", tirou " + dadoMorte[0] + ". \n");
        message.channel.send("Sucessos: \n");
        message.channel.send(dadossucesso);
        message.channel.send("Falhas: \n");
        message.channel.send(dadosfalha);
        if (resultMorte != null) {
            message.channel.send("\n" + resultMorte);
            resultMorte = null;
        }

    }
}

module.exports.help = {
    name: "Rolagem de Salvamento de Morte",
    code: "ds",
    description: "Realiza as Rolagens de Salvamento de Morte."
}
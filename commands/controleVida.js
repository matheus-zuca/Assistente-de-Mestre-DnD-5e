const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
        mention = message.mentions.users.first();

    if (mention) {
        personagemDoJogador = variables.chars[mention.id];
    }

    if (comando[1]) {
        if (comando[1] == "dl") {
            personagemDoJogador.HP = personagemDoJogador.HPMax;
            personagemDoJogador.Dados = personagemDoJogador.Level;
            mensagem = "Dados de vida recuperados. HP atualizado para: ";
        } else if (comando[1] == "dc") {
            if (personagemDoJogador.Dados > 0) {
                personagemDoJogador.Dados--;
                dadoVida = parseInt(personagemDoJogador.DadoVida.slice(1));
                vida = functions.Rolagem(1, dadoVida);

                if ((personagemDoJogador.HP + vida[0] > personagemDoJogador.HPMax)) {
                    personagemDoJogador.HP = personagemDoJogador.HPMax;
                } else {
                    personagemDoJogador.HP += vida[0];
                }

                mensagem = "Você gastou um dado de vida. Ainda tem " + personagemDoJogador.Dados + " e tirou " + vida[0] + ". Hp atualizado para: "
            } else {
                mensagem = "Você não tem mais dados de descanso. Seu HP atual é: "
            }
        } else {
            if (isNaN(parseInt(comando[1]))) {
                mensagem = "Rolagem não encotrada. HP atual é: "
            }
            else {
                if ((personagemDoJogador.HP + parseInt(comando[1]) > personagemDoJogador.HPMax)) {
                    personagemDoJogador.HP = personagemDoJogador.HPMax;
                } else {
                    personagemDoJogador.HP += parseInt(comando[1]);
                }
                mensagem = "HP atualizado para: ";
            }
        }
        functions.SaveJson(variables.chars, variables.fileSave);
        message.channel.send(mensagem + personagemDoJogador.HP);
    } else {
        message.channel.send("Seu HP é: " + personagemDoJogador.HP);
    }
}

module.exports.help = {
    name: "HP",
    code: "hp",
    description: "Consulta sua vida e você ainda pode somar ou subtrair um valor dela. Só lembra de colocar um espaço depois do código. Válido também pra dado de vida em um descanso curto (digita !hp dc) ou recuperar vida completa em um descanso longo (digita !hp dl)"
}
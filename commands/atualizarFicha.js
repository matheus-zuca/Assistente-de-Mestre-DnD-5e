const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {

    var atualizacoes = comando.slice(1, comando.lenght).join(" ");

    var buscas = atualizacoes.split("$");
    if (buscas.length > 1) {
        buscas.forEach((item, index) => {
            if (index == 0) {

            } else {
                let text = item.split(" ");
                let novoValor = item.slice(2).trim();
                switch (text[0]) {
                    case "n":
                        valorAntigo = personagemDoJogador.Nome
                        message.channel.send(`O Nome do seu personagem foi alterado de ${valorAntigo} para ${novoValor}`)
                        personagemDoJogador.Nome = novoValor
                        break;
                    case "a":
                        if (!variables.Alinhamentos.includes(novoValor)) {
                            message.channel.send(novoValor)
                            message.channel.send("Esse alinhamento não foi encontrado")
                            break;
                        }
                        valorAntigo = personagemDoJogador.Alinhamento
                        message.channel.send(`O Alinhamento do seu personagem foi alterado de ${valorAntigo} para ${novoValor}`)
                        personagemDoJogador.Alinhamento = novoValor
                        break;
                    case "r":
                        if (!variables.racas().includes(novoValor)) {
                            message.channel.send("Essa raça não foi encontrada")
                            break;
                        }
                        valorAntigo = personagemDoJogador.Raça
                        message.channel.send(`A Raça do seu personagem foi alterado de ${valorAntigo} para ${novoValor}`)
                        personagemDoJogador.Raça = novoValor
                        break;
                    case "i+":
                        personagemDoJogador.Inspiração++
                        message.channel.send("Você ganhou um ponto de Inspiração")
                        break;
                    case "i-":
                        if(personagemDoJogador.Inspiração == 0){
                            message.channel.send("Você não tem pontos de inspiração para usar");
                            break;
                        }
                        personagemDoJogador.Inspiração--
                        message.channel.send("Você usou um ponto de Inspiração")
                        break;
                    default:
                        message.channel.send("Esse comando não foi encontrado")
                        break;

                }
            }
        })
        functions.SaveJson(variables.chars, variables.fileSave);

    }


}

module.exports.help = {
    name: "Atualizar ficha",
    code: "a",
    description: "Atualiza partes da sua ficha, como nome, inspiração, raça ou alinhamento"
} 
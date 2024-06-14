const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {

    var alvo;
    var item_escolhido = `${comando.slice(1, comando.length).join(" ")}`;
    var buscas = item_escolhido.split("$");
    switch (buscas[1].slice(0, 4)) {
        case "arma":
            if(variables.weapons[buscas[1].slice(5, buscas[1].length)]){
                alvo = personagemDoJogador.Armas;
            }else{
                message.channel.send("Esta arma não está cadastrada")
                return;
            }
            break;
        case "item":
            alvo = personagemDoJogador.Itens;
            break;
        default:
            message.channel.send("Não foi encontrado nenhum comando")
            return;
    } 

    buscas = buscas[1].slice(5, buscas[1].length)
    alvo.push(buscas);

    if (alvo = personagemDoJogador.Armas && personagemDoJogador.ArmaSelecionada == "") {
        personagemDoJogador.ArmaSelecionada = buscas;
    }

    functions.SaveJson(variables.chars, variables.fileSave);
    message.channel.send("Item salvo com sucesso!");
}

module.exports.help = {
    name: "Adicionar item",
    code: "add",
    description: "Adiciona  itens a seu inventário. Após o comando, especifique se é item ou arma e digite o nome."
} 
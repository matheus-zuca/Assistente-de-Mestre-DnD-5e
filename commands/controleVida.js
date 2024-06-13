const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    outroJogador = message.mentions.users.first();

    if (outroJogador) {
        personagemDoJogador = variables.chars[outroJogador.id];
    }
    
    if(!comando[1]){
        message.channel.send(`Seu HP é: ${personagemDoJogador.HP}`);
        return;
    }

    if(comando[1].toLowerCase() == "dc"){
        if (personagemDoJogador.Dados > 0) {
            personagemDoJogador.Dados--;
            dadoVida = parseInt(personagemDoJogador.DadoVida.slice(1));
            vida = functions.Rolagem(1, dadoVida);

            if ((personagemDoJogador.HP + vida[0] > personagemDoJogador.HPMax)) {
                personagemDoJogador.HP = personagemDoJogador.HPMax;
            } else {
                personagemDoJogador.HP += vida[0];
            }

            mensagem = `Você gastou um dado de vida. Ainda tem ${personagemDoJogador.Dados} restantes e tirou ${vida[0]} em sua recuperação.\n Hp atualizado para: ${personagemDoJogador.HP}`
        } else {
            mensagem = `Você não tem mais dados de descanso. Seu HP atual é: ${personagemDoJogador.HP}`
        }

        message.channel.send(mensagem)
        functions.SaveJson(variables.chars, variables.fileSave);
        return;
    }

    if(isNaN(parseInt(comando[1]))){
        message.channel.send(`Comando não encontrado. Seu HP atual é: ${personagemDoJogador.HP}`)
        functions.SaveJson(variables.chars, variables.fileSave);
        return;
    }

    if ((personagemDoJogador.HP + parseInt(comando[1]) > personagemDoJogador.HPMax)) {
        personagemDoJogador.HP = personagemDoJogador.HPMax;
    } else {
        personagemDoJogador.HP += parseInt(comando[1]);
    }
    message.channel.send(`HP atualizado para: ${personagemDoJogador.HP}`)

    if(personagemDoJogador.HP>0){
        personagemDoJogador.Sucessos = 0;
        personagemDoJogador.Falhas = 0;
    }

    functions.SaveJson(variables.chars, variables.fileSave);
}

module.exports.help = {
    name: "HP",
    code: "hp",
    description: `Consulta sua vida. Além disso, você ainda pode somar ou subtrair um valor dela. Válido também pra dado de vida em um descanso curto, digitando ${variables.prefix}hp dc`
}
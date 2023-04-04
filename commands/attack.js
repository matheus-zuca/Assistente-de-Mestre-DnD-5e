const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    var arma = personagemDoJogador.ArmaSelecionada;

    if(arma.Alcance == "Corpo-a-Corpo"){
        var rollAtaque = functions.Rolagem(1, 20)[0] + personagemDoJogador.Força;
    }else{
        var rollAtaque = functions.Rolagem(1, 20)[0] + personagemDoJogador.Destreza;
    }

    if(personagemDoJogador.Proficiencias.includes(arma)){
        rollAtaque += personagemDoJogador.ValorProficiencia;
    }
    
    var filter = m => m.author.id === message.author.id;
    message.channel.send(`Rolagem deu ${rollAtaque}. Passou a CA?`);
    temp = await message.channel.awaitMessages(filter, { max: 1 });
    resposta = temp.first().content;

    if (resposta.toLowerCase() == "sim" || resposta.toLowerCase() == "s") {
        
        if (variables.weapons[arma]) {
            var dadodano = variables.weapons[arma].Dano.split("d");
            var rolldano = functions.Rolagem(dadodano[0], dadodano[1]).reduce((a, b) => { return a + b; });

            if(variables.weapons[arma].Alcance == "Corpo-a-Corpo"){
                rolldano += personagemDoJogador.Força;
            }

            message.channel.send(`${personagemDoJogador.Nome} causou ${rolldano} de dano`);
        }
    } else {
        message.channel.send("Mais sorte no próximo turno");
    }
}

module.exports.help = {
    name: "Rolagem de ataque",
    code: "attack",
    description: "[A PROGRAMAR]Uma rolagem de ataque"
} 
const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    var arma = personagemDoJogador.ArmaSelecionada;
    if (variables.weapons[arma]) {

        if (variables.weapons[arma].Alcance == "Corpo-a-Corpo") {
            var rollAtaque = functions.Rolagem(1, 20)[0] + personagemDoJogador.Força;
        } else {
            var rollAtaque = functions.Rolagem(1, 20)[0] + personagemDoJogador.Destreza;
        }

        if (personagemDoJogador.Proficiencias.includes(arma)) {
            rollAtaque += personagemDoJogador.ValorProficiencia;
        }

        var filter = m => m.author.id === message.author.id;
        message.channel.send(`Rolagem deu ${rollAtaque}. Passou a CA?`);
        temp = await message.channel.awaitMessages(filter, { max: 1 });
        resposta = temp.first().content;

        if (resposta.toLowerCase() == "sim" || resposta.toLowerCase() == "s") {


            var dadodano = variables.weapons[arma].Dano.split("d");
            var rolldano = functions.Rolagem(dadodano[0], dadodano[1]).reduce((a, b) => { return a + b; });

            if (variables.weapons[arma].Alcance == "Corpo-a-Corpo") {
                rolldano += personagemDoJogador.Força;
            }

            message.channel.send(`${personagemDoJogador.Nome} causou ${rolldano} de dano com sua ${arma}`);
        } else {
            message.channel.send("Mais sorte no próximo turno");    
        }
    } else {
        message.channel.send("Essa arma ainda não foi cadastrada no banco de dados.");
        
    }
}

module.exports.help = {
    name: "Rolagem de ataque",
    code: "attack",
    description: "[FEITO] Baseado em sua arma, realiza uma rolagem de ataque, já calculando se será Corpo-a-Corpo ou A Distancia e rolando também o dano da arma."
} 
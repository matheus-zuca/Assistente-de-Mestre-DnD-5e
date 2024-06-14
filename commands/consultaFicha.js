const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
	if(!personagemDoJogador){
		message.channel.send("Não foi possível encontrar sua ficha, mas você pode faze-la usando o nosso bot")
		return;
	}
	
    var ficha_embed = new Discord.MessageEmbed()
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
					.addField("Proficiências", "```" + personagemDoJogador.Proficiencias.join(", ") + "```")
					.addField("Valor da Proficiência", personagemDoJogador.ValorProficiencia)
					.addField("Armas", "```" + GetArrayArmas() + "```")
					.addField("Arma Atual", personagemDoJogador.ArmaSelecionada);
	
	message.channel.send(ficha_embed);
}

function GetArrayArmas(){
	var armas = ""

	ArmasArray = personagemDoJogador.Armas.sort().reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }

        return acc;
    }, {});

	Object.entries(ArmasArray).forEach((arma, index) => {
        if (arma[1] == 1) {
            armas += `${arma[0]}`;
        } else {
            armas += `${arma[0]} (${arma[1]}x)`;
        }

		console.log(index)
		console.log(Object.keys(ArmasArray).length)

		if(index != Object.keys(ArmasArray).length-1){
			armas += ", "
		}

	
		
    });

	return armas;
}

module.exports.help = {
    name: "Consultar Ficha",
    code: "c",
    description: "Consulta sua ficha."
}
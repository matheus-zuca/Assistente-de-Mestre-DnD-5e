const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    var ficha = new Discord.MessageEmbed()
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
					.addField("Proficiências", "```" + personagemDoJogador.Proficiencias + "```")
					.addField("Valor da Proficiência", personagemDoJogador.ValorProficiencia);
                result = ficha;
                
                if(result){
                    message.channel.send(result);
                }
}

module.exports.help = {
    name: "Consultar Ficha",
    code: "c",
    description: "Caso queira consultar sua ficha, digite !c"
}
const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

const emojiNext = '➡';
const emojiPrevious = '⬅';

var chosedEmbed;
var changeEmbed = true;

var Magia;
var DescMagia;

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    var magia = comando.slice(1, comando.lenght).join(" ");

    var buscas = magia.split("$");
    var magias = [];
    var magiasSelecionadas = [];
    if (buscas.length > 1) {
        buscas.forEach((item, index) => {
            if (index == 0) {

            } else {
                let text = item.split(" ");
                switch (text[0]) {
                    case "l":
                        for (var key in variables.spells) {
                            if (variables.spells[key].Nivel == text[1]) {
                                magias.push(key);
                            }
                        }
                        break;
                    case "e":
                        for (var key in variables.spells) {
                            if (variables.spells[key].Escola == text[1].toLowerCase()) {
                                magias.push(key);
                            }
                        }
                        break;
                    case "c":
                        for (var key in variables.spells) {
                            if (variables.spells[key].classes) {
                                if (variables.spells[key].classes.includes(text[1].toLowerCase())) {
                                    magias.push(key);
                                }
                            }
                        }
                        break;
                }
            }
        })

        var reducao = magias.reduce(function (acc, curr) {
            if (typeof acc[curr] == 'undefined') {
                acc[curr] = 1;
            } else {
                acc[curr] += 1;
            }

            return acc;
        }, {});

        for (var key in reducao) {
            if (key == "getKeyByValue") {

            } else {
                if (buscas.length > 2) {
                    if (reducao[key] > 1) {
                        magiasSelecionadas.push(key);
                    }
                } else {
                    magiasSelecionadas.push(key);
                }
            }
        }

        var textoMagias = magiasSelecionadas.sort().reduce((acc, curr) => {
            acc += curr + "\n";
            return acc;
        }, "");

        Magia = new Discord.MessageEmbed().setTitle("Magias que atendem a busca: ");
        Magia.setDescription(textoMagias);

        message.channel.send(Magia);
    }
    else {
        if (variables.spells[buscas[0]]) {
            Magia = new Discord.MessageEmbed();
            var keys = [];
            var values = [];
            Magia.setTitle(buscas[0]);

            for (var key in variables.spells[buscas[0]]) {
                keys.push(key);
                values.push(variables.spells[buscas[0]][key]);
            }

            for (var i = 0; i <= 6; i++) {
                Magia.addField(keys[i], values[i]);
            }

            DescMagia = new Discord.MessageEmbed().setTitle(buscas[0]).setDescription(values[7]).setFooter(`Magia de ${values[0]} ciclo`);

            message.channel.send(Magia).then(msg => msg.react(emojiNext)).then(msgReaction => createCollectorMessage(msgReaction.message));
        } else {
            message.channel.send("Magia não encontrada");
            var magias = "";
            for (var i = 0; i <= Object.keys(variables.spells).length - 1; i++) {
                var n = Object.keys(variables.spells)[i];
                if (n.toLowerCase().search(buscas[0].toLowerCase()) != -1) {
                    magias += `**${n}** - Magia de ${variables.spells[n].Nivel} ciclo\n`;
                }
            }
            if (magias != "") {
                message.channel.send("Não quis dizer: \n" + magias);
            }
        }
    }

    function onCollect(emoji, message) {
        changeEmbed = !changeEmbed;

        if(changeEmbed){
            chosedEmbed = DescMagia;
        }else{
            chosedEmbed = Magia;
        }
        message.edit(chosedEmbed);
    }
    
    function filter(user) {
        return (!user.bot);
    }
    
    function createCollectorMessage(message) {
        let time = 300000;
        const collector = message.createReactionCollector(filter, { time });
        collector.on('collect', r => {
            onCollect(r.emoji, message);
        });
    }

}

module.exports.help = {
    name: "Informação de Magias",
    code: "spellinfo",
    description: "Consulta um banco de dados com informações de todas as Magias da 5e, podendo ser filtradas com base na classe, no círculo de magia ou por escola de Magia."
} 
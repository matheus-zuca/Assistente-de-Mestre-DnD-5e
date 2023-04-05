const Discord = require("discord.js");
const functions = require("../modules/functions.js");
const variables = require("../modules/variables.js");

var inicio = 0;
var index = 1;
var fim = 10;

const emojiNext = '➡';
const emojiPrevious = '⬅';
const reactionArrow = [emojiPrevious, emojiNext];
var charDoJogador;
var ItensArray;

module.exports.run = async (bot, message, comando, personagemDoJogador) => {
    message.delete();

    charDoJogador = personagemDoJogador;
    inventario = CreateEmbed();
    SendMessage(message, inventario);
}

function CreateEmbed() {
    var itens = "";

    ItensArray = charDoJogador.Itens.sort().reduce(function (acc, curr) {
        if (typeof acc[curr] == 'undefined') {
            acc[curr] = 1;
        } else {
            acc[curr] += 1;
        }

        return acc;
    }, {});

    let inventario = new Discord.MessageEmbed()
        .setTitle(`Olá ${charDoJogador.Nome}! Aqui estão seus itens:`)


    Object.entries(ItensArray).slice(inicio, fim).forEach((item, index) => {
        if (item[1] == 1) {
            itens += `${item[0]}\n`;
        } else {
            itens += `${item[0]} (${item[1]}x)\n`;
        }
    });

    inventario.setDescription(itens).setFooter(`Página ${index}. Exibindo itens de ${inicio + 1} a ${fim}. Total ${Object.entries(ItensArray).length}`)

    return inventario;
}

function SendMessage(message, inventario) {
    message.channel.send(inventario).then(msg => msg.react(emojiPrevious))
        .then(msgReaction => msgReaction.message.react(emojiNext))
        .then(msgReaction => createCollectorMessage(msgReaction.message));
}

function onCollect(emoji, message) {
    if (emoji.name === emojiPrevious) {
        if (index > 1) {
            inicio -= 10;
            fim -= 10;
            index--
        }
    } else if (emoji.name === emojiNext) {
        if (fim < Object.entries(ItensArray).length) {
            index++;
            inicio += 10;
            fim += 10;
        }
    }

    inventario = CreateEmbed();
    message.edit(inventario);
}

function filter(reaction, user) {
    return (!user.bot) && (reactionArrow.includes(reaction.emoji.name)); // check if the emoji is inside the list of emojis, and if the user is not a bot
}

function createCollectorMessage(message) {
    let time = 300000;
    const collector = message.createReactionCollector(filter, { time });
    collector.on('collect', r => {
        onCollect(r.emoji, message);
    });
}

module.exports.help = {
    name: "Inventário",
    code: "itens",
    description: "[FEITO] Verifica os itens do seu personagem."
} 
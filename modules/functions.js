const variables = require("../modules/variables.js");

module.exports = {
    Rolagem: function (numDados, tipoDado) {
        var dadosRolados = [];
        for (i = 1; i <= numDados; i++) {
            dadosRolados.push(Math.floor(Math.random() * tipoDado) + 1);
        }
        dadosRolados.sort(function (a, b) { return b - a });
        return dadosRolados;
    },

    RolagemComplexa: function (CheckProf, NomeHab, Jogador, Vantagem) {

        if (Vantagem == "i") {
            if (Jogador.Inspiração > 0) {
                Jogador.Inspiração--;
                SaveJson(variables.chars, variables.fileSave);
                Vantagem = "v";
            }
            else {
                Vantagem = "n";
            }
        }

        if (Vantagem == "d") {
            rolagens = Rolagem(2, 20);
            mensagem = " rolou com desvantagem " + rolagens + " e o menor foi ";
            roll = rolagens.reduce(function (a, b) { return Math.min(a, b); });
        } else if (Vantagem == "v") {
            rolagens = Rolagem(2, 20);
            mensagem = " rolou com vantagem " + rolagens + " e o maior foi ";
            roll = rolagens.reduce(function (a, b) { return Math.max(a, b); });
        } else {
            mensagem = " rolou ";
            roll = Rolagem(1, 20);
        }
        var sinal;
        if (Jogador[NomeHab] > 0) {
            sinal = " + ";
        } else {
            sinal = " - ";
        }




        if (TemProficiencia(CheckProf, Jogador)) {
            resultado = Jogador.Nome + mensagem + roll + sinal + Jogador[NomeHab] + "(" + NomeHab + ") + " + Jogador.ValorProficiencia + "(Prof) = " + (parseInt(roll) + parseInt(Jogador[NomeHab]) + Jogador.ValorProficiencia);
        } else {
            resultado = Jogador.Nome + mensagem + roll + sinal + Jogador[NomeHab] + "(" + NomeHab + ") = " + (parseInt(roll) + parseInt(Jogador[NomeHab]));
        }


        return resultado;
    },

    EscolhaAtributos: async function (arrayResult, a, mensagem, resposta, arrayHabilidades) {
        resposta += `Os números disponíveis são: \n\n ${arrayResult.join("\n")} \n Qual valor quer para  ${arrayHabilidades[a]}?`
        mensagem.channel.send(resposta);
        temp = [];
        var filter = m => m.author.id === mensagem.author.id;
        temp = await mensagem.channel.awaitMessages(filter, { time: 10000, max: 1 });
        var tempN = parseInt(temp.first().content);
        if (arrayResult.includes(tempN)) {
            return tempN;
        }
        else {
            resposta = "Digite um número disponível: \n";
            await EscolhaAtributos(arrayResult, a, mensagem, resposta, arrayHabilidades);
        }
    },

    SaveJson: function (chars, fileSave) {
        var dictString = JSON.stringify(chars);
        fileSave.writeFile("chars.json", dictString, function (err) {
            if (err) throw err;
            console.log('Foi salvo!');
        });
    },

    arrayPericias: function (Pericias) {
        var valuesA = Object.keys(Pericias).map(function (key) {
            return Pericias[key];
        });

        var a = [];
        for (var j = 0; j < 6; j++) {
            for (var i = 0; i < valuesA[j].length; i++) {
                a.push(valuesA[j][i]);
            }
        }
        return a;
    },

    CheckPericia: function (Pericias, NomePericia) {
        var arrP = Object.values(Pericias);
        var arrFP = [];

        for (i = 0; i < arrP.length; i++) {
            for (j = 0; j < arrP[i].length; j++) {
                arrFP.push(arrP[i][j]);
            }
        }

        return arrFP.includes(NomePericia);
    },

    EscolherProficiencia: async function (mensagem, arrayResult) {
        resposta = "As Opções disponiveis são: \n\n";
        for (var i = 0; i <= arrayResult.length - 1; i++) {
            resposta += arrayResult[i] + "\n";
        }

        resposta += "\n Qual quer adicionar?";

        mensagem.channel.send(resposta);

        temp = [];
        var filter = m => m.author.id === mensagem.author.id;
        temp = await mensagem.channel.awaitMessages(filter, { max: 1 });
        tempN = temp.first().content;

        if (arrayResult.includes(tempN)) {

            return tempN;
        }
        else {
            mensagem.channel.send("Escolha uma opção disponível:");
            await EscolherProficiencia(mensagem, arrayResult);
        }



    },

    RolagemAtributos: function (numDados, tipoDado) {
        var dadosRolados = [];
        for (i = 1; i <= numDados; i++) {
            dadosRolados.push(Math.floor(Math.random() * tipoDado) + 1);
        }
        dadosRolados.sort(function (a, b) { return b - a });
        dadosRolados.pop();
        var total = dadosRolados.reduce((a, b) => a + b, 0);
        return total;
    },

    ConvertHabilidadeAtrib: function (num) {
        var result = Math.trunc((num - 10) / 2);
        return result;
    },

    GetClass: function (Personagem) {
        var classes = Personagem.Level;
        var texto = "";

        for (var key in classes) {
            if (classes[key] > 0) {
                texto += `${key}: ${classes[key]} \n `;
            }
        }
        return texto;
    }
}

function Rolagem(numDados, tipoDado) {
    var dadosRolados = [];
    for (i = 1; i <= numDados; i++) {
        dadosRolados.push(Math.floor(Math.random() * tipoDado) + 1);
    }
    dadosRolados.sort(function (a, b) { return b - a });
    return dadosRolados;
}

function TemProficiencia(NomeHab, Jogador) {
    return Jogador.Proficiencias.includes(NomeHab);
}

function SaveJson(chars, fileSave) {
    var dictString = JSON.stringify(chars);
    fileSave.writeFile("chars.json", dictString, function (err) {
        if (err) throw err;
        console.log('Foi salvo!');
    });
}
# Assistente de Mestre para D&D 5ª Edição

![Modelo](https://img.shields.io/badge/Assistente-RPG-%23ff0000?style=for-the-badge) 

[![CodeFactor](https://www.codefactor.io/repository/github/matheus-zuca/assistente-de-mestre-dnd-5e/badge)](https://www.codefactor.io/repository/github/matheus-zuca/assistente-de-mestre-dnd-5e)

---

## Descrição do Projeto
O Assistente de Mestre é um projeto voltado a atender especificamente as necessidades de um mestre de Dungeons & Dragons 5ª Edição. Novas funções serão adicionadas gradativamente.

---

## ⚙️ Funcionalidades do Projeto

### `/r - Rolagens de Dados`
~~~javascript
//Rolagem de Dados Padrão
/r 1d10

//Rolagem de Dados com Vantagem ou Desvantagem
/r 1d20 v
/r 1d20 d

//Rolagem baseada no Atributo do Jogador, já adicionando a Proficiência descrita na ficha, caso tenha
/r Furtividade

//Rolagem baseada na Habilidade do Jogador, já adicionando a Proficiência descrita na ficha, caso tenha
/r Inteligência
~~~

### `/ds - Rolagem de Salvamento de Morte`

~~~javascript
//Rolagem de Salvamento de Morte (Death Saving Throw)
/ds
~~~

### `/hp - Verificação de HP`
~~~javascript
//Verificar quanto de vida o personagem tem
/hp

//Modificar a quantidade de vida do personagem
/hp+5 //O bot não ultrapassa o máximo descrito na ficha
/hp-10 //O bot não ultrapassa zero.
~~~

### `/addnote e /anote - Anotações `

~~~javascript
//Adicionar alguma anotação para o banco de informações registradas de um jogador
/addnote O reino tem um traidor //Assim que adiciona, o bot apaga a mensagem do jogador, prezando pela privacidade

//Verificar as anotações já registradas
/anote //o bot manda a resposta no privado, prezando pela privacidade
~~~

### `/c - Consulta da Ficha`
~~~javascript
//Consultar a Ficha de Jogador
/c //A ficha é mostrada como um item MessageEmbed do Discord
~~~

### `/m - Criação de Ficha do Jogador`
~~~javascript
//Criar a Ficha de Jogador
/m

/*O bot começará a perguntar as informações e anota-las, além de automatizar questões como a rolagem de Atributos.
Informações como quantas magias cada classe tem, seu dado de vida, bônus de proficiência, quantidade de pericias
que a classe é proficiente e outras questões semelhantes também são automatizadas.*/
~~~

### `/bal - Controle Financeiro`
~~~javascript
//Verificar quanto dinheiro o Jogador tem
/bal //O Bot responderá quanto o jogador tem em todas as moedas do jogo

//Adicionar ou remover dinheiro da carteira
/bal + 10PO
/bal - 10PO //Caso o Jogador não tenha essa quantidade, o Bot o avisará
~~~

### `/spellinfo - Consulta de Feitiços`
~~~javascript
//Buscar informações sobre algum feitiço especifico
/spellinfo Bola de Fogo

//É possível buscar feitiços que atendam a um filtro especifico como nível
/spellinfo $l 3
//Escola de Conjuração
/spellinfo $e Invocação
//Classe
/spellinfo $c Clérigo

//Ou um misto de alguns desses
/spellinfo $l 9 $c Mago
~~~

### `/prep - Preparação de Magias`
~~~javascript
//Verificar quais classes precisam disso, quais magias são de qual classe e, se necessário, as prepara
/prep Escudo Arcano
~~~

### `/itens - Verifica o Inventário`
~~~javascript
//Abrir o inventário
/itens
~~~

### `/add - Adiciona itens ou armas ao seu personagem`
~~~javascript
//Adicionar item ao inventário
/add $item Corda

//Adicionar arma ao inventário
/add $arma Espada Curta
~~~

## ⚙️ Implementações Futuras

[ ] Atualizar ficha \
[ ] Subir de Nível

## 🛠 Tecnologias

---
Este projeto foi realizado em Node.js com a biblioteca própria do Discord, a Discord.js

## Autor
---
Feito por Matheus Zuca, um eterno nerd
[![Twitter](https://img.shields.io/badge/-@dnaphion-1ca0f1?style=flat-square&labelColor=1ca0f1&logo=twitter&logoColor=white&link=https://twitter.com/dnaphion)](https://twitter.com/dnaphion) [![Linkedin](https://img.shields.io/badge/-Matheus&nbsp;Zuca-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/matheus-zuca-7a1105104/)](https://www.linkedin.com/in/matheus-zuca-7a1105104/)  [![Gmail](https://img.shields.io/badge/-matheusvzucca@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:matheusvzucca@gmail.com)](mailto:matheusvzucca@gmail.com)
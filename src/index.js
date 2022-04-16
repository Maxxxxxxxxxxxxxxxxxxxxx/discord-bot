const Discord = require('discord.js');
const dotenv = require('dotenv');
const Client = require('./client/Client');
const fs = require('fs');

dotenv.config()
const client = new Client();
const commands = new Discord.Collection();
const now = new Date().toString();
const godzina = now.substring(16,24);
const commandFiles = fs.readdirSync('./cmds').filter(file => file.endsWith('.js'));
const errormessage = "Wystąpił błąd przy wykonywaniu polecenia";

for (const cmd of commandFiles) {
  const command = require('./cmds/' + cmd);
  commands.set(command.name, command);
};

// console.log(commands);
// console.log(commandFiles)

client.on("messageCreate", msg => {
  if (msg.content == "!d" && msg.author.id === msg.guild.ownerId) {
    msg.guild.commands
      .set(commands)
      .then(() => {
        msg.reply("Bot zdeployowany!");
      })
      .catch(err => {
        console.log("Error! Sprawdź, czy bot ma uprawnienia do application.commands scope");
        console.log(err);
      });
  };
});

client.on('interactionCreate', async interaction => {
  const command = commands.get(interaction.commandName.toLowerCase()); 

  if (command.name == 'userinfo') try { command.exec(interaction, client) } catch (err) {
    console.log("Error! "+err)
    interaction.reply({
      content: errormessage,
      ephemeral: true,
    });
  } else {
    try { command.exec(interaction) } catch (err) { 
      console.log("Error! "+err);
      interaction.followUp({
        content: errormessage,
        ephemeral: true,
      });
    }
  }
});

client.once('reconnecting', () => {
  console.log('Reconnecting!');
});

client.once('disconnect', () => {
  console.log('Disconnect!');
});

client.on('ready', () => {
  console.log('Ready!');
  console.log(godzina);
});

client.login(process.env.disctoken);
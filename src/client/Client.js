const {Client, Intents} = require('discord.js');

module.exports = class extends Client {
  constructor() {
    super ({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
    });
  }
}
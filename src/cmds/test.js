module.exports = {
  name: "test",
  description: "Test",

  async exec (interaction) {
    interaction.reply({
      content: "Test udany!"
    });
  }
}
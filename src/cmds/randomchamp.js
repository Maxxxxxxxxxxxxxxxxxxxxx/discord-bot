const champList = require("../assets/champ.json")

module.exports = {
  name: "champ",
  description: "Losuje bohatera w zaleznosci od wybranej linii",
  options: [
    {
      name: "line",
      type: 'STRING',
      description: "Linia, na którą losujesz postać / zostaw puste dla losowej linii",
      required: false
    }
  ],

  exec (interaction) {
    const validLines = ['jungle','mid','top','bot','support'];

    if (interaction.options.get('line')) {
      const choice = interaction.options.get('line').value;

      if (!validLines.includes(choice)) {
        interaction.reply({
          content: "Błędna nazwa linii. Spróbuj:\ntop\njungle\nmid\nbot\nsupport",
          ephemeral: true
        }); return
      }

      const viables = (champList.filter(champObj => champObj[choice]));
      const champ = viables[Math.floor(Math.random() * viables.length)];

      interaction.reply({
        content: champ.name.replace("\_", " ")
      }); return
    } else {
      const randomLine = ['jungle','mid','top','bot','support'][Math.floor(Math.random() * 5)];
      const viables = champList.filter(champObj => champObj[randomLine]);
      const champ = viables[Math.floor(Math.random() * viables.length)];

      interaction.reply({
        content: champ.name.replace("\_", " ")
      }); return
    };
  }
}
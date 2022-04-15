const { RandomLine } = require("../tools/RandomLine.js")

module.exports = {
  name: 'zmiennick',
  description: 'Ustawia smieszny nick',
  options: [
    {
      name: 'user',
      type: 6, // 6 to typ user
      description: 'Uzytkownik, ktoremu mam ustawic nick',
      required: false,
    },
  ],

  exec (interaction) {
    if (interaction.options.get('user')) {
      const member = interaction.options.get('user').value;

      if (member.id == interaction.guild.ownerId) {
        interaction.reply({
          content: "Nie mozna zmienic nicku wlascicielowi serwera!",
          ephemeral: true,
        }); return
      }
      if (member) interaction.guild.members.fetch(member)
        .then( user => {
          RandomLine("assets/rymy", (rym) => {
            user.setNickname("Beniamin Godziemba - " + rym);
            interaction.reply({
              content: "Ustawiono!",
              ephemeral: true
            });
          });
        });

    } else RandomLine("assets/rymy", (rym) => {
      if (interaction.member.user.id == interaction.guild.ownerId) {
        interaction.reply({
          content: "Nie mozna zmienic nicku wlascicielowi serwera!",
          ephemeral: true,
        }); return
      }
      else interaction.member.setNickname("Beniamin Godziemba - " + rym); interaction.reply({
        content: "Ustawiono!",
        ephemeral: true,
      });
    });
  },
}
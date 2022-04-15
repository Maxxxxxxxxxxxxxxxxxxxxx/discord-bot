module.exports = {
  name: 'userinfo',
  description: 'Informacje o uzytkowniku',
  options: [
    {
      name: 'user',
      type: 6,
      description: 'Uzytkownik do sprawdzenia',
      required: true,
    },
  ],
  exec (interaction, client) {
    const member = interaction.options.get('user').value;
    const user = client.users.cache.get(member);

    console.log()

    interaction.reply({
      content: `Name: ${user.username}, ID: ${user.id}, Avatar: ${user.displayAvatarURL({dynamic: true})}`,
      ephemeral: true,
    });
  },
};
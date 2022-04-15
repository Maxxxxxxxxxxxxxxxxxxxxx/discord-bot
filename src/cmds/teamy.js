module.exports = {
  name: "teamy",
  description: "Losowo dzieli ludzi na kanale na dwa teamy po równo",

  exec (interaction) {

    if (interaction.member.voice.channel.members.length < 3) {
      interaction.reply({
        content: "Za mało ludzi na kanale!",
        ephemeral: true
      }); return
    }

    const tags = []

    interaction.member.voice.channel.members.sort(() => Math.random() - 0.5)
      .filter(member => !member.bot)
      .each(member => {
        tags.push(member.user.tag)
      });
      
    const teams = {
      team1: tags.splice(0, Math.ceil (tags.length / 2)),
      team2: tags.splice(-Math.ceil (tags.length / 2))
    }

    interaction.reply({
      content: '**Team 1:** \n'+teams.team1.join('\r\n')+'\n\n**Team 2:** \n'+teams.team2.join('\r\n')
    });
  }
}
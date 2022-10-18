const { Client, GatewayIntentBits , ChannelType} = require('discord.js');
const { REST, Routes } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const TOKEN  = "MTAzMTg5MTM4MTk2MDA2MDk1OA.Gbwz-l.u49AfGGjKYtvxCUNwFe7IVKhPBouQl2RTwjbVM"
const CLIENT_ID = '1031891381960060958'
const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Olá gostoso!');
	}
	if(interaction.commandName === 'criar-canal'){
		let channel = await interaction.guild.channels.create({
			name: 'Nome do Canal',
			type: ChannelType.GuildText,
		})
		let tiktok = '(https://www.tiktok.com/@leilalisianerossi/video/7032850377393458438?is_copy_url=1&is_from_webapp=v1)'
		await channel.send(`@everyone LAYLA È LINDA TOCA MT :smile:! -->  ${tiktok}`)
		await interaction.reply("CANAL DA LAYLA LAYLA FOI CRIADO COM SUCESSO ")
	}
	if(interaction.commandName === 'criar-voz'){
		await interaction.guild.channels.create({
			name: 'VOZ',
			type: ChannelType.GuildVoice,
		})
		await interaction.reply("CANAL DE VOZ DA LAYLA LAYLA FOI CRIADO COM SUCESSO ")
	}
	if(interaction.commandName === 'search'){
		// await interaction.guild.channels.create({
		// 	name: 'VOZ',
		// 	type: ChannelType.GuildVoice,
		// })
		await interaction.guild.channels.fetch('222197033908436994')
	  		.then(channel => console.log(`The channel name is: ${channel.name}`))
	  		.catch(console.error);
		await interaction.reply(" PROCURANDO CANAL")
	}
});

const commands = [
	{
		name: 'ping',
		description: 'Replies with Pong!',
	},
	{
		name: 'criar-canal',
		description: 'Criar canal de texto!',
		// type: 'guild_text'
	},
	{
		name: 'criar-voz',
		description: 'Criar canal de voz!',
		// type: 'guild_voice'
	},
	{
		name: 'search',
		description: 'Procurar canal!',
		// type: 'guild_voice'
	},
];
// Fetch all channels from the guild (excluding threads)
// message.guild.channels.fetch()
//   .then(channels => console.log(`There are ${channels.size} channels.`))
//   .catch(console.error);
// Fetch a single channel
(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();

client.login(TOKEN);

const { Client, Intents, MessageEmbed, MessageAttachment } = require('discord.js');
const { token, guildChannel } = require('./config.json');
const cron = require('node-cron');
const axios = require('axios');

const API_URL = "INSERT CONTENT API HERE"

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const fetchData = async () => {
    const { data } = await axios.get(API_URL);
    const rndInt = Math.floor(Math.random() * Object.keys(data).length) + 1
    var generalChannel = client.channels.cache.get("920999472090206218")
    generalChannel.send("https://www.twitch.tv/" + data[rndInt].user_login)

};
client.once('ready', () => onClientReady());
function onClientReady() {

    var generalChannel = client.channels.cache.get("920999472090206218")
    

}

client.on("messageCreate", message => {
    if (message.content.startsWith("!command")) {
        fetchData();

    }
    //example of extra command - this case it sends a gif to the channel when using the command !ds
    if (message.content.startsWith("!ds")) {
        const file = new MessageAttachment("./dagens-spurgt.gif")
        message.channel.send({ files: [file] })
    }
});


client.on('messageCreate', (message) => {
    if (message.content == "hello") {
        message.reply("Hi! :)");
    }
});


cron.schedule('0 14 * * *', function () {
    fetchData();
});


client.login(token);


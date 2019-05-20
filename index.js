var memeClient = require('./meme-eco-wrap')
const Discord = require('discord.js');
const client = new Discord.Client();

var token = "***********";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if(msg.content.startsWith('!getfirm')){
    var args = msg.toString().split(" ")
    memeClient.getFirm(args[1],firm=>msg.channel.send(`
    name: ${firm.name}
    firm balance: ${firm.balance}
    private: ${firm.private}
    execs: ${firm.execs}
    members: ${firm.size}
    tax: ${firm.tax}%
    last payout: ${firm.last_payout}
    `));

  }
  if (msg.content.startsWith('!getuser')) {
    var args = msg.toString().split(" ")
    memeClient.getUser(args[1],user=>msg.channel.send(`
    name: ${user.name}
    balance: ${user.balance}
    completed investments: ${user.completed}
    times gone broke: ${user.broke}
    networth: ${user.networth}
    firm id: ${user.firm}
    ranking: ${user.rank}`))
  }
});

client.login(token);

var memeClient = require('./meme-eco-wrap')
const Discord = require('discord.js');
const client = new Discord.Client();

var token = "*****************";

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.startsWith('!getfirm')) {
    var args = msg.toString().split(" ")
    memeClient.getFirm(args[1], firm => msg.channel.send("```js\n" + `
    name: ${firm.name}
    firm balance: ${firm.balance}
    Private: ${firm.private}
    Execs: ${firm.execs}
    Members: ${firm.size}
    Tax: ${firm.tax}%
    Last payout: ${firm.last_payout}
    `+ "```"));

  }
  if (msg.content.startsWith('!getinvestments')) {
    var args = msg.toString().split(" ")
    memeClient.getInvestments(args[1], investments => {
      investments.forEach(element => {
        var investmentData = `
        Investment: 
        Completed: ${element.done}
        Amount: ${element.amount}
        Successful: ${element.success}
        Starting upvotes: ${element.upvotes}
        Final upvotes: ${element.final_upvotes}
        Profit: ${element.profit}
        Id: ${element.id}
        Comment: ${element.comment}
        Post: ${element.post}
        Response: ${element.response}
        Time: ${element.time}
        `
        msg.channel.send("```js\n"+investmentData+"```")
      });
    })
  }
  if (msg.content.startsWith('!getuser')) {
    var args = msg.toString().split(" ")
    memeClient.getUser(args[1], user => msg.channel.send("```js\n" + `
    Name: ${user.name}
    Balance: ${user.balance}
    Completed investments: ${user.completed}
    Times gone broke: ${user.broke}
    Net worth: ${user.networth}
    Firm id: ${user.firm}
    Ranking: ${user.rank}` + "```"))
  }
});

client.login(token);

const { Telegraf, Markup } = require('telegraf')
const { message } = require('telegraf/filters')
require('dotenv').config()
const axios = require('axios')
const text = require('./const')

//* Some module import
const randomInteger = require('./cardGame').randomInteger(1, 36)
console.log(randomInteger);
const bot = new Telegraf(process.env.BOT_TOCKEN)

//* start command

bot.start(async ctx => {
  // await ctx.reply('Hello!')
  console.log('randomInteger')
  await ctx.reply(`Hello, ${ctx.message.from.first_name}!`)
})

//* bot.hears

bot.hears(['hi', 'Hi'], async ctx => {
  await ctx.reply(`Hello, ${ctx.message.from.first_name}!`)
  await ctx.replyWithPhoto({ source: './img/1.jpg' })
})

//* bot.hears
bot.hears(['cat', 'Cat'], async ctx => {
  ctx.reply('Meow 😀')
})

//* help command
bot.help(async ctx => {
  await ctx.reply(text.commands)
})

//* settings command
bot.settings(async ctx => {
  await ctx.reply('settings')
})

//* custom command
bot.command('course', async ctx => {
  await ctx.reply('Course command...')
})

//* bot.on text
/* bot.on('text', async ctx => {
  await ctx.reply('Answer from bot')
}) */

//* bot.on sticker
bot.on('sticker', async ctx => {
  ctx.reply('Nice sticker 😎')
})

//* mention method (didn't work)
bot.mention('bot', async ctx => {
  await ctx.reply('Mention method.')
})

//! (didn't work)
bot.phone('+1730263423', async ctx => {
  await ctx.reply('Phone method')
})

//* hashtag
bot.hashtag(['tag1', 'tag2', 'tag3'], async ctx => {
  await ctx.reply('This is hashtag...')
})

//* hashtag with forEach
/* const tags = ['pipe', 'hash', 'dou']

tags.forEach((x, idx) => {
  bot.hashtag(x, async ctx => {
    await ctx.reply(`This is hashtag: ${x}, #${idx + 1}`)
  })
}) */

// It's work

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

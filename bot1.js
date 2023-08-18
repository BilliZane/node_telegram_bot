const { Telegraf, Markup } = require('telegraf')
const { message } = require('telegraf/filters')
require('dotenv').config()
const axios = require('axios')
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOCKEN)

bot.start(ctx =>
  ctx.reply(
    `Привет ${
      ctx.message.chat.first_name ? ctx.message.chat.first_name : 'незнакомец'
    }`
  )
)

bot.help(ctx => ctx.reply(text.commands))

const getPosts = () => {
  axios
    .get('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(function (response) {
      // handle success
      // console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
    .finally(function () {
      // always executed
    })
}

// getPosts()

// async function getPosts () {
//   return fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
//     .then(res => res.json())
//     .then(data => console.log(data))
// }

// getPosts()

// bot.command('posts', async ctx => {
//   try {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
//     const data = await res.json()
//     console.log(data);
//   } catch(e) {
//     console.log(e);
//   }
// })

bot.command('course', async ctx => {
  try {
    console.log(ctx.from)
    console.log(ctx.chat)
    console.log(ctx.telegram.options.agent)

    await ctx.replyWithHTML(
      '<b>Курсы</b>',
      Markup.inlineKeyboard([
        [
          Markup.button.callback('Редакторы', 'btn_1'),
          Markup.button.callback('Обзоры', 'btn_2'),
          Markup.button.callback('Обзоры', 'btn_3')
        ]
      ])
    )
  } catch (e) {
    console.log(e)
  }
})

function addActionBot (name, src, text) {
  bot.action(name, async ctx => {
    try {
      await ctx.answerCbQuery()
      if (src !== false) {
        await ctx.replyWithPhoto({
          source: src
        })
      }
      await ctx.replyWithHTML(text, {
        disable_web_page_preview: true
      })
    } catch (e) {
      console.log(e)
    }
  })
}

addActionBot('btn_1', './img/1.jpg', text.text1)
addActionBot('btn_2', './img/2.jpg', text.text2)
addActionBot('btn_3', false, text.text3)

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

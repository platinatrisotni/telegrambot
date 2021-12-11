const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('5065247309:AAGVkODCf3V34DwPQYoisg7UEbwFYYLp7-U');

bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'hello there! Welcome to my new telegram bot. type /commands to see command list', {
    })
})


bot.command('commands', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, '/cities');
})


bot.hears('animals', ctx => {
    console.log(ctx.from)
    let animalMessage = `great, here are pictures of animals you would love`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, animalMessage, {
        reply_markup: {
            inline_keyboard: [
                [{
                    text: "dog",
                    callback_data: 'dog'
                },
                {
                    text: "cat",
                    callback_data: 'cat'
                }
                ],

            ]
        }
    })
})


bot.action('dog', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/Rimu.jpg"
    })

})

//method that returns image of a cat 

bot.action('cat', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "res/Rimu.jpg"
    })
})

bot.hears('voice', (ctx) => {
    bot.telegram.sendVoice(ctx.chat.id, {
        source: 'res/voice.ogg'
    })
})

bot.command('cities', async (ctx) => {
    const cityId = ctx.message.text.split(' ')[1];

    if (cityId) {
        const cities = await Array((await axios.default.get('https://61b45e4959c6ac0017301083.mockapi.io/cities/' + cityId)).data);
        cities.map(async (city) => {
            await ctx.replyWithPhoto({ url: city.avatar }, { caption: city.name })
        })
    } else {
        const cities = await (await axios.default.get('https://61b45e4959c6ac0017301083.mockapi.io/cities/')).data;
        cities.map(async (city) => {
            await ctx.replyWithPhoto({ url: city.avatar }, { caption: city.name })
        })
    }

})



bot.launch();

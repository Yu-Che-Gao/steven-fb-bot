const http = require('http')
const Bot = require('messenger-bot')
const messengerBotLib = require('./messengerBotLib.js');
const port = process.env.PORT || 80;

let bot = new Bot({
    token: 'EAAQHqpDgbr4BAAZBzHQiZBqLqVflUyeZAdKDJKpEjTq8tTMZCGP2VZC6L2ZAnAacu35jbNdcvw5kcSZBkZB7DldUz5enJImuFtq1plauT4K4GuUfoMDj8m96GJ3twmUKEZC9IEDiZBqAYFxNafq1kXZBfPNMKiBtUYEVvYmRqZA9OUnZB8QZDZD',
    verify: 'stevenfbbot',
    app_secret: 'cb7253f4b83a5afd1e41790a81cd8199'
})

bot.on('error', (err) => {
    console.log(err.message)
})

bot.on('message', (payload, reply) => {
    // console.log(payload.message.attachments[0].payload.url);
    console.log(payload);

    if (typeof (payload.message.text) !== 'undefined') {
        let payloadText = payload.message.text;
        let buttons = [
            {
                type: 'web_url',
                url: 'https://developers.facebook.com/search/?q=' + payloadText,
                title: 'search ' + payloadText
            },
            {
                type: 'postback',
                title: 'Help',
                payload: 'Help'
            }
        ]
        messengerBotLib.getTemplateMessage('button', 'What you want to do?', buttons, function (message) {
            console.log(message);
            reply(message, (err, info) => { console.log(err) });
        })


    } else if (payload.message.attachments[0].type === 'image') {
        reply({
            attachment: {
                type: 'image',
                payload: {
                    url: payload.message.attachments[0].payload.url
                }
            }
        }, (err, info) => {
            console.log(err);
        })
    }
})

bot.on('postback', (payload, reply) => {
    reply({
        text: 'please enter what you want to search from facebook API',
        quick_replies: [
            {
                content_type: 'text',
                title: 'access token',
                payload: "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_BLUE"
            },
            {
                content_type: 'text',
                title: 'graph api',
                payload: "DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_BLUE"
            }
        ]
    }, (err, info) => { })
})



http.createServer(bot.middleware()).listen(port)
console.log('steven fb explorer bot server running at port ' + port + '.')
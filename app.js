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
        // reply({
        //     attachment: {
        //         type: 'template',
        //         payload: {
        //             template_type: 'generic',
        //             elements: [
        //                 {
        //                     title: 'facebook api explorer',
        //                     image_url: 'http://x.rce.tw/s/h3584935/messenger-bot-store.jpg',
        //                     subtitle: 'Answering API is my style!!',
        //                     buttons: [
        //                         {
        //                             type: 'web_url',
        //                             url: 'https://developers.facebook.com/search/?q=' + payloadText,
        //                             title: 'Search ' + payloadText
        //                         },
        //                         {
        //                             type: 'postback',
        //                             title: 'Ask me',
        //                             payload: 'Ask me'
        //                         }
        //                     ]
        //                 }
        //             ]

        //         }
        //     }
        // }, (err, info) => {
        //     console.log(err);
        // })

        let startStation = ['左營', '台南', '嘉義', '雲林', '彰化', '台中', '苗栗', '新竹', '桃園', '板橋', '台北', '南港'];
        let startObject = [];
        for (let i = 0; i < startStation.length; i++) {
            startObject[i]={
                type:'postback',
                title:startStation[i],
                payload:startStation[i]
            }
        }

        reply(messengerBotLib.getTemplateMessage('buttons', '請選擇起程站', startObject));

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
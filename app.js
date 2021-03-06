const http = require('http')
const Bot = require('messenger-bot')
const messengerBotLib = require('./messengerBotLib.js');
const promiseLib = require('./promiseLib.js');
const port = process.env.PORT || 80;

var bot = new Bot({
    token: 'EAAQHqpDgbr4BAAZBzHQiZBqLqVflUyeZAdKDJKpEjTq8tTMZCGP2VZC6L2ZAnAacu35jbNdcvw5kcSZBkZB7DldUz5enJImuFtq1plauT4K4GuUfoMDj8m96GJ3twmUKEZC9IEDiZBqAYFxNafq1kXZBfPNMKiBtUYEVvYmRqZA9OUnZB8QZDZD',
    verify: 'stevenfbbot',
    app_secret: 'cb7253f4b83a5afd1e41790a81cd8199'
})

bot.on('error', (err) => {
    console.log(err.message)
})

bot.on('message', (payload, reply) => {
    console.log(payload);

    if (typeof (payload.message.text) !== 'undefined') {
        let payloadText = payload.message.text;

        switch (payloadText) {
            case 'direction':
                let choice = [
                    { content_type: 'text', title: '北上', payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_BLUE' },
                    { content_type: 'text', title: '南下', payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_BLUE' }
                ];

                let promiseDirection = promiseLib.getNewPromise(choice);
                promiseDirection.then((value) => {
                    console.log(value);
                    return messengerBotLib.getQuickReplies('請選擇方向', value);
                }).then((message) => {
                    console.log(message);
                    reply(message, (err, info) => { console.log(err); });
                })

                break;

            default:
                let buttons = [
                    { type: 'web_url', url: 'https://developers.facebook.com/search/?q=' + payloadText, title: 'search ' + payloadText },
                    { type: 'postback', title: 'Help', payload: 'Help' }
                ]

                let promiseButtons = promiseLib.getNewPromise(buttons);
                promiseButtons.then((value) => {
                    console.log(value);
                    return messengerBotLib.getTemplateMessage('button', 'what you want to do?', buttons);
                }).then((message) => {
                    console.log(message);
                    reply(message, (err, info) => { console.log(err); });
                })

                break;
        }

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
    let choice = [
        { content_type: 'text', title: '北上', payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_BLUE' },
        { content_type: 'text', title: '南下', payload: 'DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_BLUE' }
    ];

    let promise = promiseLib.getNewPromise(choice);
    promise.then((value) => {
        console.log(value);
        return messengerBotLib.getQuickReplies('請選擇方向', value);
    }).then((message) => {
        console.log(message);
        reply(message, (err, info) => { console.log(err); });
    })
})



http.createServer(bot.middleware()).listen(port)
console.log('steven fb explorer bot server running at port ' + port + '.')
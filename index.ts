import * as https from 'https'
import * as core from '@actions/core'
import { context } from '@actions/github'
import * as crypto from 'crypto'


function sign_with_timestamp(timestamp: number, key: string): string {
    const toencstr = `${timestamp}\n${key}`
    const signature = crypto.createHmac('SHA256', toencstr).digest('base64');
    return signature;
}

function PostToFeishu(id: string, content: string) {
    var options = {
        hostname: 'open.feishu.cn',
        port: 443,
        path: `/open-apis/bot/v2/hook/${id}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    var req = https.request(options, (res) => {
        res.on('data', (d) => {
            process.stdout.write(d);
        });
    });
    req.on('error', (e) => {
        console.error(e);
    });
    req.write(content);
    req.end();
}


function PostGithubEvent() {
    const webhook = core.getInput('webhook') ? core.getInput('webhook')
        : process.env.WEBHOOK_URL ? process.env.WEBHOOK_URL : ''

    const signKey = core.getInput('signkey') ? core.getInput('signkey')
        : process.env.SIGN_KEY ? process.env.SIGN_KEY : ""


    const github_event = context.payload || {}
    console.log(github_event)

    const webhookId = webhook.slice(webhook.indexOf('hook/') + 5)
    const tm = Math.floor(Date.now()/1000)
    console.log(tm)
    const sign = sign_with_timestamp(tm, signKey)
    console.log(sign)
    
    
    
    PostToFeishu(webhookId, `{"timestamp": "${tm}", "sign": "${sign}", "msg_type":"text","content":{"text":"www aaa ${github_event}"}}`)

}

PostGithubEvent()
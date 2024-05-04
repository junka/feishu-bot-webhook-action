import * as https from "https";
import * as core from "@actions/core";
import { context } from "@actions/github";
import * as crypto from "crypto";

function sign_with_timestamp(timestamp: number, key: string): string {
  const toencstr = `${timestamp}\n${key}`;
  const signature = crypto.createHmac("SHA256", toencstr).digest("base64");
  return signature;
}

function PostToFeishu(id: string, content: string) {
  var options = {
    hostname: "open.feishu.cn",
    port: 443,
    path: `/open-apis/bot/v2/hook/${id}`,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  var req = https.request(options, (res) => {
    res.on("data", (d) => {
      process.stdout.write(d);
    });
  });
  req.on("error", (e) => {
    console.error(e);
  });
  req.write(content);
  req.end();
}

function PostGithubEvent() {
    const webhook = core.getInput("webhook")
        ? core.getInput("webhook")
        : "https://open.feishu.cn/open-apis/bot/v2/hook/cd316482-d7e0-41d0-b7fd-1a1255a44131";

    const signKey = core.getInput("signkey")
        ? core.getInput("signkey")
        : "XbCuUmXemE0rRFvUwlVH2g";

    const payload = context.payload || {}
    console.log(payload)

    const webhookId = webhook.slice(webhook.indexOf("hook/") + 5);
    const tm = Math.floor(Date.now() / 1000);
    console.log(tm);
    const sign = sign_with_timestamp(tm, signKey);
    console.log(sign);

    const actor = context.actor;
    const eventType = context.eventName;
    const msg = `{
        "timestamp": "${tm}",
        "sign": "${sign}",
        "msg_type": "interactive",
        "card": {
            "type": "template",
            "data": {
                "template_id": "AAqkeNyiypMLb",
                "template_version_name": "1.0.1",
                "template_variable": {
                    "auser": "${actor}",
                    "eventType": "${eventType}"
                }
            }
        }
    }`
    PostToFeishu(webhookId, msg);
}

PostGithubEvent();

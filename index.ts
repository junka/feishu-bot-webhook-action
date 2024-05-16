import * as https from "https";
import * as core from "@actions/core";
import { context } from "@actions/github";
import * as crypto from "crypto";
import trend from './trend'


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


function PostGithubTrending(webhookId, tm, sign): void {
    trend().then(repos => {
        const json = JSON.stringify(repos);
        const msg = `{
        "timestamp": "${tm}",
        "sign": "${sign}",
        "msg_type": "interactive",
            "card": {
                "type": "template",
                "data": {
                    "template_id": "AAqkpVra76ijV",
                    "template_version_name": "1.0.0",
                    "template_variable": {
                        "object_list_1": ${json}
                    }
                }
            }
        }`
        PostToFeishu(webhookId, msg);
    });
}

function PostGithubEvent() {
    const webhook = core.getInput("webhook")
        ? core.getInput("webhook")
        : "";

    const signKey = core.getInput("signkey")
        ? core.getInput("signkey")
        : "";

    const payload = context.payload || {}
    console.log(payload)

    const webhookId = webhook.slice(webhook.indexOf("hook/") + 5);
    const tm = Math.floor(Date.now() / 1000);
    const sign = sign_with_timestamp(tm, signKey);

    const actor = context.actor || "junka";
    const eventType = context.eventName || "news";
    console.log(eventType)
    const repo = context.payload.repository?.name || "junka";
    var status = context.payload.action || "closed";
    var etitle = context.payload.issue?.html_url || context.payload.pull_request?.html_url
    var detailurl = ""
    const avatar = "img_v2_9dd98485-2900-4d65-ada9-e31d1408dcfg";
    switch (context.eventName) {
        case 'branch_protection_rule':
            break;
        case 'check_run':
            break;
        case 'check_suite':
            break;
        case 'create':
            break;
        case 'delete':
            break;
        case 'deployment':
            break;
        case 'deployment_status':
            break;
        case 'discussion':
            break;
        case 'discussion_comment':
            break;
        case 'fork':
            break;
        case 'gollum':
            break;
        case 'issue_comment':
            break;
        case 'issue':
            break;
        case 'label':
            break;
        case 'merge_group':
            break;
        case 'milestone':
            break;
        case 'page_build':
            break;
        case 'project':
            break;
        case 'project_card':
            break;
        case 'project_column':
            break;
        case 'public':
            break;
        case 'pull_request':
            break;
        case 'pull_request_comment':
            break;
        case 'pull_request_review':
            break;
        case 'pull_request_review_comment':
            break;
        case 'pull_request_target':
            break;
        case 'push':
            etitle = `Commits: ["${context.payload["head_commit"]["id"]}"]("${context.payload["compare"]}")`;
            status = context.payload["created"] == true ? "created": (context.payload["forced"] == true? "force updated" : "");
            detailurl = context.payload["compare"];
            break;
        case 'registry_package':
            break;
        case 'release':
            break;
        case 'repository_dispatch':
            break;
        case 'schedule':
            PostGithubTrending(webhookId, tm, sign);
            return;
        case 'status':
            break;
        case 'watch':
            //trigger at star started
            console.log(context.payload.repository)
            etitle = "Total stars: " + context.payload.repository?.["stargazers_count"];
            status = "stared";
            detailurl = context.payload.repository?.html_url || "";
            break;
        case 'workflow_call':
            break;
        case 'workflow_dispatch':
            break;
        case 'workflow_run':
            break;
    }

    const color = "blue";
    const msg = `{
        "timestamp": "${tm}",
        "sign": "${sign}",
        "msg_type": "interactive",
        "card": {
            "type": "template",
            "data": {
                "template_id": "AAqkeNyiypMLb",
                "template_version_name": "1.0.6",
                "template_variable": {
                    "repo": "${repo}",
                    "eventType": "${eventType}",
                    "themeColor": "${color}",
                    "auser": "${actor}",
                    "avatar": "${avatar}",
                    "status": "${status}",
                    "etitle": "${etitle}",
                    "detailurl": "${detailurl}"
                }
            }
        }
    }`
    PostToFeishu(webhookId, msg);
}

PostGithubEvent();

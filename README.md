
## feishu-bot-webhook-action

- What is this for?
Send Github events to Feishu Bot, but in the format that Feishu recognises.

- 作何用途？
利用github action发送事件消息到飞书自定义机器人/机器人

#### Add custom bot to a group in your Feishu app.
#### 添加一个自定义机器人到你的飞书群
In the bot setting, copy the webhook url and configure it to the action secrets as ```FEISHU_BOT_WEBHOOK```.

在自定义机器人设置界面，拷贝webhook url并配置到github仓库的action secrets中，命名为```FEISHU_BOT_WEBHOOK```

If you enable the signature verify in the bot setting, copy the signkey to secrets too, name it as ```FEISHU_BOT_SIGNKEY```

如果你启用了签名校验，那么请将签名密钥也拷贝到secrets中，命名为```FEISHU_BOT_SIGNKEY```

#### Add action workflow
#### 添加一个action workfow

custom the events you care

自定义你所关心的事件

```yaml
name: feishu bot

on:
  push:
    branches: [ "main" ]
  discussion:
    types: [created, edited, answered]
  discussion_comment:
    types: [created, deleted]
  fork
  create
  delete
  issues:
    types: [opened, edited, milestoned]
  issue_comment:
    types: [created, deleted]
  pull_request:
    branches: [ "main" ]
    types: [opened, reopened]
  merge_group:
    types: [checks_requested]
  milestone:
    types: [opened, deleted]
  project:
    types: [created, deleted]
  project_card:
    types: [created, deleted]
  watch:
    types: [started]

jobs:
  send-event:
    name: Webhook
    runs-on: ubuntu-latest
    steps:
      - uses: junka/feishu-bot-webhook-action@master
        with:
          webhook: ${{ secrets.FEISHU_BOT_WEBHOOK }}
          signkey: ${{ secrets.FEISHU_BOT_SIGNKEY }}

```

#### Action Input

As you can see that in the example workflow yaml file, you need the following input variables.

如上面例子展示的工作流的yaml文件所示，你需要关注以下输入变量。
- ```webhook```: required, the webhook url for the custom bot.
必需，自定义机器人的回调webhook
- ```signkey```: optional, the sign key for the bot when you enable the signature verification.
可选，自定义机器人的签名密钥，当启用签名校验时需要

Please configure ```FEISHU_BOT_WEBHOOK``` and ```FEISHU_BOT_SIGNKEY``` in the repo, ```Setting``` -> ```Secrets and variables``` -> ```Actions``` -> ```New Repository secrets```

请在仓库的设置中配置```FEISHU_BOT_WEBHOOK```和 ```FEISHU_BOT_SIGNKEY``` , 路径```Setting``` -> ```Secrets and variables``` -> ```Actions``` -> ```New Repository secrets```.

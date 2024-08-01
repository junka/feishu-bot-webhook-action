import { sign_with_timestamp, PostToFeishu } from '../src/feishu'
import * as core from '@actions/core'
import * as dotenv from 'dotenv'

dotenv.config({ path: ['.env.local'] })

const debugMock: jest.SpiedFunction<typeof core.debug> = jest
  .spyOn(core, 'debug')
  .mockImplementation()

describe('feishu', () => {
  it('signature', async () => {
    const signKey = 'dGhpcyBpcyBhIGtleQ=='
    const tm = 1716283459
    const signature = sign_with_timestamp(tm, signKey)
    expect(signature).toEqual('8EyY+xxfJvzWjZQpdc2mgvQFaG7lF5nbxl7RITyMkJU=')
  })

  it('fail to send txt msg with no signature', async () => {
    const msg = `{ "msg_type":"text","content":{"text":"request example"}}`
    const webhook = process.env.FEISHU_BOT_WEBHOOK || ''
    const webhookId = webhook.slice(webhook.indexOf('hook/') + 5)
    const ret = await PostToFeishu(webhookId, msg)
    expect(ret).toEqual(200)
    expect(debugMock).toHaveBeenNthCalledWith(1, 19021)
    expect(debugMock).toHaveBeenNthCalledWith(
      2,
      'sign match fail or timestamp is not within one hour from current time'
    )
  })
  /*
  it("send txt msg ok", async () => {
    const tm = Math.floor(Date.now() / 1000);
    const key = process.env.FEISHU_BOT_SIGNKEY || "";
    const webhook = process.env.FEISHU_BOT_WEBHOOK || "";
    const webhookId = webhook.slice(webhook.indexOf("hook/") + 5);
    const sign = sign_with_timestamp(tm, key);
    const msg = `{
            "timestamp": "${tm}",
            "sign": "${sign}",
            "msg_type":"text","content":{"text":"request example"}
        }`;
    console.log(msg);
    const ret = await PostToFeishu(webhookId, msg);
    expect(ret).toEqual(200);
  });
  */
})

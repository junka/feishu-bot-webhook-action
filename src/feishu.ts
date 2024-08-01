import * as https from 'https'
import * as crypto from 'crypto'
import * as core from '@actions/core'

export function sign_with_timestamp(timestamp: number, key: string): string {
  const toencstr = `${timestamp}\n${key}`
  const signature = crypto.createHmac('SHA256', toencstr).digest('base64')
  return signature
}

export async function PostToFeishu(
  id: string,
  content: string
): Promise<number | undefined> {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'open.feishu.cn',
      port: 443,
      path: `/open-apis/bot/v2/hook/${id}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const req = https.request(options, res => {
      const statusCode = res.statusCode
      res.on('data', d => {
        process.stdout.write(d)
        const result: string = d.toString()
        try {
          const json = JSON.parse(result)
          core.debug(json.code)
          core.debug(json.msg)
        } catch (err) {
          console.log(err)
        }
      })

      res.on('end', () => {
        resolve(statusCode)
      })
    })
    req.on('error', e => {
      console.error(e)
      reject(e)
    })
    req.write(content)
    req.end()
  })
}

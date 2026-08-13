import * as crypto from 'crypto'
import * as core from '@actions/core'

const FEISHU_HOOK_PREFIX = 'https://open.feishu.cn/open-apis/bot/v2/hook/'

/**
 * Generate the HMAC-SHA256 signature required by Feishu bot verification.
 *
 * Feishu algorithm (key = timestamp + "\n" + secret, empty message):
 *   sign = base64(HMAC_SHA256(key, ""))
 */
export function signWithTimestamp(timestamp: number, key: string): string {
  const toEncStr = `${timestamp}\n${key}`
  return crypto.createHmac('SHA256', toEncStr).digest('base64')
}

/**
 * Post a message payload to a Feishu bot webhook.
 *
 * Resolves with the HTTP status code of the response, or rejects when the
 * request itself fails. The response body is parsed (when possible) and its
 * code/msg are surfaced through core.debug for diagnostics.
 */
export async function PostToFeishu(
  id: string,
  content: string
): Promise<number | undefined> {
  const response = await fetch(`${FEISHU_HOOK_PREFIX}${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: content
  })

  const body: string = await response.text()
  try {
    const json = JSON.parse(body)
    core.debug(json.code)
    core.debug(json.msg)
  } catch {
    core.error(`Failed to parse Feishu response: ${body}`)
  }

  return response.status
}

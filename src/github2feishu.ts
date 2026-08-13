import * as core from '@actions/core'
import { context } from '@actions/github'
import getTrending from './trend'
import { signWithTimestamp, PostToFeishu } from './feishu'
import {
  BuildGithubTrendingCard,
  BuildGithubNotificationCard,
  NotificationCardData
} from './card'

type EventOutput = Pick<NotificationCardData, 'status' | 'etitle' | 'detailurl'>
type EventHandler = (payload: GithubPayload) => Partial<EventOutput>

/*
 * GitHub webhook payload (subset used by this action). Kept loosely typed
 * because not every event carries the same fields.
 */
type GithubPayload = Record<string, any>

const TRENDING_EVENT = 'schedule'
const CARD_COLOR = 'blue'

const eventHandlers: Partial<Record<string, EventHandler>> = {
  branch_protection_rule: payload => {
    const rule = payload.rule ?? {}
    return {
      status: payload.action || 'created',
      etitle: `${rule.name}:\n${JSON.stringify(rule)}`,
      detailurl: payload.repository?.html_url || ''
    }
  },

  create: payload => {
    const isTag = payload.ref_type === 'tag'
    return {
      status: 'create',
      etitle: `${isTag ? 'create tag' : 'create'}\n\n${payload.ref}`,
      detailurl: payload.repository?.html_url || ''
    }
  },

  delete: payload => {
    const isTag = payload.ref_type === 'tag'
    return {
      status: 'delete',
      etitle: `${isTag ? 'delete tag' : 'delete'}\n\n${payload.ref}`,
      detailurl: payload.repository?.html_url || ''
    }
  },

  issue_comment: payload => {
    const comment = payload.comment
    return {
      etitle: `[No.${payload.issue?.number} ${payload.issue?.title}](${payload.issue?.html_url})\n\n${comment?.body}\n\n`,
      detailurl: comment?.html_url || ''
    }
  },

  issues: payload => {
    const issue = payload.issue
    return {
      etitle: `[No.${issue?.number} ${issue?.title}](${issue?.html_url})\n\n${issue?.body}\n\n`,
      detailurl: issue?.html_url || ''
    }
  },

  push: payload => {
    const headCommit = payload.head_commit ?? {}
    const ref: string = payload.ref ?? ''
    const prefix = ref.includes('refs/tags/')
      ? `tag: ${ref.slice(ref.indexOf('refs/tags/') + 10)}`
      : ref.includes('refs/heads/')
        ? `branch: ${ref.slice(ref.indexOf('refs/heads/') + 11)}`
        : ''
    return {
      etitle: `${prefix}\n\nCommits: [${headCommit.id}](${headCommit.url})\n\n${headCommit.message}`,
      status:
        payload.created === true
          ? 'created'
          : payload.forced === true
            ? 'force updated'
            : '',
      detailurl: payload.compare || ''
    }
  },

  release: payload => {
    const release = payload.release ?? {}
    return {
      etitle: `${release.name ?? ''}\n${release.body ?? ''}\n${release.tag_name ?? ''}${release.prerelease === true ? '  prerelease' : ''}`,
      status: payload.action || 'published',
      detailurl: release.html_url || ''
    }
  },

  watch: payload => ({
    etitle: `Total stars: ${payload.repository?.stargazers_count ?? ''}`,
    status: 'stared',
    detailurl: payload.repository?.html_url || ''
  })
}

function defaultOutput(payload: GithubPayload): EventOutput {
  return {
    status: payload.action || 'closed',
    etitle: payload.issue?.html_url || payload.pull_request?.html_url || '',
    detailurl: ''
  }
}

async function PostGithubTrending(
  webhookId: string,
  timestamp: number,
  sign: string
): Promise<number | undefined> {
  const trend = await getTrending()
  const cardmsg = BuildGithubTrendingCard(timestamp, sign, trend)
  return PostToFeishu(webhookId, cardmsg)
}

export async function PostGithubEvent(): Promise<number | undefined> {
  const webhook =
    core.getInput('webhook') || process.env.FEISHU_BOT_WEBHOOK || ''
  const signKey =
    core.getInput('signkey') || process.env.FEISHU_BOT_SIGNKEY || ''

  const payload: GithubPayload = context.payload || {}
  const eventName = context.eventName
  const actor = context.actor
  const repo = payload.repository?.name || ''

  const webhookId = webhook.slice(webhook.indexOf('hook/') + 5)
  const tm = Math.floor(Date.now() / 1000)
  const sign = signWithTimestamp(tm, signKey)

  if (eventName === TRENDING_EVENT) {
    return PostGithubTrending(webhookId, tm, sign)
  }

  const handler = eventHandlers[eventName]
  const output: EventOutput = {
    ...defaultOutput(payload),
    ...(handler ? handler(payload) : {})
  }

  const cardmsg = BuildGithubNotificationCard(tm, sign, {
    repo,
    eventType: eventName,
    themeColor: CARD_COLOR,
    auser: actor,
    status: output.status,
    etitle: output.etitle,
    detailurl: output.detailurl
  })
  return PostToFeishu(webhookId, cardmsg)
}

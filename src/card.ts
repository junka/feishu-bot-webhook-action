import { Repository } from './trend'

type CardEnvelope<T> = {
  msg_type: 'interactive'
  card: {
    type: 'template'
    data: {
      template_id: string
      template_version_name: string
      template_variable: T
    }
  }
}

export type NotificationCardData = {
  repo: string
  eventType: string
  themeColor: string
  auser: string
  avatar: string
  status: string
  etitle: string
  detailurl: string
}

export type NotificationCardInput = Omit<NotificationCardData, 'avatar'>

type TrendingCardData = {
  object_list_1: Repository[]
}

const NOTIFICATION_TEMPLATE = {
  id: 'AAqkeNyiypMLb',
  version: '1.0.8'
} as const

const TRENDING_TEMPLATE = {
  id: 'AAqkpVra76ijV',
  version: '1.0.0'
} as const

const AVATAR = 'img_v2_9dd98485-2900-4d65-ada9-e31d1408dcfg'

function wrap<T>(tm: number, sign: string, envelope: CardEnvelope<T>): string {
  return JSON.stringify({ timestamp: `${tm}`, sign, ...envelope })
}

export function BuildGithubNotificationCard(
  tm: number,
  sign: string,
  data: NotificationCardInput
): string {
  const envelope: CardEnvelope<NotificationCardData> = {
    msg_type: 'interactive',
    card: {
      type: 'template',
      data: {
        template_id: NOTIFICATION_TEMPLATE.id,
        template_version_name: NOTIFICATION_TEMPLATE.version,
        template_variable: {
          repo: data.repo,
          eventType: data.eventType,
          themeColor: data.themeColor,
          auser: data.auser,
          avatar: AVATAR,
          status: data.status,
          etitle: data.etitle,
          detailurl: data.detailurl
        }
      }
    }
  }
  return wrap(tm, sign, envelope)
}

export function BuildGithubTrendingCard(
  tm: number,
  sign: string,
  repos: Repository[]
): string {
  const envelope: CardEnvelope<TrendingCardData> = {
    msg_type: 'interactive',
    card: {
      type: 'template',
      data: {
        template_id: TRENDING_TEMPLATE.id,
        template_version_name: TRENDING_TEMPLATE.version,
        template_variable: { object_list_1: repos }
      }
    }
  }
  return wrap(tm, sign, envelope)
}

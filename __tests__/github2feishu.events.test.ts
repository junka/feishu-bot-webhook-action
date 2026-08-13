import { context } from '@actions/github'
import * as core from '@actions/core'
import * as feishu from '../src/feishu'
import * as main from '../src/github2feishu'

jest.mock('../src/feishu', () => ({
  signWithTimestamp: jest.fn(() => 'SIGN'),
  PostToFeishu: jest.fn(async () => 200)
}))

jest.mock('../src/trend', () => ({
  __esModule: true,
  default: async () => [
    {
      author: 'a',
      name: 'b',
      href: 'https://github.com/a/b',
      description: 'd',
      language: 'ts',
      stars: '1',
      forks: '2',
      starsToday: '3'
    }
  ]
}))

const postMock = feishu.PostToFeishu as jest.MockedFn<typeof feishu.PostToFeishu>

jest
  .spyOn(core, 'getInput')
  .mockImplementation((name: string) =>
    name === 'webhook'
      ? 'https://open.feishu.cn/open-apis/bot/v2/hook/ABC'
      : ''
  )

beforeEach(() => postMock.mockClear())

async function runEvent(eventName: string, payload: Record<string, unknown>) {
  jest.replaceProperty(context, 'payload', payload as never)
  jest.replaceProperty(context, 'eventName', eventName)
  jest.replaceProperty(context, 'actor', 'tester')
  await main.PostGithubEvent()
  const [id, content] = postMock.mock.calls[0]
  return { id, parsed: JSON.parse(content as string) }
}

describe('refactor verification', () => {
  it('push event builds a notification card', async () => {
    const { id, parsed } = await runEvent('push', {
      ref: 'refs/heads/main',
      head_commit: { id: 'abc123', url: 'u', message: 'msg' },
      created: true,
      forced: false,
      compare: 'cmp',
      repository: { name: 'repo-x' }
    })
    expect(id).toBe('ABC')
    expect(parsed.timestamp).toBeTruthy()
    expect(parsed.msg_type).toBe('interactive')
    const v = parsed.card.data.template_variable
    expect(v.repo).toBe('repo-x')
    expect(v.eventType).toBe('push')
    expect(v.auser).toBe('tester')
    expect(v.avatar).toBeTruthy()
    expect(v.status).toBe('created')
    expect(v.etitle).toContain('branch: main')
    expect(v.etitle).toContain('abc123')
    expect(v.detailurl).toBe('cmp')
  })

  it('unhandled event falls through to default card', async () => {
    const { parsed } = await runEvent('status', {
      action: 'completed',
      repository: { name: 'r' }
    })
    const v = parsed.card.data.template_variable
    expect(v.status).toBe('completed')
    expect(v.etitle).toBe('')
    expect(v.detailurl).toBe('')
  })

  it('push with no head_commit does not crash', async () => {
    const { parsed } = await runEvent('push', {
      ref: 'refs/tags/v1.0',
      repository: { name: 'r' }
    })
    const v = parsed.card.data.template_variable
    expect(v.etitle).toContain('tag: v1.0')
  })

  it('schedule event builds a trending card', async () => {
    const { parsed } = await runEvent('schedule', {})
    expect(parsed.card.data.template_id).toBe('AAqkpVra76ijV')
    expect(parsed.card.data.template_variable.object_list_1.length).toBe(1)
  })

  it('release event with null name/body renders safely', async () => {
    const { parsed } = await runEvent('release', {
      action: 'published',
      release: { name: null, body: null, tag_name: 'v1.0', html_url: 'h' }
    })
    const v = parsed.card.data.template_variable
    expect(v.status).toBe('published')
    expect(v.detailurl).toBe('h')
  })
})
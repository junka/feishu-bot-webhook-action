import * as core from '@actions/core'
import { PostGithubEvent } from './github2feishu'

async function run(): Promise<void> {
  try {
    await PostGithubEvent()
  } catch (error) {
    core.setFailed(error instanceof Error ? error.message : String(error))
  }
}

void run()

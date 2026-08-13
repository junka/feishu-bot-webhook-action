import axios from 'axios'
import * as cheerio from 'cheerio'

export type Repository = {
  author: string
  name: string
  href: string
  description: string
  language: string
  stars: string
  forks: string
  starsToday: string
}

const STAR_TODAY_TEXT = 'stars today'

function stripCommas(value: string): string {
  return value.replace(/,/g, '')
}

function parseTitle(title: string): { author: string; name: string } {
  const cleaned = title.replace(/\s/g, '')
  const [author, name] = cleaned.split('/')
  return { author: author ?? '', name: name ?? '' }
}

export default async function getTrending(): Promise<Repository[]> {
  try {
    const response = await axios.get('https://github.com/trending')
    const $ = cheerio.load(response.data)
    const repos: Repository[] = []

    $('article').each((_, repo) => {
      const { author, name } = parseTitle($(repo).find('h2.h3 a').text())
      const repoPath = `${author}/${name}`
      const starSelector = `[href="/${repoPath}/stargazers"]`
      const forkSelector = `[href="/${repoPath}/forks"]`

      repos.push({
        author,
        name,
        href: `https://github.com/${repoPath}`,
        description: $(repo).find('p').text().trim() || '',
        language: $(repo).find('[itemprop=programmingLanguage]').text().trim(),
        stars: stripCommas($(repo).find(starSelector).text().trim()) || '0',
        forks: stripCommas($(repo).find(forkSelector).text().trim()) || '0',
        starsToday:
          stripCommas(
            $(repo)
              .find(`span.float-sm-right:contains('${STAR_TODAY_TEXT}')`)
              .text()
              .trim()
              .replace(STAR_TODAY_TEXT, '')
              .trim()
          ) || '0'
      })
    })

    return repos
  } catch (error) {
    throw new Error(
      `Can't fetch trending repos: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

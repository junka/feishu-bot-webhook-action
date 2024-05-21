import axios from "axios";
import * as cheerio from "cheerio";

export type Repository = {
  author: string;
  name: string;
  href: string;
  description: string;
  language: string;
  stars: string;
  forks: string;
  starsToday: string;
};

export default async function getTrending(): Promise<Repository[]> {
  try {
    const response = await axios.get(`https://github.com/trending`);
    const $ = cheerio.load(response.data);
    const repos: Repository[] = [];
    $("article").each((index, repo) => {
      const title = $(repo).find("h2.h3 a").text().replace(/\s/g, "");
      const author = title.split("/")[0];
      const name = title.split("/")[1];

      const starLink = `/${title.replace(/ /g, "")}/stargazers`;
      const forkLink = `/${title.replace(/ /g, "")}/forks`;
      let text = "stars today";

      const indexRepo: Repository = {
        author,
        name,
        href: `https://github.com/${author}/${name}`,
        description: $(repo).find("p").text().trim() || "",
        language: $(repo).find("[itemprop=programmingLanguage]").text().trim(),
        stars:
          $(repo).find(`[href="${starLink}"]`).text().trim().replace(",", "") ||
          "0",
        forks:
          $(repo).find(`[href="${forkLink}"]`).text().trim().replace(",", "") ||
          "0",
        starsToday:
          $(repo)
            .find(`span.float-sm-right:contains('${text}')`)
            .text()
            .trim()
            .replace(text, "")
            .replace(",", "")
            .trim() || "0",
      };

      repos.push(indexRepo);
    });

    return repos;
  } catch (error) {
    throw new Error("Can't fetch trending repos");
  }
}

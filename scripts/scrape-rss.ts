import fetch from "node-fetch";
import { parse } from "fast-xml-parser";
import { writeFileSync } from "fs";

main();

async function main() {
  const response = await fetch("https://softskills.audio/feed.xml");
  const body = await response.text();
  const data = parse(body);
  const parsedData = data.rss.channel.item
    .filter(
      (item: any) =>
        !item.title.toLowerCase().includes("rerun") &&
        !item.title.toLowerCase().includes("re-run")
    )
    .map((item: any) => ({
      url: item.link,
      episode: extractEpisode(item.title),
      date: new Date(item.pubDate),
      quote: "",
    }));

  writeFileSync("./scripts/scraped.json", JSON.stringify(parsedData, null, 2));
}

function extractEpisode(title: string) {
  const matches = title.match(/^Episode ([\d]+)/);
  if (!matches) throw new Error("Unable to parse episode number " + title);
  return Number(matches[1]);
}

import React, { useEffect, useLayoutEffect, useState } from "react";
import { format } from "date-fns";
import data from "./soft.json";
import "./soft.css";

// ignore incomplete data
const populatedData = data.filter(
  (x) => x.quote !== "" && x.quote !== "It takes more than "
);

interface Quote {
  quote: string;
  episode: number;
  date: string;
  url: string;
}

function SoftSkillsQuotes() {
  let [quote, setQuote] = useState(() => getRandomQuote());
  let [viewedQuotes, setViewedQuotes] = useState<number[]>([]);

  useEffect(() => {
    setViewedQuotes((cur) => {
      if (!quote) return cur;
      return [...cur, quote.episode];
    });
  }, [quote]);

  const getNewQuote = () => {
    const newQuote = getRandomQuote(viewedQuotes);
    if (!newQuote) {
      // we've seen everything, reset the list
      setViewedQuotes([]);
      setQuote(getRandomQuote());
      console.log("seen everything");
      return;
    }
    setQuote(newQuote);
  };

  useLayoutEffect(() => {
    document.title = "It Takes More";
  }, []);

  if (!quote) return null;

  return (
    <article>
      <main>
        <div className="quote">{quote.quote}</div>
        <div className="meta">
          <a href={quote.url}>Episode {quote.episode}</a>,{" "}
          {renderDate(quote.date)}
          <div>
            <button
              className="refresh-quote"
              type="button"
              onClick={getNewQuote}
            >
              I want more
            </button>
          </div>
        </div>
      </main>
      <footer>
        created by <a href="https://musumeche.com">Steven Musumeche</a>
      </footer>
    </article>
  );
}

function renderDate(date: string): string {
  const dateObj = new Date(date);
  return format(dateObj, "MMMM d, yyyy");
}

function getRandomQuote(exclude: number[] = []): Quote | null {
  const filtered = populatedData.filter((x) => !exclude.includes(x.episode));
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export default SoftSkillsQuotes;

import React, { useEffect, useLayoutEffect, useState } from "react";
import { format } from "date-fns";
import data from "./soft.json";
import "./soft.css";
import { Link, Route, Switch, useRouteMatch } from "react-router-dom";

const Routing = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/about`}>
        <SoftSkillsQuotesAbout />
      </Route>
      <Route exact path={path}>
        <SoftSkillsQuotes />
      </Route>
    </Switch>
  );
};

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
          <a href={quote.url} target="_blank" rel="noopener noreferrer">
            Episode {quote.episode}
          </a>
          , {renderDate(quote.date)}
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
        <div>
          made by <a href="https://musumeche.com">steven musumeche</a>
        </div>
        <div>
          <Link to="/it-takes-more/about">about this page</Link>
        </div>
      </footer>
    </article>
  );
}

function SoftSkillsQuotesAbout() {
  useLayoutEffect(() => {
    document.title = "It Takes More";
  }, []);

  return (
    <article>
      <main className="about">
        <p>
          These jokes are taken from one of my favorite podcasts,{" "}
          <a
            href="https://softskills.audio/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Soft Skills Engineering
          </a>
          . Every show starts with the hosts telling a joke that follows this
          formula:
        </p>
        <p className="joke">
          "It takes more than
          {" <JOKE HERE /> "}to be a great software engineer."
        </p>
        <p>
          I always get a chuckle out of them, so I decided to collect them for
          display on this site.
        </p>
      </main>
      <footer>
        <div>
          made by <a href="https://musumeche.com">steven musumeche</a>
        </div>
        <div>
          <Link to="/it-takes-more">back to quotes</Link>
        </div>
      </footer>
    </article>
  );
}

function renderDate(date: string): string {
  const dateObj = new Date(date);
  return format(dateObj, "MMMM d, yyyy");
}

function getRandomQuote(exclude: number[] = []): Quote | null {
  const filtered = data.filter((x) => !exclude.includes(x.episode));
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export default Routing;

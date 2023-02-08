import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { useLoaderData, Form, useSearchParams } from "@remix-run/react";
import stylesUrl from "~/styles/index.css";

type Row = {
  articleLink: string;
  articleTitle: string;
  text: string;
};

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");

  if (!q) return [];

  const resp = await fetch(`http://localhost:3333/search?q=${q}`);

  if (!resp.ok) {
    const errorText = await resp.text();

    throw new Error(errorText || resp.statusText);
  }

  const result = await resp.json();

  return result;
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

const SOURCES: { id: string; text: string }[] = [
  {
    id: "blind",
    text: "Blind",
  },
  {
    id: "dou",
    text: "DOU",
  },
];

export default function IndexRoute() {
  const data = useLoaderData<typeof loader>();
  let [searchParams] = useSearchParams();

  return (
    <div>
      <Form method="get" action="/">
        <label>
          Search:
          <select name="source">
            {SOURCES.map(({ id, text }) => (
              <option value={id} key={id}>
                {text}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="q"
            defaultValue={searchParams.get("q") || ""}
          />
        </label>
        <button type="submit">Send</button>
      </Form>
      <ul>
        {data.map(({ text, articleLink, articleTitle }: Row) => (
          <li className="row" key={`${text}${articleLink}`}>
            {text}
            <br />[
            <small>
              <a target="_blank" href={articleLink}>
                {articleTitle}
              </a>
            </small>
            ]
          </li>
        ))}
      </ul>
    </div>
  );
}

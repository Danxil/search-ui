import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';

import Search from '~/components/search';
import { SOURCES } from '~/components/search/form/constants';

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');

  if (!q) return [];

  const resp = await fetch(`http://localhost:3333/search?q=${q}`);

  if (!resp.ok) {
    const errorText = await resp.text();

    throw new Error(errorText || resp.statusText);
  }

  const result = await resp.json();

  return result;
};

export default function IndexRoute() {
  const data = useLoaderData<typeof loader>();
  let [searchParams] = useSearchParams();

  const searchStr = searchParams.get('q') || '';
  const initSource =
    (searchParams.get('source') as typeof SOURCES[number]['id']) ||
    SOURCES[0].id;

  return (
    <Search initSearchStr={searchStr} initSource={initSource} comments={data} />
  );
}

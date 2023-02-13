import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';

import type { Comment as CommentType } from '../components/search/results/comment';

import Search from '~/components/search';
import { SOURCES } from '~/components/search/form/constants';
import { SEARCH_URL } from '~/config'

type Response = {
  result: CommentType[],
  loadMoreActive: boolean,
}

export const loader = async ({ request }: LoaderArgs): Promise<Response> => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const from = url.searchParams.get('from');
  const sort = url.searchParams.get('sort');

  const resp = await fetch(`${SEARCH_URL}/search?q=${q || ''}&from=${from || ''}&sort=${sort || ''}`);

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
    <Search initSearchStr={searchStr} initSource={initSource} comments={data.result} loadMoreActive={data.loadMoreActive} />
  );
}

import type { LoaderArgs } from '@remix-run/node';

import type { Comment as CommentType } from '../modules/search/results/comment';

import Search from '~/modules/search';
import { SEARCH_URL } from '~/config'

type Response = {
  result: CommentType[],
  loadMoreActive: boolean,
}

export const loader = async ({ request }: LoaderArgs): Promise<Response> => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';
  const from = url.searchParams.get('from') || '';
  const sort = url.searchParams.get('sort') || '';
  const publicationDateFrom = url.searchParams.get('publicationDateFrom') || '';
  const publicationDateTo = url.searchParams.get('publicationDateTo') || '';

  const resp = await fetch(`${SEARCH_URL}/search?q=${q}&from=${from}&sort=${sort}&publicationDateFrom=${publicationDateFrom}&publicationDateTo=${publicationDateTo}`);

  if (!resp.ok) {
    const errorText = await resp.text();

    throw new Error(errorText || resp.statusText);
  }

  const result = await resp.json();

  return result;
};

export default function IndexRoute() {
  return <Search />;
}

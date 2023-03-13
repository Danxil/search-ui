import type { LoaderArgs, MetaFunction } from '@remix-run/node';

import type { CommentType } from '../modules/search/components/comment';

import Search from '~/modules/search';
import { SEARCH_URL } from '~/config'

export type Response = {
  result: CommentType[],
  loadMoreActive: boolean,
  perPage?: number,
  total?: number,
}

export const meta: MetaFunction = () => ({
  viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
  title: 'Comments search',
});

export const loader = async ({ request }: LoaderArgs): Promise<Response> => {
  console.log('====request====', request);
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';
  const page = url.searchParams.get('page') || '';
  const sort = url.searchParams.get('sort') || '';
  const publicationDateFrom = url.searchParams.get('publicationDateFrom') || '';
  const publicationDateTo = url.searchParams.get('publicationDateTo') || '';

  const resp = await fetch(`${SEARCH_URL}/search?q=${q}&page=${page}&sort=${sort}&publicationDateFrom=${publicationDateFrom}&publicationDateTo=${publicationDateTo}`);

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

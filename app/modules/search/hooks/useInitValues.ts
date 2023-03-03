import { useSearchParams } from '@remix-run/react';
import type { Moment } from 'moment';
import moment from 'moment';
import { useMemo } from 'react';

import { SORT_SWITCH_VALUE, SOURCES } from '../constants';
import type { SearchModel, SourceType } from '../types';


export default (): SearchModel => {
  let [searchParams] = useSearchParams();

  const q = searchParams.get('q') || '';
  const sort = (searchParams.get('sort') || '') === SORT_SWITCH_VALUE;

  const publicationDateFrom = searchParams.get('publicationDateFrom');
  const publicationDateTo = searchParams.get('publicationDateTo');

  const initPublicationDateFrom = publicationDateFrom ?
    moment(publicationDateFrom) :
    '';
  const initPublicationDateTo = publicationDateTo ?
    moment(publicationDateTo) : '';

  const dateRange: [Moment | null, Moment | null] = useMemo(() => [
    initPublicationDateFrom || null,
    initPublicationDateTo || null
  ], [publicationDateFrom, publicationDateTo]);

  const source =
    (searchParams.get('source') as SourceType) ||
    SOURCES[0].id;

  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 0;
  
  return {
    q,
    sort,
    dateRange,
    source,
    page,
  }
}
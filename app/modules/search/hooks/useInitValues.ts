import { useSearchParams } from '@remix-run/react';
import type { Moment } from 'moment';
import moment from 'moment';

import { SOURCES } from '../form/constants';

export default () => {
  let [searchParams] = useSearchParams();

  const initSearchStr = searchParams.get('q') || '';
  const initSort = searchParams.get('sort') || '';
  const initPublicationDateFrom = searchParams.get('publicationDateFrom') ?
    moment(searchParams.get('publicationDateFrom')) :
    '';
  const initPublicationDateTo = searchParams.get('publicationDateTo') ?
    moment(searchParams.get('publicationDateTo')) : '';

  const initFilter: [Moment | null, Moment | null] = [initPublicationDateFrom || null, initPublicationDateTo || null];

  const initSource =
    (searchParams.get('source') as typeof SOURCES[number]['id']) ||
    SOURCES[0].id;
  
  return {
    initSearchStr,
    initSort,
    initFilter,
    initSource,
  }
}
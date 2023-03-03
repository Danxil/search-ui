import type { Moment } from 'moment';

import type { SOURCES } from './constants';

export type SourceType = typeof SOURCES[number]['id'];

export type SearchModel = {
  q: string;
  source: SourceType;
  page: number;
  sort: boolean;
  dateRange: [Moment | null, Moment | null]
}

export type SearchModelSetters = {
    setQ: (val: SearchModel['q']) => void;
    setSource: (val: SearchModel['source']) => void;
    setPage: (val: SearchModel['page']) => void;
    setSort: (val: SearchModel['sort']) => void;
    setDateRange: (val: SearchModel['dateRange']) => void
  }
  
export type RequestObject = {
    q: string;
    source: SourceType;
    page: number;
    sort: 'asc' | 'desc' | '';
    publicationDateFrom: string;
    publicationDateTo: string;
}
import type { DateRange} from '@mui/x-date-pickers-pro';
import type { Moment } from 'moment';
import { useEffect } from 'react';

import type { SearchModel, SearchModelSetters } from '../types';

import { formatDate } from './useServerSync';

export type ReturnType = { model: SearchModel } & SearchModelSetters;

const dateRangeToString = (dateRange: DateRange<Moment>) =>
  dateRange.reduce((prev, date) => `${prev}${date ? formatDate(date) : ''}`, '')

export default ({
  query,
  current,
  setSort,
  setQ,
  setSource,
  setPage,
  setDateRange,
  load,
}: { query: SearchModel, current: SearchModel } & SearchModelSetters & { load: (mode: SearchModel) => void }) => {
  useEffect(() => {
    const dateRangeQueryString = dateRangeToString(query.dateRange);
    const dateRangeCurrentString = dateRangeToString(current.dateRange);

    if (query.sort !== current.sort) setSort(query.sort);
    if (query.q !== current.q) setQ(query.q);
    if (query.source !== current.source) setSource(query.source);
    if (query.page !== current.page) setPage(query.page);
    if (dateRangeQueryString !== dateRangeCurrentString)
      setDateRange(query.dateRange);
  }, [...Object.values(query)]);
}
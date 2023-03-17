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
}: { query: SearchModel, current: SearchModel } & SearchModelSetters) => {
  useEffect(() => {
    if (query.sort !== current.sort) setSort(query.sort);
  }, [query.sort]);

  useEffect(() => {
    if (query.q !== current.q) setQ(query.q);
  }, [query.q]);

  useEffect(() => {
    if (query.source !== current.source) setSource(query.source);
  }, [query.source]);
  
  useEffect(() => {
    if (query.page !== current.page) setPage(query.page);
  }, [query.page]);

  useEffect(() => {
    const dateRangeQueryString = dateRangeToString(query.dateRange);
    const dateRangeCurrentString = dateRangeToString(current.dateRange);

    if (dateRangeQueryString !== dateRangeCurrentString) {
      setDateRange(query.dateRange);
    }
  }, [query.dateRange]);
}
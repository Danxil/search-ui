import type { DateRange} from '@mui/x-date-pickers-pro';
import type { Moment } from 'moment';
import { useState } from 'react';

import type { SearchModel, SearchModelSetters } from '../types';

export type ReturnType = { model: SearchModel } & SearchModelSetters;

export default (init: SearchModel): ReturnType => {
  const [q, setQ] = useState(init.q);
  const [source, setSource] = useState(init.source);
  const [page, setPage] = useState(init.page);
  const [sort, setSort] = useState(init.sort);
  const [dateRange, setDateRange] = useState<DateRange<Moment>>(init.dateRange);

  const model: SearchModel = {
    q,
    source,
    sort,
    dateRange,
    page,
  }

  return {
    model,
    setSort,
    setDateRange,
    setSource,
    setQ,
    setPage,
  }
}
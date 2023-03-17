import { useCallback } from 'react';

import type { SearchModel, SearchModelSetters } from '../types';

export default (
  { setSort, setPage, setDateRange }: SearchModelSetters,
  model: SearchModel,
  load: (model: SearchModel) => void,
  loadWithoutNavigation: (model: SearchModel) => void,
) => {
  const setSortAndLoad = useCallback<typeof setSort>((sort) => {
    setSort(sort);
    setPage(0);
    load({ ...model, sort });
  }, [...Object.values(model)]);
    
  const setPageAndLoad = useCallback<typeof setPage>((page) => {
    setPage(page);
    
    load({ ...model, page });
  }, [...Object.values(model)]);
    
  const setDateRangeAndLoad = useCallback<typeof setDateRange>((dateRange) => {
    setDateRange(dateRange);
    setPage(0);
    
    load({ ...model, dateRange, page: 0 });
  }, [...Object.values(model), setPage]);

  const loadMoreData = useCallback(() => {
    loadWithoutNavigation(model);

    setPage(model.page + 1);
  }, [...Object.values(model), load, setPage]);

  return {
    setSortAndLoad,
    setPageAndLoad,
    setDateRangeAndLoad,
    loadMoreData
  }
}
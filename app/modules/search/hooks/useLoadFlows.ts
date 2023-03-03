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
  }, [model]);
    
  const setPageAndLoad = useCallback<typeof setPage>((page) => {
    setPage(page);
    
    load({ ...model, page });
  }, [model]);
    
  const dateRangeAndLoad = useCallback<typeof setDateRange>((dateRange) => {
    setDateRange(dateRange);
    setPage(0);
    
    load({ ...model, dateRange, page: 0 });
  }, [model, setPage]);

  const loadMoreData = useCallback(() => {
    loadWithoutNavigation(model);

    setPage(model.page + 1);
  }, [model, load, setPage]);

  return {
    setSortAndLoad,
    setPageAndLoad,
    dateRangeAndLoad,
    loadMoreData
  }
}
import { useCallback, useMemo, useRef } from 'react';
import { useSearchParams } from '@remix-run/react';

import Results from './components/results';
import Settings from './components/settings';
import Form from './components/form';
import useInitValues from './hooks/useInitValues';
import useModel from './hooks/useModel';
import type { ScrollViewReturnType } from './hooks/useServerSync';
import useServerSync from './hooks/useServerSync';
import PaginationView from './components/paginationView';
import ScrollView from './components/scrollView';
import CirteriaUpdateAlert from './components/cirteriaUpdateAlert';
import styles from './styles.module.css';
// Import from resultRow does't work
import './components/resultRow/styles.module.css'
import useModelControls from './hooks/useModelControls';
import useQuerySyncToModel from './hooks/useQuerySyncToModel';
import useLoadFlows from './hooks/useLoadFlows';

const renderLoading = () => <div className={styles.loading}>Wait...</div>;
const renderEmpty = () => <div className={styles.loading}>No results. Change criteria</div>;

const Search = () => {
  let [searchParams] = useSearchParams();

  const paginationView = useRef(searchParams.get('page') !== null).current;

  const { data, load, loadWithoutNavigation } = useServerSync(
    paginationView,
  ) as ScrollViewReturnType;

  const initModel = useInitValues();

  const { model, ...setters } = useModel(initModel);

  const {
    setPageAndLoad,
    setDateRangeAndLoad,
    setSortAndLoad,
    loadMoreData
  } = useLoadFlows(setters, model, load, loadWithoutNavigation);

  useQuerySyncToModel({ query: initModel, current: model, ...setters });

  const {
    renderSortSwitch,
    renderDateRange,
    renderSourceSelect,
    renderQueryInput,
    renderPagination,
  } = useModelControls({
    model,
    ...setters,
    setPage: setPageAndLoad,
    setDateRange: setDateRangeAndLoad,
    setSort: setSortAndLoad,
  });

  const onSearchPress = useCallback(() => setPageAndLoad(0), [setPageAndLoad])

  const renderPaginationWithPageData = useCallback(() =>
    renderPagination(data.perPage || 0, data.total || 0), [
    data.perPage, data.total, renderPagination
  ]);

  const renderResult = useCallback(() => {

    if (!data.result) return;
    return <Results>
      {
        paginationView ? (
          <PaginationView
            comments={data.result}
            renderPagination={renderPaginationWithPageData}
          />
        ) : <ScrollView comments={data.result} loadMore={loadMoreData} />
      }
    </Results>
  }, [paginationView, data.result, renderPaginationWithPageData, loadMoreData]);

  const resultNode = useMemo(() => {
    if (data.result === null) {
      return renderLoading();
    } else if (!data.result.length) {
      return renderEmpty()
    }
    return renderResult();
  }, [ renderLoading, renderResult, renderEmpty, data.result])

  return (
    <div className={styles.container}>
      <Form
        load={onSearchPress}
        renderSourceSelect={renderSourceSelect}
        renderQueryInput={renderQueryInput}
      >
        <Settings
          renderSortSwitch={renderSortSwitch}
          renderDateRange={renderDateRange}
        />
      </Form>
      {resultNode}
      <CirteriaUpdateAlert watch={data.result} />
    </div>
  );
};

export default Search;
import { useLoaderData } from '@remix-run/react';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import { Snackbar } from '@mui/material';

import Results from './results';
import styles from './styles.module.css';
import Settings from './form/settings';
import Form from './form';
import useInitValues from './hooks/useInitValues';
import useCriteriaUpdateAlret from './cirteriaUpdateAlert';

import type { loader } from '~/routes';

const Search = () => {
  const {
    initSearchStr,
    initSort,
    initFilter,
    initSource,
  } = useInitValues();

  const data = useLoaderData<typeof loader>();

  const { renderAlert } = useCriteriaUpdateAlret(data.result);

  const formRef = useRef<HTMLFormElement>(null);

  const onSettingsChange = useRef(() => {
    if (!formRef.current) return;

    formRef.current.dispatchEvent(new Event('submit', { bubbles: true }));
  }).current;

  const onSubmit = useRef(() => {
    if (!formRef.current) return; 

    if (formRef.current.publicationDateFrom.value)
      formRef.current.publicationDateFrom.value = moment(formRef.current.publicationDateFrom.value).utc().format();

    if (formRef.current.publicationDateTo.value)
      formRef.current.publicationDateTo.value = moment(formRef.current.publicationDateTo.value).utc().format();
  }).current;

  return (
    <div className={styles.container}>
      <Form initSearchStr={initSearchStr} initSource={initSource} onSubmit={onSubmit} ref={formRef}>
        <Settings onChange={onSettingsChange} initSort={initSort} initFilter={initFilter} />
      </Form>
      <Results comments={data.result} loadMoreActive={data.loadMoreActive} loadMore={onSettingsChange} />
      {renderAlert()}
    </div>
  );
};

export default Search;

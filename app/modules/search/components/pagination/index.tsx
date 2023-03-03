import PaginationMui from '@mui/material/Pagination';
import React from 'react';
import { useCallback } from 'react';

import styles from './styles.module.css'

const Pagination = (
  {
    page,
    onChange,
    perPage,
    total
  }: { page: number; perPage: number; total: number; onChange: (page: number) => void; }) => {
  const onChangeCb = useCallback((event: React.ChangeEvent<unknown>, value: number) => {
    onChange(value - 1);
  }, [onChange]);

  return (
    <div className={styles.container}>
      <PaginationMui count={Math.ceil(total / perPage)} page={page + 1} size="small" onChange={onChangeCb} />
    </div>
  );
}

export default React.memo(Pagination);
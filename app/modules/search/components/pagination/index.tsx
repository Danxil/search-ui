import React from 'react';
import { useCallback } from 'react';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import IconButton from '@mui/material/IconButton';

import { MAX_PAGE } from '../../constants';

import styles from './styles.module.css'

const Pagination = (
  {
    page,
    onChange,
    loadMoreActive
  }: { page: number; onChange: (page: number) => void; loadMoreActive: boolean }) => {
  const onPrev = useCallback(() => {
    const newVal = page - 1;
    onChange(newVal);
  }, [onChange, page]);

  const onNext = useCallback(() => {
    const newVal = page + 1;
    onChange(newVal);
  }, [onChange, page]);

  return (
    <div className={styles.container}>
      <IconButton disabled={page <= 0}>
        <ArrowCircleLeftIcon onClick={onPrev} />
      </IconButton>
      { page + 1}
      <IconButton disabled={!loadMoreActive || page >= MAX_PAGE}>
        <ArrowCircleRightIcon onClick={onNext} />
      </IconButton>
    </div>
  );
}

export default React.memo(Pagination);
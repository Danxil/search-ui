import type { ReactNode } from 'react';
import React from 'react';

import type { CommentType } from '../comment';
import Comment from '../comment';
import ResultRow from '../resultRow';


const PaginationView = ({
  comments,
  renderPagination
}: {
  comments: CommentType[];
  renderPagination: () => ReactNode
}) => {
  return <>
    <ul>
      {
        comments.map((row: CommentType) => (
          <ResultRow key={`${row.text}${row.articleLink}`}>
            <Comment {...row} />
          </ResultRow>
        ))
      }
    </ul>
    {renderPagination()}
  </> 
}

export default React.memo(PaginationView);
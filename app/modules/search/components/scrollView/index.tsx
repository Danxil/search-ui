import React from 'react';
import { Virtuoso } from 'react-virtuoso';

import type { CommentType } from '../comment';
import Comment from '../comment';
import ResultRow from '../resultRow';

const ScrollView = ({
  comments,
  loadMore,
}: {
    comments: CommentType[];
    loadMore: () => void;
  }) => {
  // Virtuoso should be re-initialize after passing the empty list, otherwise infinity document-scroll does't work
  return (
    <Virtuoso
      useWindowScroll
      totalCount={comments.length}
      endReached={loadMore}
      components={{ Item: ResultRow }}
      itemContent={index => <Comment
        {...comments[index]}
        key={`${comments[index].text}${comments[index].articleLink}`}
      />}
    />
  )
}

export default React.memo(ScrollView);
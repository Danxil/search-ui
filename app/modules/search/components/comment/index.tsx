import moment from 'moment';
import React from 'react';

import styles from './styles.module.css';

export type CommentType = {
  articleLink: string;
  articleTitle: string;
  text: string;
  publicationDate: string;
};

const Comment = ({ text, articleLink, articleTitle, publicationDate }: CommentType) => {
  return (
    <div className={styles.row} key={`${text}${articleLink}`}>
      <div className={styles.container}>
        <div className={styles.meta}>
          <div>
            [
            <small>
              <a target="_blank" href={articleLink} rel="noreferrer">
                {articleTitle}
              </a>
            </small>
            ]
          </div>
          <div className={styles.date}>
            {moment(publicationDate).format('MM/DD/YYYY HH:mm')}
          </div>
        </div>
        <div className={styles.comment}>
          {text}
        </div>
       
      </div>
    </div>
  );
};

export default React.memo(Comment);
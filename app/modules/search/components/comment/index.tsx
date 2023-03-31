import moment from 'moment';
import React, { useEffect, useRef } from 'react';

import styles from './styles.module.css';

export type CommentType = {
  articleLink: string;
  articleTitle: string;
  text: string;
  publicationDate: string;
  highlight: string[]
};

const DATE_FORMAT = 'MM/DD/YYYY HH:mm';

const isBrowser = !!(
  (typeof window !== 'undefined' &&
  window.document && window.document.createElement)
);

let rendered = false;

// const highlightText = (text, hilight) => {
//   const uniqueItems = onlyUnique(value, index, array) {
//     return self.indexOf(value) === index;
//   };
// } 

const Comment = ({ text, articleLink, articleTitle, publicationDate, highlight }: CommentType) => {
  // const highlightText = useRef(highlight.filter()).current;

  useEffect(() => {
    rendered = true;
  }, []);
  
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
            {
              // Convert date to the local time only after 
              // the first render - to avoid errors related to the different DOM tree during the hydration process)
              isBrowser && rendered ?
                moment(publicationDate).format(DATE_FORMAT) :
                moment(publicationDate).utc().format(DATE_FORMAT)
            }
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
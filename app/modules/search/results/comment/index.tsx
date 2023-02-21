import moment from 'moment';

import styles from './styles.module.css';

export type Comment = {
  articleLink: string;
  articleTitle: string;
  text: string;
  publicationDate: string;
};

const CommentComp = ({ text, articleLink, articleTitle, publicationDate }: Comment) => {
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

export default CommentComp;
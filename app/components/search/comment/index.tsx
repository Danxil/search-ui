import styles from './styles.module.css';

export type Comment = {
  articleLink: string;
  articleTitle: string;
  text: string;
};

export default ({ text, articleLink, articleTitle }: Comment) => {
  return (
    <li className={styles.row} key={`${text}${articleLink}`}>
      {text}
      <br />[
      <small>
        <a target="_blank" href={articleLink} rel="noreferrer">
          {articleTitle}
        </a>
      </small>
      ]
    </li>
  );
};

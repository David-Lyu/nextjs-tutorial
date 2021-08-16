import Image from 'next/image';
import styles from './Card.module.css';

export default function Card({ post, children }) {
  const { message, image } = post;

  console.log(message, image);

  return (
    <div className={styles['card-container']}>
      <div className={styles['card-image']}>
        {!image && (
          <Image
            src={'/pictures/try.svg'}
            width="300px"
            height="300px"
            layout="responsive"
            alt="post image"
          />
        )}
      </div>
      <div className={styles['card-body']}>
        <p>Caption:</p>
        <p>{message}</p>
      </div>
    </div>
  );
}

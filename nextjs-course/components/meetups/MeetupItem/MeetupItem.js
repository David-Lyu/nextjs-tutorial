import Card from '../../ui/Card';
import classes from './MeetupItem.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

function MeetupItem(props) {
  const router = useRouter();

  function showDetailsHandler() {
    //equivalent using a link component
    router.push('/' + props.id);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          {/* should make it IMage */}
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          {/* Instead of button we could use Link from next/link */}
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;

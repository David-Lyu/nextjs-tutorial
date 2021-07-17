import MeetupList from '../components/meetups/MeetupList/MeetupList';
import { MeetupClient } from './api/mongodb';

function HomePage(props) {
  return <MeetupList meetups={props.meetups}></MeetupList>;
}

export default HomePage;

//look at text file static_vs_server_render
export async function getStaticProps() {
  //can have context parameter
  //fetch api data
  const connectedMeetupClient = await MeetupClient.connect();
  const db = await MeetupClient.db();
  const meetupsCollection = await db.collection('Meetup');
  const meetups = await meetupsCollection.find().toArray();

  MeetupClient.close;

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    }
    // revalidate: 10
  };
}

//alternative function
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   //work with headers etc

//   // fetch api data
//   //only runs on server can use credentials and stuff
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }

import MeetupList from '../components/meetups/MeetupList/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'first meetup',
    image: 'stuff',
    address: 'some address',
    description: 'this is the first meetup'
  },
  {
    id: 'm2',
    title: 'second meetup',
    image: 'more stuff',
    address: 'some address 2',
    description: 'this is the second meetup'
  }
];

function HomePage(props) {
  return <MeetupList meetups={props.meetups}></MeetupList>;
}

export default HomePage;

//look at text file static_vs_server_render
export async function getStaticProps() {
  //can have context parameter
  //fetch api data
  return {
    props: {
      meetups: DUMMY_MEETUPS
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

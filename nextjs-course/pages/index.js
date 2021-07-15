import MeetupList from '../components/meetups/MeetupList/MeetupList';

const DUMMY_MEETUP = [
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

function HomePage() {
  return <MeetupList meetups={DUMMY_MEETUP}></MeetupList>;
}

export default HomePage;

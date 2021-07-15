//can also do [meetupId].js in the pages directory. This is to show you can have
// a file with a dynamic route too!
import MeetupDetail from '../../components/meetups/MeetupDetail';

function MeetupDetails(props) {
  return (
    <MeetupDetail
      image="asdf"
      title="First Meetup"
      address="Address, City"
      description="This is a first meetup"
    />
  );
}

export default MeetupDetails;

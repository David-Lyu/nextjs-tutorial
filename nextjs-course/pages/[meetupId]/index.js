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

export async function getStaticProps(context) {
  //fetch data for a single meetup
  console.log(context);
  const { meetupId } = context.params;
  return {
    props: {
      meetupData: {
        image: 'asdf',
        title: 'First Meetup',
        address: 'Address, City',
        description: 'This is a first meetup'
      }
    }
  };
}

//needed for dynamic paths, [], AND using getStaticProps
export async function getStaticPaths() {
  return {
    fallback: false, // If false see a 404 error. If true will try to set up page dynamically
    paths: [
      {
        params: {
          meetupId: 'm1'
        }
      },
      {
        params: {
          meetupId: 'm2'
        }
      }
    ]
  };
}

export default MeetupDetails;

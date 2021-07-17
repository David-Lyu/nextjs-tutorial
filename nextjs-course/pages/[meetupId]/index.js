//can also do [meetupId].js in the pages directory. This is to show you can have
// a file with a dynamic route too!
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MeetupClient } from '../api/mongodb';
import { ObjectId } from 'mongodb';

function MeetupDetails({ meetupData }) {
  return (
    <>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      <MeetupDetail
        image={meetupData.image}
        title={meetupData.title}
        address={meetupData.address}
        description={meetupData.description}
      />
    </>
  );
}

export async function getStaticProps(context) {
  //fetch data for a single meetup
  const { meetupId } = context.params;
  const connectedMeetupClient = await MeetupClient.connect();
  const db = await MeetupClient.db();
  const meetupsCollection = await db.collection('Meetup');
  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  MeetupClient.close;
  return {
    props: {
      meetupData: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description
      }
    }
  };
}

//needed for dynamic paths, [], AND using getStaticProps
export async function getStaticPaths() {
  const connectedMeetupClient = await MeetupClient.connect();
  const db = await MeetupClient.db();
  const meetupsCollection = await db.collection('Meetup');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  MeetupClient.close;
  return {
    fallback: false, // If false see a 404 error. If true will try to set up page dynamically
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString()
      }
    }))
  };
}

export default MeetupDetails;

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupFrom/NewMeetupForm';

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const config = {
      method: 'POST',
      body: JSON.stringify(enteredMeetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const response = await fetch('/api/new-meetup', config);
    const data = await response.json();

    console.log(data);
    //cannot go back with the back button
    router.replace('/');
  }

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups and create amazing networking opportunities."
        />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}

export default NewMeetupPage;

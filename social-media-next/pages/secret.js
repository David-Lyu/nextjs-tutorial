import { useState, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/client';

export default function Secret(props) {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/secret');
      const json = await res.json;

      if (json.content) setContent(json.content);
      fetchData();
    };
  }, [session]);

  if (typeof window !== 'undefined' && loading) return null;
  if (!session) {
    return <div>You aren&apos;t signed in, please sign in</div>;
  }
  return (
    <div>
      {'Protected'}
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

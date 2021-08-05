import { useEffect, useState } from 'react';

//this should be either client side or rendered with server-side
//might be just a component
//should get id of user wanting to display
export default function Dashboard({ user }) {
  const userId = user.id;
  const [isLoaded, setIsLoaded] = useState(false);
  const [post, setPost] = useState([]);

  useEffect(() => {}, []);
  return (
    <div>
      {!isLoaded && <div>Loading screen</div>}
      {isLoaded && <div>{post.map()}</div>}
    </div>
  );
}

import { useEffect, useState } from 'react';

//this should be either client side or rendered with server-side
//might be just a component
//should get id of user wanting to display
export default function Dashboard({ user }) {
  const userId = user.id;
  const [isLoaded, setIsLoaded] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    //client side rendering to get post based on user id or profile id
    //want to use swr eventually
    fetch(`/api/user/posts/get/${userId}`)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setIsLoaded(true);
        setPosts(data.posts);
      })
      .catch(console.error);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {!isLoaded && <div>Loading screen</div>}
      {isLoaded && (
        <ul>
          {posts.map((post) => {
            return <li key={post._id}>{post.message}</li>;
          })}
        </ul>
      )}
    </div>
  );
}

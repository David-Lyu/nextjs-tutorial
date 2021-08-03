export default function getUserPage(props) {
  //probably use grid to style this places
  console.log(props.id);
  return (
    <div className="container">
      <div>Portfolio</div>
      feed
    </div>
  );
}

export async function getServerSideProps(context) {
  //fetch user here

  const data = 'stuff';
  //if doesn't exist then push back to original pageProps
  if (!data) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  //if does exist logic
  const id = context.params._id;
  console.log(id);
  return {
    props: { id }
  };
}

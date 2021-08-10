import Dashboard from '../../components/modules/user-page/Dashboard';

export default function getOtherUserPage(props) {
  const user = { id: '61096c082e91882d00ea33b9' };
  return <Dashboard user={user} />;
}

// export async function getServerSideProps(context) {}

import Link from 'next/link';
import { signOut } from 'next-auth/client';

export default function ProfileOptions(props) {
  const { userId } = props;
  return (
    <ul>
      <li>
        <Link href={`/profile/${userId}`}>
          <a>My profile</a>
        </Link>
      </li>
      <li>
        <Link href={`/profile/settings`}>
          <a>Settings</a>
        </Link>
      </li>
      <li>
        <Link href={'/'}>
          <a onClick={() => signOut({ callbackUrl: '/' })}>Logout</a>
        </Link>
      </li>
    </ul>
  );
}

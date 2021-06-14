import Image from 'next/image';
import Link from 'next/link';

const ImageComponent = () => {
  return (
    <>
      <Image
        src="/images/profile.jpg"
        height={144}
        width={144}
        alt="profile name"
      />
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </>
  );
};

export default ImageComponent;

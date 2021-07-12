// dynamic path from somewhere else
// [] tells dynamic path, the value inside is what next should look for

import { useRouter } from 'next/router';

export default function DetailPage() {
  const router = useRouter();

  console.log(router.query.newsId);
  return <h1>Important</h1>;
}

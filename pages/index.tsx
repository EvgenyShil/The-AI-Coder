import Head from 'next/head';
import Diagram from '@/components/Diagram';

export default function Home() {
  return (
    <>
      <Head>
        <title>ИИ‑программист: схемы</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Diagram />
    </>
  );
}

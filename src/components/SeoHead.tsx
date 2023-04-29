import Head from "next/head";

interface Props {
  title: string;
  desc: string;
}

const SeoHead = ({ title, desc }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
export default SeoHead;

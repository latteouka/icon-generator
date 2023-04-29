import { type NextPage } from "next";
import Image from "next/image";
import SeoHead from "~/components/SeoHead";
import { BUCKET_URL } from "~/server/api/routers/generate";
import { api } from "~/utils/api";

const GeneratePage: NextPage = () => {
  const icons = api.icon.getIcons.useQuery();
  return (
    <>
      <SeoHead title="Your Icons" desc="Your icons" />
      <main className="container mx-auto mt-24 flex min-h-screen flex-col px-8">
        <h1 className="mb-4 text-4xl">Your Icons</h1>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {icons.data?.map((icon) => (
            <li className="" key={icon.id}>
              <Image
                src={`https://chundev-icon-generator.s3.ap-northeast-1.amazonaws.com/${icon.id}`}
                width={100}
                height={100}
                alt="an image of your generated propmt"
                className="w-full rounded-lg"
              />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default GeneratePage;

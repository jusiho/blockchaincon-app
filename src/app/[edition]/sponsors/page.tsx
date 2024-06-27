import { getServerSession } from "next-auth/next";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: {
    edition: string;
  };
};
export default async function Page({ params }: Props) {
  const { edition } = params;
  if (!["peru", "colombia", "mexico"].includes(edition)) {
    notFound();
  }

  const responseSponsors = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/myplugin/v1/sponsors?page=1&per_page=50`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await responseSponsors.json();

  const sponsors = data.sponsors;
  console.log(sponsors);

  const sponsorsFilter = sponsors.filter((sponsor: any) =>
    sponsor.edicion ? sponsor.edicion.includes(edition) : false
  );

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {sponsorsFilter.map((sponsor: any) => (
            <div
              key={sponsor.id}
              className="w-full bg-white rounded p-6 flex-col justify-center items-center grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4"
            >
              <div className="mb-4 p-4">
                <Image
                  width={144}
                  height={144}
                  className="object-center object-contain h-36 w-full"
                  src={sponsor.thumbnail_url}
                  alt="photo"
                />
              </div>
              <div className="p-4 col-span-2">
                <h3 className="text-xl font-bold text-gray-900">
                  {sponsor.title}
                </h3>
                <p
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: sponsor.content }}
                />
              </div>
              <div className="flex justify-center">
                <Link
                  href={sponsor.url}
                  target="_blank"
                  className="bg-black text-white rounded px-4 py-2"
                >
                  Más información aquí
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

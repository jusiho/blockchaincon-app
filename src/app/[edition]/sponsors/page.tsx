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
  console.log(edition);
  const session = await getServerSession(AuthOptions);
  console.log(session.user.token);
  if (!session) {
    notFound();
  }

  const token = session.user.token;

  const responseSponsors = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/wp-json/myplugin/v1/sponsors?page=1&per_page=50`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await responseSponsors.json();

  const sponsors = data.sponsors;

  const sponsorsFilter = sponsors.filter((sponsor: any) =>
    sponsor.edicion.includes(edition)
  );

  return (
    <>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="text-center pb-12">
          <h2 className="text-base font-bold text-indigo-600">
            We have the best equipment
          </h2>
          <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900">
            Check our awesome team members
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {sponsorsFilter.map((sponsor: any) => (
            <div
              key={sponsor.id}
              className="w-full bg-white p-6 flex flex-col justify-center items-center"
            >
              <div className="mb-4">
                <Image
                  width={144}
                  height={144}
                  className="object-center object-contain h-36 w-full"
                  src={sponsor.thumbnail_url}
                  alt="photo"
                />
              </div>
              <div className="text-center">
                <p className="text-xl text-gray-700 font-bold mb-2">
                  {sponsor.title}
                </p>
                {sponsors.url && (
                  <Link
                    href={sponsor.url}
                    className="bg-green-700 rounded px-4 py-2"
                  >
                    Ver más
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

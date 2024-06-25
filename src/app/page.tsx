import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { AuthOptions } from "./api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";

// Titulo de la pagina que aparece en el navegador barra de arriba
export const metadata = {
  title: "Wealth Expo LA | App Web Oficial",
  description:
    "Wealth Expo es el encuentro de trading y mercados financieros en Latinoamérica. Conecta con tus potenciales y actuales clientes en México, Colombia y Perú.",
};

const sponsors = [
  {
    role: "sponsor_mexico",
    href: "/mexico",
    imageSrc:
      "https://blockchaincon.la/wp-content/uploads/2024/05/logo-blockchain.svg",
    alt: "México",
  },
  {
    role: "sponsor_colombia",
    href: "/colombia",
    imageSrc:
      "https://blockchaincon.la/wp-content/uploads/2024/05/logo-blockchain.svg",
    alt: "Colombia",
  },
];

function SponsorBox({
  href,
  imageSrc,
  alt,
  isSponsor,
}: {
  href: string;
  imageSrc: string;
  alt: string;
  isSponsor: boolean;
}) {
  return isSponsor ? (
    <Link
      href={href}
      className="bg-gray-900 h-32 flex flex-col shadow-lg items-center justify-center gap-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1"
    >
      <Image src={imageSrc} alt={alt} width={500} height={500} />
    </Link>
  ) : (
    <div className="relative group bg-gray-900 h-32 flex flex-col shadow-lg items-center justify-center gap-2 px-4 rounded-md">
      <Image src={imageSrc} alt={alt} width={500} height={500} />
      <button className="absolute bottom-0 bg-red-500 text-white w-full h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded">
        Solicitar ser sponsor
      </button>
    </div>
  );
}

export default async function Home() {
  const session = await getServerSession(AuthOptions);

  if (!session) {
    notFound();
  }

  const roles = session.user.roles;

  const isAdmin = roles.some((role: string) => role === "administrator");
  const hasRole = (role: string) => roles.some((r: string) => r === role);

  return (
    <main className="dark:bg-black flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>

      <div className="z-20 relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-[#9717dc] after:via-[#9717dc] after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-[#9717dc] before:dark:opacity-10 after:dark:from-[#9717dc] after:dark:via-[#9717dc] after:dark:opacity-40 before:lg:h-[360px] ">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#9717dc] "
          src="/landing/logo-main.png"
          alt="Blockchaincon"
          width={500}
          height={250}
          priority
        />
      </div>
      <div className="py-10 relative bg-black sm:py-16 lg:py-24 lg:pt-36">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center z-50">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-light text-white sm:text-4xl sm:leading-tight">
              Ediciones
            </h2>
          </div>

          <div className="grid items-center max-w-4xl grid-cols-3 gap-4 mx-auto mt-12 md:mt-20 md:grid-cols-3 z-10">
            {sponsors.map(({ role, href, imageSrc, alt }) => (
              <SponsorBox
                key={role}
                href={href}
                imageSrc={imageSrc}
                alt={alt}
                isSponsor={isAdmin || hasRole(role)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

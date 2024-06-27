import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { AuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import Image from "next/image";
import { image } from "@nextui-org/react";

type Props = {
  params: {
    edition: string;
  };
};

const editions: { [key: string]: string } = {
  mexico: "/landing/Recurso 14EDICIONES BLOCKCHAINCON.png",
  colombia: "/landing/Recurso 15EDICIONES BLOCKCHAINCON.png",
  peru: "/landing/Recurso 13EDICIONES BLOCKCHAINCON.png",
};

export default async function Page({ params }: Props) {
  const { edition } = params;
  const session = await getServerSession(AuthOptions);

  if (!editions[edition]) {
    notFound();
  }

  if (!session) {
    return (
      <>
        <section className="h-screen py-10 relative bg-black sm:py-16 lg:py-24 lg:pt-36">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center z-50">
            <div className="flex justify-center max-w-2xl mx-auto items-center">
              <Image src={editions[edition]} width={500} height={500} alt="" />
            </div>

            <div className=" grid items-center max-w-4xl grid-cols-2 gap-4 mx-auto mt-12 md:mt-20 md:grid-cols-2 z-10 ">
              <Link
                href={`/${edition}/speakers`}
                className="bg-gradient-to-r border border-[#474f5c] from-[#2f3542] to-gray-900 hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <svg
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                >
                  <path d="M224 0c70.7 0 128 57.3 128 128s-57.3 128-128 128S96 198.7 96 128 153.3 0 224 0zm-14.9 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2h39.5c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 39.5-161.2c77.2 12 136.3 78.8 136.3 159.4 0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-80.6 59.1-147.4 136.3-159.4l39.5 161.2 33.4-123.9z" />
                </svg>
                Speakers
              </Link>
              <Link
                href={`/${edition}/sponsors`}
                className="bg-gradient-to-r border border-[#474f5c] from-[#2f3542] to-gray-900 hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 19h2V6l6.394 2.74a1 1 0 01.606.92V19h2v2H1v-2h2V5.65a1 1 0 01.594-.914l7.703-3.424A.5.5 0 0112 1.77V19z" />
                </svg>
                Sponsors
              </Link>

              <div className="relative border border-[#474f5c] bg-gradient-to-r from-[#2f3542] to-gray-900 hover:from-[#2f3542] hover:to-[#2f3542] group h-32 flex flex-col  shadow-lg items-center justify-center gap-2">
                <svg
                  viewBox="0 0 640 512"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                >
                  <path d="M352 128c0 70.7-57.3 128-128 128S96 198.7 96 128 153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8 2.4-.1 4.7-.2 7.1-.2h61.4c89.1 0 161.3 72.2 161.3 161.3 0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9 19.7-26.6 31.3-59.5 31.3-95.1 0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                </svg>
                Asistentes
                <div className="absolute bottom-0 flex gap-2">
                  <Link
                    href={"https://wealthexpo.la/sponsors-contacto/"}
                    target="_blank"
                    className=" items-center flex px-4 mb-2 justify-center bg-red-500 text-white  h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded transform hover:-translate-y-1"
                  >
                    Solicitar ser sponsor
                  </Link>
                </div>
              </div>
              <Link
                href={`https://wealthexpo.la/peru/agenda`}
                target="_blank"
                className="bg-gradient-to-r border border-[#474f5c] from-[#2f3542] to-gray-900 hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  height="3em"
                  width="3em"
                >
                  <path d="M4 .5a.5.5 0 00-1 0V1H2a2 2 0 00-2 2v1h16V3a2 2 0 00-2-2h-1V.5a.5.5 0 00-1 0V1H4V.5zM16 14V5H0v9a2 2 0 002 2h12a2 2 0 002-2zM9.5 7h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm3 0h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zM2 10.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm3.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5z" />
                </svg>
                Agenda
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  const roles = session.user.roles;

  const isAdmin = roles.some((role: string) => role === "administrator");
  const hasRole = roles.some((r: string) => r === `sponsor_${edition}`);
  const isSponsor = isAdmin || hasRole;

  return (
    <>
      <section className="h-screen py-10 relative bg-black sm:py-16 lg:py-24 lg:pt-36">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center z-50">
          <div className="flex justify-center max-w-2xl mx-auto items-center">
            <Image src={editions[edition]} width={500} height={500} alt="" />
          </div>

          <div className=" grid items-center max-w-4xl grid-cols-2 gap-4 mx-auto mt-12 md:mt-20 md:grid-cols-2 z-10 ">
            <Link
              href={`/${edition}/speakers`}
              className="bg-gradient-to-r border border-[#474f5c] from-[#2f3542] to-gray-900 hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <svg
                viewBox="0 0 448 512"
                fill="currentColor"
                height="3em"
                width="3em"
              >
                <path d="M224 0c70.7 0 128 57.3 128 128s-57.3 128-128 128S96 198.7 96 128 153.3 0 224 0zm-14.9 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2h39.5c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 39.5-161.2c77.2 12 136.3 78.8 136.3 159.4 0 17-13.8 30.7-30.7 30.7H30.7C13.8 512 0 498.2 0 481.3c0-80.6 59.1-147.4 136.3-159.4l39.5 161.2 33.4-123.9z" />
              </svg>
              Speakers
            </Link>
            <Link
              href={`/${edition}/sponsors`}
              className="bg-gradient-to-r border border-[#474f5c] from-[#2f3542] to-gray-900 hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                height="3em"
                width="3em"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M12 19h2V6l6.394 2.74a1 1 0 01.606.92V19h2v2H1v-2h2V5.65a1 1 0 01.594-.914l7.703-3.424A.5.5 0 0112 1.77V19z" />
              </svg>
              Sponsors
            </Link>

            {isSponsor ? (
              <Link
                href={`/${edition}/asistents`}
                className="bg-gradient-to-r border border-[#474f5c] from-[#2f3542] to-gray-900 hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col  shadow-lg items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:-translate-y-1"
              >
                <svg
                  viewBox="0 0 640 512"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                >
                  <path d="M352 128c0 70.7-57.3 128-128 128S96 198.7 96 128 153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8 2.4-.1 4.7-.2 7.1-.2h61.4c89.1 0 161.3 72.2 161.3 161.3 0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9 19.7-26.6 31.3-59.5 31.3-95.1 0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                </svg>
                Asistentes
              </Link>
            ) : (
              <div className="relative bg-gradient-to-r border border-[#474f5c] from-[#2f3542] to-gray-900 hover:from-[#2f3542] hover:to-[#2f3542] group h-32 flex flex-col  shadow-lg items-center justify-center gap-2">
                <svg
                  viewBox="0 0 640 512"
                  fill="currentColor"
                  height="3em"
                  width="3em"
                >
                  <path d="M352 128c0 70.7-57.3 128-128 128S96 198.7 96 128 153.3 0 224 0s128 57.3 128 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4c98.5 0 178.3 79.8 178.3 178.3 0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM609.3 512H471.4c5.4-9.4 8.6-20.3 8.6-32v-8c0-60.7-27.1-115.2-69.8-151.8 2.4-.1 4.7-.2 7.1-.2h61.4c89.1 0 161.3 72.2 161.3 161.3 0 17-13.8 30.7-30.7 30.7zM432 256c-31 0-59-12.6-79.3-32.9 19.7-26.6 31.3-59.5 31.3-95.1 0-26.8-6.6-52.1-18.3-74.3C384.3 40.1 407.2 32 432 32c61.9 0 112 50.1 112 112s-50.1 112-112 112z" />
                </svg>
                Asistentes
                <div className="absolute bottom-0 flex gap-2">
                  <Link
                    href={"https://wealthexpo.la/sponsors-contacto/"}
                    target="_blank"
                    className=" items-center flex px-4 mb-2 justify-center bg-red-500 text-white  h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out rounded transform hover:-translate-y-1"
                  >
                    Solicitar ser sponsor
                  </Link>
                </div>
              </div>
            )}

            <Link
              href={`https://wealthexpo.la/peru/agenda`}
              className="bg-gradient-to-r border border-[#474f5c] from-[#2f3542] to-gray-900 hover:from-[#2f3542] hover:to-[#2f3542] h-32 flex flex-col shadow-lg items-center justify-center gap-2"
            >
              <svg
                fill="currentColor"
                viewBox="0 0 16 16"
                height="3em"
                width="3em"
              >
                <path d="M4 .5a.5.5 0 00-1 0V1H2a2 2 0 00-2 2v1h16V3a2 2 0 00-2-2h-1V.5a.5.5 0 00-1 0V1H4V.5zM16 14V5H0v9a2 2 0 002 2h12a2 2 0 002-2zM9.5 7h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zm3 0h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5zM2 10.5a.5.5 0 01.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1zm3.5-.5h1a.5.5 0 01.5.5v1a.5.5 0 01-.5.5h-1a.5.5 0 01-.5-.5v-1a.5.5 0 01.5-.5z" />
              </svg>
              Agenda
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

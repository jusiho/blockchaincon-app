"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function FormLogin() {
  const searchParams = useSearchParams();
  const pathr = searchParams?.get("p");
  const confirmed = searchParams?.get("confirmed");

  const router = useRouter();

  // const { data: session } = useSession()
  const [loading, setLoading] = useState(false);
  const [autoState, setAuthState] = useState({ username: "", pass: "" });
  const [pageSate, setPageSate] = useState({
    error: "",
    processing: false,
  });

  useEffect(() => {
    if (confirmed === "yes") {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        background: "#32d9cb",
        iconColor: "#fff",
        color: "#000",
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      Toast.fire({
        icon: "success",
        title: "¡Cuenta creada exitosamente!",
      });
    }
  }, []);

  // SUMMIT
  const simplifyError = (error: any) => {
    const errorMap: any = {
      CredentialsSignin: "Contraseña o usuario no válido",
      "Your account email is not confirmed":
        "El correo de tu cuenta no está confirmado",
    };

    return errorMap[error] ?? "Usuario o Cotraseña incorrectas";
  };

  const handleFieldChange = (e: any) => {
    setAuthState((old) => ({ ...old, [e.target.id]: e.target.value }));
  };

  const handleSummit = async (e: any) => {
    e.preventDefault();
    setPageSate({
      error: "",
      processing: false,
    });
    setLoading(true);
    await signIn("credentials", {
      ...autoState,
      redirect: false,
    })
      .then((response: any) => {
        console.log("response : ", response);

        if (response.ok) {
          console.log("response : ", response);

          setPageSate((old) => ({ ...old, error: "" }));
          if (pathr) {
            router.push(pathr);
          } else {
            router.push("/admin");
          }
        } else {
          setPageSate((old) => ({ ...old, error: response.error }));
        }
      })
      .catch((error) => {});
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSummit}
      className="bg-onelms flex z-10 w-full lg:w-1/2 justify-center items-center space-y-8"
    >
      <div className="w-full px-8 md:px-32 lg:px-24">
        <div className=" rounded-md shadow-2xl p-5 backdrop-blur-xl border-r border-b dark:bg-black dark:border-borderlms border-gray-300 bg-white bg-opacity-25">
          {pageSate.error && (
            <div
              className={`w-full ${
                pageSate.error === "Your account email is not confirmed"
                  ? "h-15"
                  : "h-10"
              } bg-red-700 text-white rounded mb-4 text-center flex items-center justify-center`}
            >
              <div className="text-white">
                <p className="text-white">{simplifyError(pageSate.error)}</p>
                {pageSate.error === "Your account email is not confirmed" && (
                  <p>
                    {" "}
                    Si no has recibido el email de confirmación,{" "}
                    <Link href={"/reenviar-mail"} className="font-bold">
                      puedes reenviarlo.
                    </Link>
                  </p>
                )}
              </div>
            </div>
          )}
          <h1 className="text-black dark:text-white font-bold text-2xl mb-1">
            Hola!
          </h1>
          <p className="text-sm font-normal dark:text-gray-200 text-gray-700 mb-8">
            Bienvenido de nuevo
          </p>
          <div className="flex items-center border border-borderlms mb-8 py-2 px-3 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
            <input
              onChange={handleFieldChange}
              value={autoState.username}
              id="username"
              className="bg-white dark:bg-black pl-2 w-full outline-none border-none"
              type="text"
              name="username"
              placeholder="Email Address"
            />
          </div>
          <div className="flex items-center border border-borderlms mb-12 py-2 px-3 rounded ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
            <input
              onChange={handleFieldChange}
              value={autoState.pass}
              id="pass"
              className="bg-white dark:bg-black pl-2 w-full outline-none border-none"
              type="password"
              name="password"
              placeholder="Password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 flex items-center justify-center disabled:opacity-50 w-full dark:bg-lightlms dark:text-black bg-otherlms text-white mt-5 py-2 rounded font-semibold mb-2 hover:-translate-y-1 transition-all duration-500 "
          >
            {loading ? (
              <>
                <span className="pl-3">Cargando...</span>
              </>
            ) : (
              <span>Ingresar</span>
            )}
          </button>
          <div className="dark:text-white flex justify-between mt-4">
            <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
              ¿Olvidaste tu contraseña ?
            </span>
            <Link
              href="/registrarse"
              className="text-sm ml-2 hover:text-lightlms cursor-pointer hover:-translate-y-1 duration-500 transition-all"
            >
              ¿Aun no tienes cuenta?
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

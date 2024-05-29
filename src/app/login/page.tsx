import FormLogin from "./FormLogin";
import { Suspense } from "react";

function SearchBarFallback() {
  return <>placeholder</>;
}

export const metadata = {
  title: "Flyteek - Login",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function Page() {
  return (
    <Suspense fallback={<SearchBarFallback />}>
      <div className="h-screen overflow-hidden flex items-center justify-center">
        <FormLogin />
      </div>
    </Suspense>
  );
}

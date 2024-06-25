import { Suspense } from "react";

function SearchBarFallback() {
  return <>placeholder</>;
}
type Props = {
  params: {
    id: string;
  };
};
export default async function Page({ params }: Props) {
  const { id } = params;

  return <>edition</>;
}

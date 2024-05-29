import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  const session = await getServerSession(AuthOptions);
  const token = session?.user.token;
  // obetener dato POST
  const body = await request.json();
  const { id_register, state } = body;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id_register: `${id_register}`,
      state: `${state}`,
    }),
  };

  try {
    const res = await fetch(
      `${process.env.API_URL}/wp-json/myplugin/v1/events/update`,
      requestOptions
    );

    if (!res.ok) {
      throw new Error(`Error fetching order count: ${res.statusText}`);
    }

    const response = await res.json();

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      }
    );
  }
}

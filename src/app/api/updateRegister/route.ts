import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  // obetener dato POST
  const body = await request.json();
  const { id_register, state } = body;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  };

  try {
    const res = await fetch(
      `https://wealthexpo.la/wp-json/jwt-auth/v1/token`,
      requestOptions
    );

    if (!res.ok) {
      throw new Error(`Error fetching order count: ${res.statusText}`);
    }

    const response = await res.json();

    return NextResponse.json(response.token, { status: 200 });
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

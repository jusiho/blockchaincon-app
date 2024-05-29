import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function GET(request: Request) {
  const session = await getServerSession(AuthOptions);
  const token = session?.user.token;
  console.log(token);
  

  // obetener dato de la url
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const perPage = url.searchParams.get("perPage");
  const search = url.searchParams.get("search");
  const endpoint = url.searchParams.get("endpoint");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  console.log(`${process.env.API_URL}/wp-json/myplugin/v1/${endpoint}?per_page=${perPage}&page=${page}&search=${search}`);
  
  try {
    const res = await fetch(
      `${process.env.API_URL}/wp-json/myplugin/v1/${endpoint}?per_page=${perPage}&page=${page}&search=${search}`,
      requestOptions
    );
    console.log(res);
    
    if (!res.ok) {
      throw new Error(`Error fetching order count: ${res.statusText}`);
    }

    const response = await res.json();
    console.log(response);
    

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

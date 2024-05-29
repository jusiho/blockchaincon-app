import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const allowedOrigins = [
  "http://127.0.0.1:3000",
  "http://localhost:300",
  "https://app.blockchaincon.la"
];

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const session = await getToken({ req, secret });
  console.log("middleware");
  console.log(session);

  const url = req.nextUrl.clone();
  const requestPage = req.nextUrl.pathname;
  // console.log(requestPage);
  const origin = req.headers.get("origin");

  if (origin && allowedOrigins.includes(origin)) {
    // console.log("Error middleware");

    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // information from user
  if (!session) {
    // Pagina que esta solicitando la persona
    if (requestPage === "/login") {
      const response = NextResponse.next();
      return response;
    }
    url.pathname = "/login";
    url.search = `p=${requestPage}`;
    return NextResponse.redirect(url);
  } else {
    if (requestPage === "/login") {
      url.pathname = "/cursos";
      return NextResponse.redirect(url);
    }
  }

  //    if(req.nextUrl.pathname.startsWith('/')){
  //     const response = NextResponse.next();

  //     // response.cookies.set('isAuthe','true')

  //     return response
  //    }
  // return NextResponse.redirect(new URL(''))

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: [
    "/admin",
    "/login",
  ],
};

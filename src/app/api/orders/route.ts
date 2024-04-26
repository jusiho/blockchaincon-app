import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { page, perPage } = await request.json();
  console.log(page, perPage);
  

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${process.env.WORDPRESS_KEY}`,
    },
  };

  let allOrders = [];
  // let page = 1;
  // let perPage = 15;

  try {
    const res = await fetch(
      `https://wealthexpo.la/wp-json/wc/v3/orders?per_page=${perPage}&page=${page}`,
      requestOptions
    );

    if (!res.ok) {
      throw new Error(`Error fetching order count: ${res.statusText}`);
    }

    const totalPages = parseInt(res.headers.get("X-WP-TotalPages") || "0", 10);
    const totalOrders = parseInt(res.headers.get("X-WP-Total") || "0", 10);
    // Lee los encabezados para determinar el total de páginas

    console.log(`Total Orders: ${totalOrders}, Total Pages: ${totalPages}`);

    const response = await res.json();
    console.log(response);

    const responseOrders = {
      results: response,
      totalPages,
      totalOrders,
    };

    return NextResponse.json(responseOrders, { status: 200 });
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

import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(req: Request) {
  const { from, emailFrom, emailTo, replyTo, subject, text, html } =
    await req.json();
  console.log("emailFrom", emailFrom);
  console.log("emailTo", emailTo);
  console.log("subject", subject);
  console.log("text", text);

  const dataEmail = {
    name: process.env.EMAIL_NAME, // <= Add this
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT || 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  };
  console.log("dataEmail", dataEmail);

  try {
    const transporter = nodemailer.createTransport({
      name: process.env.EMAIL_NAME, // <= Add this
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 465,
      secure: process.env.EMAIL_SECURE, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      },
    });

    await transporter.verify((error: any, success: any) => {
      console.log("Email server is ready ", success);
      console.log("Email server is ready ", error);
      if (error) {
        return { error: error };
      }
    });
    console.log("Email server is ready");

    const info = await transporter.sendMail({
      from: from, // sender address
      to: emailTo, // list of receivers
      replyTo: replyTo,
      subject: subject, // Subject line
      // text: "Hello a ver?", // plain text body
      ...(text ? { text } : {}), // Add text if available
      ...(html ? { html } : {}), // Add html if available
    });
    console.log("Message sent: %s", info);

    return NextResponse.json({ info });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

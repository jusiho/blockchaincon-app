export interface PropsHtml {
  emailData: {
    id_register: string;
    id_unique: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    company: string;
    country: string;
    know_exp: string;
    level_exp: string;
    category: string;
    edition: string;
    type_ticket: string;
  };
}

export async function invoiceTemplate({ emailData }: PropsHtml) {

  const url_base = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${emailData.id_unique}`;

  //generar numero para la factura que es emailData.id con muchos ceros

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
  >
    <head>
      <!--[if gte mso 9]>
        <xml>
          <o:OfficeDocumentSettings>
            <o:AllowPNG />
            <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
        </xml>
      <![endif]-->
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="x-apple-disable-message-reformatting" />
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <!--<![endif]-->
      <title></title>
  
      <style type="text/css">
        @media only screen and (min-width: 620px) {
          .u-row {
            width: 600px !important;
          }
          .u-row .u-col {
            vertical-align: top;
          }
  
          .u-row .u-col-100 {
            width: 600px !important;
          }
        }
  
        @media (max-width: 620px) {
          .u-row-container {
            max-width: 100% !important;
            padding-left: 0px !important;
            padding-right: 0px !important;
          }
          .u-row .u-col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
          .u-row {
            width: 100% !important;
          }
          .u-col {
            width: 100% !important;
          }
          .u-col > div {
            margin: 0 auto;
          }
        }
        body {
          margin: 0;
          padding: 0;
        }
  
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
  
        p {
          margin: 0;
        }
  
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
  
        * {
          line-height: inherit;
        }
  
        a[x-apple-data-detectors="true"] {
          color: inherit !important;
          text-decoration: none !important;
        }
  
        table,
        td {
          color: #000000;
        }
        #u_body a {
          color: #00c3d8;
          text-decoration: underline;
        }
  
        .email-table {
          width: 100%;
          background-color: #f9f9f9;
          border-collapse: collapse;
          font-family: Arial, sans-serif;
        }
        .email-table th {
          background-color: #4caf50;
          color: white;
        }
        .email-table td,
        .email-table th {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .email-table tr:nth-child(even) {
          background-color: #f2f2f2;
        }
        .email-table img {
          display: block;
          margin: auto;
        }
  
        @media (max-width: 480px) {
          #u_content_heading_1 .v-container-padding-padding {
            padding: 40px 10px 5px !important;
          }
          #u_content_heading_1 .v-font-size {
            font-size: 26px !important;
          }
          #u_content_text_1 .v-container-padding-padding {
            padding: 0px 10px 10px !important;
          }
          #u_content_button_1 .v-container-padding-padding {
            padding: 10px 10px 40px !important;
          }
          #u_content_button_1 .v-size-width {
            width: 65% !important;
          }
          #u_content_social_3 .v-container-padding-padding {
            padding: 30px 10px 10px !important;
          }
        }
      </style>
    </head>
  
    <body
      class="clean-body u_body"
      style="
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        background-color: #e7e7e7;
        color: #000000;
      "
    >
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table
        id="u_body"
        style="
          border-collapse: collapse;
          table-layout: fixed;
          border-spacing: 0;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          vertical-align: top;
          min-width: 320px;
          margin: 0 auto;
          background-color: #e7e7e7;
          width: 100%;
        "
        cellpadding="0"
        cellspacing="0"
      >
        <tbody>
          <tr style="vertical-align: top">
            <td
              style="
                word-break: break-word;
                border-collapse: collapse !important;
                vertical-align: top;
              "
            >
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
  
              <div
                class="u-row-container"
                style="padding: 0px; background-color: transparent"
              >
                <div
                  class="u-row"
                  style="
                    margin: 0 auto;
                    min-width: 320px;
                    max-width: 600px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    background-color: #000000;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      height: 100%;
                      background-color: transparent;
                    "
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->
  
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 2px solid #CCC;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div
                      class="u-col u-col-100"
                      style="
                        max-width: 320px;
                        min-width: 600px;
                        display: table-cell;
                        vertical-align: top;
                      "
                    >
                      <div
                        style="
                          height: 100%;
                          width: 100% !important;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      >
                        <!--[if (!mso)&(!IE)]><!--><div
                          style="
                            box-sizing: border-box;
                            height: 100%;
                            padding: 0px;
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-right: 0px solid transparent;
                            border-bottom: 1px solid #e5e5e5;
                            border-radius: 0px;
                            -webkit-border-radius: 0px;
                            -moz-border-radius: 0px;
                          "
                        ><!--<![endif]-->
                          <table
                            style="font-family: arial, helvetica, sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="v-container-padding-padding"
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    
                                    font-family: arial, helvetica, sans-serif;
                                  "
                                  align="left"
                                >
                                  <table
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                  >
                                    <tr>
                                      <td
                                        style="
                                          padding-right: 0px;
                                          padding-left: 0px;
                                        "
                                        align="center"
                                      >
                                        <img
                                          align="center"
                                          border="0"
                                          src="https://wealthexpo.la/wp-content/uploads/2024/05/MAILING-WEALTH.png"
                                          alt=""
                                          title=""
                                          style="
                                            outline: none;
                                            text-decoration: none;
                                            -ms-interpolation-mode: bicubic;
                                            clear: both;
                                            display: inline-block !important;
                                            border: none;
                                            height: auto;
                                            float: none;
                                            width: 100%;
                                          "
                                          width="139.2"
                                        />
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
  
              <div
                class="u-row-container"
                style="padding: 0px; background-color: transparent"
              >
                <div
                  class="u-row"
                  style="
                    margin: 0 auto;
                    min-width: 320px;
                    max-width: 600px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    background-color: transparent;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      height: 100%;
                      background-color: transparent;
                    "
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->
  
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div
                      class="u-col u-col-100"
                      style="
                        max-width: 320px;
                        min-width: 600px;
                        display: table-cell;
                        vertical-align: top;
                      "
                    >
                      <div
                        style="
                          background-color: #fff;
                          height: 100%;
                          width: 100% !important;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      >
                        <!--[if (!mso)&(!IE)]><!--><div
                          style="
                            box-sizing: border-box;
                            height: 100%;
                            padding: 0px;
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-right: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                            border-radius: 0px;
                            -webkit-border-radius: 0px;
                            -moz-border-radius: 0px;
                          "
                        ><!--<![endif]-->
                          <table
                            id="u_content_button_1"
                            style="font-family: arial, helvetica, sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  class="v-container-padding-padding"
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 15px 15px 5px;
                                    font-family: arial, helvetica, sans-serif;
                                  "
                                  align="left"
                                >
                                  <!--[if mso
                                    ]><style>
                                      .v-button {
                                        background: transparent !important;
                                      }
                                    </style><!
                                  [endif]-->
                                  <div align="center">
                                    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="https://unlayer.com" style="height:37px; v-text-anchor:middle; width:174px;" arcsize="11%"  stroke="f" fillcolor="#01ba90"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
                                    <table class="email-table">
                                      <tbody>
                                        <tr>
                                          <td>Nombres</td>
                                          <td>${emailData.name} </td>
                                        </tr>
                                        <tr>
                                          <td>Apellidos</td>
                                          <td>${emailData.lastname}</td>
                                        </tr>
                                        <tr>
                                          <td>Email</td>
                                          <td>${emailData.email}</td>
                                        </tr>
                                        <tr>
                                          <td>Numero</td>
                                          <td>${emailData.phone}</td>
                                        </tr>
                                        <tr>
                                          <td>Empresa</td>
                                          <td>${emailData.company}</td>
                                        </tr>
                                        <tr>
                                          <td>Pais</td>
                                          <td>${emailData.country}</td>
                                        </tr>
                                        <tr>
                                          <td>Experiencia</td>
                                          <td>${emailData.know_exp}</td>
                                        </tr>
                                        <tr>
                                          <td>Experiencia</td>
                                          <td>${emailData.level_exp}</td>
                                        </tr>
                                        <tr>
                                          <td>Categoria</td>
                                          <td>${emailData.category}</td>
                                        </tr>
                                        <tr>
                                          <td>Edicion</td>
                                          <td>${emailData.edition}</td>
                                        </tr>
                                        <tr>
                                          <td>Tipo de entrada</td>
                                          <td>${emailData.type_ticket}</td>
                                        </tr>
                                        <tr>
                                          <td>Token entrada</td>
                                          <td>${emailData.id_unique}</td>
                                        </tr>
                                        <tr>
                                          <td>Estado</td>
                                          <td>Pagado</td>
                                        </tr>
                                        
                                        <tr>
                                          <td>QR</td>
                                          <td>
                                            <img
                                              src="${url_base}"
                                              alt="Código QR"
                                            />
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <h2 align="left">Detalles del evento:</h2>
                                    <table class="email-table">
                                      <tbody>
                                        
                                        <tr>
                                          <td>Lugar</td>
                                          <td>Centro de Convenciones de Lima</td>
                                        </tr>
                                        <tr>
                                          <td>Direccion</td>
                                          <td>Av. de la Arqueología 206, San Borja 15021</td>
                                        </tr>
                                        <tr>
                                          <td>Horario</td>
                                          <td>9:00 am a 6:00 pm </td>
                                        </tr>
                                        <tr>
                                          <td>Fecha</td>
                                          <td>06 de julio 2024</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    <!--[if mso]></center></v:roundrect><![endif]-->
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
  
              <div
                class="u-row-container"
                style="padding: 0px; background-color: transparent"
              >
                <div
                  class="u-row"
                  style="
                    margin: 0 auto;
                    min-width: 320px;
                    max-width: 600px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    background-color: #000a59;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      height: 100%;
                      background-color: transparent;
                    "
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #000a59;"><![endif]-->
  
                    <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #000a59;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                    <div
                      class="u-col u-col-100"
                      style="
                        max-width: 320px;
                        min-width: 600px;
                        display: table-cell;
                        vertical-align: top;
                      "
                    >
                      <div
                        style="
                          background-color: #000000;
                          height: 100%;
                          width: 100% !important;
                          border-radius: 0px;
                          -webkit-border-radius: 0px;
                          -moz-border-radius: 0px;
                        "
                      >
                        <!--[if (!mso)&(!IE)]><!--><div
                          style="
                            box-sizing: border-box;
                            height: 100%;
                            padding: 0px;
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-right: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                            border-radius: 0px;
                            -webkit-border-radius: 0px;
                            -moz-border-radius: 0px;
                          "
                        ><!--<![endif]-->
                          <table
                            id="u_content_social_3"
                            style="font-family: arial, helvetica, sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td
                                  
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    font-family: arial, helvetica, sans-serif;
                                  "
                                  align="left"
                                >
                                  <img
                                    src="https://wealthexpo.la/wp-content/uploads/2024/05/FINAL-MAILING-WEALTH.png"
                                    alt=""
                                    style="
                                      border: 0;
                                      display: block;
                                      outline: none;
                                      text-decoration: none;
                                      width: 100%;
                                      -ms-interpolation-mode: bicubic;
                                    "
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <table
                            style="font-family: arial, helvetica, sans-serif"
                            role="presentation"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            border="0"
                          >
                            <tbody>
                              <tr>
                                <td                                
                                  style="
                                    overflow-wrap: break-word;
                                    word-break: break-word;
                                    padding: 10px 10px 30px;
                                    font-family: arial, helvetica, sans-serif;
                                  "
                                  align="left"
                                >
                                  <div
                                    class="v-font-size"
                                    style="
                                      font-size: 14px;
                                      color: #ffffff;
                                      line-height: 140%;
                                      text-align: center;
                                      word-wrap: break-word;
                                    "
                                  >
                                    <p
                                      style="
                                        font-size: 14px;
                                        line-height: 140%;
                                        text-decoration: none;
                                        color: #ffffff;
                                      "
                                    >
                                      entradas@wealthexpo.la
                                    </p>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
  
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td><![endif]-->
                    <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
  
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
  </html>
`;
}

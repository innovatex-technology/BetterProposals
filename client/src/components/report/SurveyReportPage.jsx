import React, { useRef } from "react";
import { jsPDF } from "jspdf";
import companyLogo from "./../../assets/logo_stone.jpeg";
import companyLogo2 from "./../../assets/aluk.png";

const SurveyReportPage = ({ location }) => {
  const quotation = location?.state?.quotation || {
    totals: {
      totalArea: 2,
      totalUnits: 7,
      grandTotal: 28,
    },
    _id: "67911339c204e0f0a0c5ac5d",
    companyLogo: companyLogo, // Dummy logo URL
    companyName: "Galaxy enclave pvt. ltd.",
    cin: "U12345RJ2023PTC123456",
    companyAddress:
      "Sp-5 mansarover industrial area rico, jaipur-302020,rajasthan",
    quotationNo: "QT-00123",
    date: "2025-01-22T00:00:00.000Z",
    clientName: "John Doe",
    clientAddress: "456 Business Lane, Jaipur",
    quotationTitle: "quotation",
    items: [
      {
        area: 2,
        color: "Blue",
        glazing: "Single",
        id: "1737558248214",
        imageHeight: 2,
        imageWidth: 6,
        name: "Window Panel",
        quantity: 7,
        size: "Large",
        total: 28,
        type: "Option2",
        unitPrice: 4,
        _id: "67911339c204e0f0a0c5ac5e",
      },
    ],
    discount: 5,
    __v: 0,
  };

  const reportRef = useRef();

  // Handle Print
  const handlePrint = () => {
    window.print();
  };

  // Handle Download PDF
  const handleDownload = () => {
    const element = reportRef.current;
    const pdf = new jsPDF();

    pdf.html(element, {
      callback: function (pdf) {
        pdf.save("quotation-report.pdf");
      },
      x: 10, // Optional: Set margin for the PDF
      y: 10, // Optional: Set margin for the PDF
    });
  };

  // Handle Preview (opens a new window with a preview of the page)
  const handlePreview = () => {
    const previewWindow = window.open("", "_blank");
    previewWindow.document.write(`
      <html>
        <head>
          <title>Quotation Preview</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
          </style>
        </head>
        <body>${reportRef.current.innerHTML}</body>
      </html>
    `);
    previewWindow.document.close();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* <h1 className="text-2xl font-bold mb-6">Quotation Details</h1> */}
      <div className="bg-white shadow-md rounded p-6 mx-12" ref={reportRef}>
        {/* Company Information */}
        <div className="mb-6">
          <div className="flex items-center w-full gap-6">
            {/* Company Logo */}
            <div className="w-1/4">
              <img
                src={quotation.companyLogo || "https://via.placeholder.com/150"} // Use dummy logo if no logo is provided
                alt="Company Logo"
                className="w-full h-auto"
              />
            </div>

            {/* Company Info */}
            <div className="w-1/2">
              <p>
                <strong className="uppercase underline font-bold">
                  {quotation.companyName}
                </strong>
              </p>
              <p>
                <strong>CIN:</strong>{" "}
                <strong className="uppercase">{quotation.cin}</strong>
              </p>
              <p>
                <strong>ADD:</strong>{" "}
                <strong className="uppercase">
                  {quotation.companyAddress}
                </strong>
              </p>
            </div>

            {/* Duplicate Logo Section (if needed) */}
            <div className="w-1/4">
              <img
                src={companyLogo2} // Use dummy logo if no logo is provided
                alt="Company Logo"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Quotation Details */}
        <div className="mb-6">
          <div className="text-center mb-4">
            <p>
              <strong className="uppercase underline font-bold">
                {quotation.quotationTitle}
              </strong>
            </p>
          </div>
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="text-left">
              <strong>Date:</strong> {new Date(quotation.date).toLocaleDateString()}
            </p>
            <p className="text-right">
              <strong>Quotation No:</strong> {quotation.quotationNo}
            </p>
          </div> */}
        </div>

        {/* Client Information */}
        {/* <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">To</h2>
          <div>
            <p>
            <strong className="uppercase font-bold">{quotation.clientName}</strong>
            </p>
            <p>
               {quotation.clientAddress}
            </p>
          </div>
        </div> */}

        {/* Items Table */}
        <div className="mb-6">
          {/* <h2 className="text-lg font-semibold mb-2">Items</h2> */}
          <table className="w-full border-collapse border-none   bg-white ">
            <thead>
              <tr className="bg-white ">
                <th className="border-t  border-l px-4 py-2">Position</th>
                <th className="border-t px-4 py-2">Quantity[Pcs]</th>
                <th className="border-t px-4 py-2">Discription</th>
                <th className="border-t px-4 py-2">Area(Sqft)</th>
                <th className="border-t border-r px-4 py-2">Total[INR]</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center border-t">
                <td className="border-b border-l px-4 py-2">
                  FF KINGS ROOM ...
                </td>
                <td className="border-b px-4 py-2">27</td>
                <td className="border-b px-4 py-2">Lorem, ipsum.</td>
                <td className="border-b px-4 py-2">38.987</td>
                <td className="border-b border-r px-4 py-2">0.00</td>
              </tr>
              <tr className="border-l  border-r">
                <td colSpan="5" className="px-5 ">
                  Interior View
                </td>
              </tr>
              <tr>
                <td
                  colSpan="5"
                  className="border-b col-span-5 border-l border-r px-4 py-2"
                >
                  <div className="flex items-star gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1625 2475" /* Adjusted viewBox for extra space */
                      className="border border-gray-300"
                      style={{
                        height: "300px", // Display height
                        width: "192px", // Display width
                        padding: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* Window Frame */}
                      <rect
                        x="0"
                        y="0"
                        width="1525"
                        height="2375"
                        fill="lightgray"
                        stroke="black"
                        strokeWidth="10"
                      />
                      {/* Glass Pane */}
                      <rect
                        x="75"
                        y="75"
                        width="1375"
                        height="2225"
                        fill="skyblue"
                        stroke="black"
                        strokeWidth="5"
                      />
                      {/* Cross Section */}
                      <line
                        x1="762.5"
                        y1="75"
                        x2="762.5"
                        y2="2300"
                        stroke="black"
                        strokeWidth="10"
                      />
                      <line
                        x1="75"
                        y1="1187.5"
                        x2="1450"
                        y2="1187.5"
                        stroke="black"
                        strokeWidth="10"
                      />

                      {/* Width Indicator (Bottom Line and Label) */}
                      <line
                        x1="0"
                        y1="2400"
                        x2="1525"
                        y2="2400"
                        stroke="black"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <line
                        x1="0"
                        y1="2375"
                        x2="0"
                        y2="2425"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <line
                        x1="1525"
                        y1="2375"
                        x2="1525"
                        y2="2425"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <text
                        x="750"
                        y="2465"
                        fontSize="80"
                        textAnchor="middle"
                        fill="black"
                      >
                        1525 mm
                      </text>

                      {/* Height Indicator (Right Line and Label) */}
                      <line
                        x1="1575"
                        y1="0"
                        x2="1575"
                        y2="2375"
                        stroke="black"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <line
                        x1="1525"
                        y1="0"
                        x2="1575"
                        y2="0"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <line
                        x1="1525"
                        y1="2375"
                        x2="1575"
                        y2="2375"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <text
                        x="1400"
                        y="1200.5"
                        fontSize="80"
                        textAnchor="start"
                        fill="black"
                        transform="rotate(-90, 1590, 1187.5)"
                      >
                        2375 mm
                      </text>
                    </svg>
                    <div className="flex-1 ">
                      <p>
                        <span className="font-bold text-gray-700">
                          Window Elements 1525 mm x 2375 mm.
                        </span>{" "}
                        Consisting of a Fixed Field.
                      </p>
                      <p>System: Aluk 40N </p>
                      <p>Colours: Profiles: TEX 2500 MT GREY </p>
                      <p>Glazing: 1 x 24mm 24MM DGU (6+12AG+6) </p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="border-l border-b  border-r">
                <td colSpan="5" className="text-lg font-semibold px-5 ">
                  Grand Total
                </td>
              </tr>
              <tr className="border-l border-b  border-r">
                <td className="text-lg font-semibold px-5 ">Total Sqft:</td>
                <td className="text-lg font-semibold px-5 ">13705.050 Sqft</td>
                <td className="text-lg font-semibold px-5 border-l ">
                  Total Unit:
                </td>
                <td className="text-lg font-semibold px-5 ">211.00</td>
                <td className="text-lg font-semibold px-5  border-l">
                  Price Unit: 211.00
                </td>
              </tr>
            </tbody>
          </table>
          <table className="w-full border-collapse border-none   bg-white ">
            <thead>
              <tr className="bg-white ">
                <th className="border-t  border-l px-4 py-2">Position</th>
                <th className="border-t px-4 py-2">Quantity[Pcs]</th>
                <th className="border-t px-4 py-2">Discription</th>
                <th className="border-t px-4 py-2">Area(Sqft)</th>
                <th className="border-t border-r px-4 py-2">Total[INR]</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center border-t">
                <td className="border-b border-l px-4 py-2">
                  FF KINGS ROOM ...
                </td>
                <td className="border-b px-4 py-2">27</td>
                <td className="border-b px-4 py-2">Lorem, ipsum.</td>
                <td className="border-b px-4 py-2">38.987</td>
                <td className="border-b border-r px-4 py-2">0.00</td>
              </tr>
              <tr className="border-l  border-r">
                <td colSpan="5" className="px-5 ">
                  Interior View
                </td>
              </tr>
              <tr>
                <td
                  colSpan="5"
                  className="border-b col-span-5 border-l border-r px-4 py-2"
                >
                  <div className="flex items-star gap-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 1625 2475" /* Adjusted viewBox for extra space */
                      className="border border-gray-300"
                      style={{
                        height: "300px", // Display height
                        width: "192px", // Display width
                        padding: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* Window Frame */}
                      <rect
                        x="0"
                        y="0"
                        width="1525"
                        height="2375"
                        fill="lightgray"
                        stroke="black"
                        strokeWidth="10"
                      />
                      {/* Glass Pane */}
                      <rect
                        x="75"
                        y="75"
                        width="1375"
                        height="2225"
                        fill="skyblue"
                        stroke="black"
                        strokeWidth="5"
                      />
                      {/* Cross Section */}
                      <line
                        x1="762.5"
                        y1="75"
                        x2="762.5"
                        y2="2300"
                        stroke="black"
                        strokeWidth="10"
                      />
                      <line
                        x1="75"
                        y1="1187.5"
                        x2="1450"
                        y2="1187.5"
                        stroke="black"
                        strokeWidth="10"
                      />

                      {/* Width Indicator (Bottom Line and Label) */}
                      <line
                        x1="0"
                        y1="2400"
                        x2="1525"
                        y2="2400"
                        stroke="black"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <line
                        x1="0"
                        y1="2375"
                        x2="0"
                        y2="2425"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <line
                        x1="1525"
                        y1="2375"
                        x2="1525"
                        y2="2425"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <text
                        x="750"
                        y="2465"
                        fontSize="80"
                        textAnchor="middle"
                        fill="black"
                      >
                        1525 mm
                      </text>

                      {/* Height Indicator (Right Line and Label) */}
                      <line
                        x1="1575"
                        y1="0"
                        x2="1575"
                        y2="2375"
                        stroke="black"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                      />
                      <line
                        x1="1525"
                        y1="0"
                        x2="1575"
                        y2="0"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <line
                        x1="1525"
                        y1="2375"
                        x2="1575"
                        y2="2375"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <text
                        x="1400"
                        y="1200.5"
                        fontSize="80"
                        textAnchor="start"
                        fill="black"
                        transform="rotate(-90, 1590, 1187.5)"
                      >
                        2375 mm
                      </text>
                    </svg>
                    <div className="flex-1 ">
                      <p>
                        <span className="font-bold text-gray-700">
                          Window Elements 1525 mm x 2375 mm.
                        </span>{" "}
                        Consisting of a Fixed Field.
                      </p>
                      <p>System: Aluk 40N </p>
                      <p>Colours: Profiles: TEX 2500 MT GREY </p>
                      <p>Glazing: 1 x 24mm 24MM DGU (6+12AG+6) </p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="border-l border-b  border-r">
                <td colSpan="5" className="text-lg font-semibold px-5 ">
                  Grand Total
                </td>
              </tr>
              <tr className="border-l border-b  border-r">
                <td className="text-lg font-semibold px-5 ">Total Sqft:</td>
                <td className="text-lg font-semibold px-5 ">13705.050 Sqft</td>
                <td className="text-lg font-semibold px-5 border-l ">
                  Total Unit:
                </td>
                <td className="text-lg font-semibold px-5 ">211.00</td>
                <td className="text-lg font-semibold px-5  border-l">
                  Price Unit: 211.00
                </td>
              </tr>
            </tbody>
          </table>
          <div className="px-4 py-5 border-r border-l border-b">
            <h3 className="font-bold">TERMS AND CONDITIONS</h3>
            <ol className="list-decimal pl-5">
              <li className="text-sm">
                ORDERS
                <ol className="list-lower-alpha pl-5">
                  <li className="text-sm">
                    a. All orders must be placed via mail, post, or electronic
                    means and are subject to acceptance by GALAXY ENCLAVE PVT.
                    LTD., either in full or in part.
                  </li>
                  <li className="text-sm">
                   b. Glass specifications are tailored to the customer's
                    requirements, and GALAXY ENCLAVE PVT. LTD. does not provide
                    any warranty or guarantee for the same.
                  </li>
                </ol>
              </li>
              <li className="text-sm">
                OFFER VALIDITY
                <ol className="list-lower-alpha pl-5">
                  <li className="text-sm">
                  a. This quotation is valid for 15 days from the date of
                    issuance.
                  </li>
                  <li className="text-sm">
                   b. The offer validity is subject to changes in Nalco rates or
                    exchange rates, whichever occurs earlier.
                  </li>
                </ol>
              </li>
            </ol>
          </div>
        </div>

        {/* Totals
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Grand Total</h2>
            <p>{quotation.discount} INR</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <p className="text-left">
              <strong>Total Sqft:</strong> {quotation.totals.totalArea} Sqft
            </p>
            <p className="text-center">
              <strong>Total Units:</strong> {quotation.totals.totalUnits} Sqft
            </p>
            <p className="text-right">
              <strong>Price Per Sqft:</strong> ${quotation.totals.grandTotal}{" "}
              INR
            </p>
          </div>
        </div> */}

        {/* Terms and Conditions */}
        <div className="mt-8">
          <div></div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handlePreview}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            Preview
          </button>
          <button
            onClick={handlePrint}
            className="bg-green-500 text-white px-6 py-2 rounded"
          >
            Print
          </button>
          <button
            onClick={handleDownload}
            className="bg-gray-500 text-white px-6 py-2 rounded"
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyReportPage;

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
    companyAddress: "Sp-5 mansarover industrial area rico, jaipur-302020,rajasthan",
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
      x: 10,  // Optional: Set margin for the PDF
      y: 10,  // Optional: Set margin for the PDF
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
      <h1 className="text-2xl font-bold mb-6">Quotation Details</h1>
      <div className="bg-white shadow-md rounded p-6" ref={reportRef}>

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
      <strong className="uppercase underline font-bold">{quotation.companyName}</strong>
      </p>
      <p>
        <strong>CIN:</strong> <strong className="uppercase">{quotation.cin}</strong> 
      </p>
      <p>
        <strong>ADD:</strong> <strong className="uppercase">{quotation.companyAddress}</strong> 
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
              <strong className="uppercase underline font-bold">{quotation.quotationTitle}</strong>

            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="text-left">
              <strong>Date:</strong> {new Date(quotation.date).toLocaleDateString()}
            </p>
            <p className="text-right">
              <strong>Quotation No:</strong> {quotation.quotationNo}
            </p>
          </div>
        </div>


        {/* Client Information */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">To</h2>
          <div>
            <p>
            <strong className="uppercase font-bold">{quotation.clientName}</strong>
            </p>
            <p>
               {quotation.clientAddress}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Items</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Size</th>
                <th className="border px-4 py-2">Color</th>
                <th className="border px-4 py-2">Glazing</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Unit Price</th>
                <th className="border px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {quotation.items.map((item) => (
                <tr key={item.id}>
                  <td className="border px-4 py-2">{item.name}</td>
                  <td className="border px-4 py-2">{item.type}</td>
                  <td className="border px-4 py-2">{item.size}</td>
                  <td className="border px-4 py-2">{item.color}</td>
                  <td className="border px-4 py-2">{item.glazing}</td>
                  <td className="border px-4 py-2">{item.quantity}</td>
                  <td className="border px-4 py-2">${item.unitPrice}</td>
                  <td className="border px-4 py-2">${item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

{/* Totals */}
<div className="mb-12">
  {/* First Row: Grand Total */}
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-lg font-semibold">Grand Total</h2>
    <p>{quotation.discount} INR</p>
  </div>

  {/* Second Row: Total Sqft, Total Units, Price Per Sqft */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
    <p className="text-left">
      <strong>Total Sqft:</strong> {quotation.totals.totalArea} Sqft
    </p>
    <p className="text-center">
      <strong>Total Units:</strong> {quotation.totals.totalUnits} Sqft
    </p>
    <p className="text-right">
      <strong>Price Per Sqft:</strong> ${quotation.totals.grandTotal} INR
    </p>
  </div>
</div>


        {/* Terms and Conditions */}
        <div className="mt-8">
          <div>
            <h3 className="font-bold">TERMS AND CONDITIONS</h3>
            <ul className="list-disc pl-5">
              <li className="text-sm">1. ORDERS</li>
              <ul className="pl-5">
                <li className="text-sm">
                  a. All orders must be placed via mail, post, or electronic means and are subject to acceptance by GALAXY ENCLAVE PVT. LTD., either in full or in part.
                </li>
                <li className="text-sm">
                  b. Glass specifications are tailored to the customer's requirements, and GALAXY ENCLAVE PVT. LTD. does not provide any warranty or guarantee for the same.
                </li>
              </ul>
              <li className="text-sm">2. OFFER VALIDITY</li>
              <ul className="pl-5">
                <li className="text-sm">
                  a. This quotation is valid for 15 days from the date of issuance.
                </li>
                <li className="text-sm">
                  b. The offer validity is subject to changes in Nalco rates or exchange rates, whichever occurs earlier.
                </li>
              </ul>
            </ul>
          </div>
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

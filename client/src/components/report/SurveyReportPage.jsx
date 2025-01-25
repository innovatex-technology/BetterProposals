import React, { useRef, useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import companyLogo from "./../../assets/logo_stone.jpeg";
import companyLogo2 from "./../../assets/aluk.png";
import { useParams } from "react-router-dom";
import { apiService } from "../common/apiService";
import html2canvas from "html2canvas";


const SurveyReportPage = () => {
  const { id } = useParams();
  const [quotations, setQuotations] = useState(null); // Store fetched quotations
  const [error, setError] = useState(null);
  const reportRef = useRef();

  // Fetch quotations from the API
  const fetchQuotations = async () => {
    try {
      const response = await apiService({
        path: `/quotations/${id}`, // Dynamic API endpoint
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError("Failed to fetch quotations: " + errorData.message);
        console.error("Failed to fetch quotations:", errorData);
        return;
      }

      const data = await response.json();
      setQuotations(data.data || {}); // Update state with fetched quotations
    } catch (err) {
      setError("An error occurred while fetching the quotations.");
      console.error("Error while fetching quotations:", err);
    }
  };

  // Call fetchQuotations on page load
  useEffect(() => {
    fetchQuotations();
  }, [id]);

  // Handle Print
  const handlePrint = () => {
    const printContent = reportRef.current;
    const originalContent = document.body.innerHTML;

    // Hide everything else on the page
    document.body.innerHTML = printContent.outerHTML;

    // Trigger the print dialog
    window.print();

    // Restore the page content after printing
    document.body.innerHTML = originalContent;
    // Optionally, trigger a re-render if necessary to restore React components
  };

  // Handle Download PDF
  // Handle Download PDF
  const handleDownload = async () => {
    console.log("download clicked");
    const element = reportRef.current; // The container to export as PDF

    // Use html2canvas to capture the element as an image
    const canvas = await html2canvas(element, { scale: 2 }); // Higher scale for better quality
    const imgData = canvas.toDataURL("image/png"); // Convert canvas to image data

    // Create a new PDF instance
    const pdf = new jsPDF("p", "mm", "a4");

    // Calculate image dimensions to fit into A4 size
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    // Add the image to the PDF
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Save the PDF
    pdf.save("quotation-report.pdf");
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!quotations) {
    return <p>Loading...</p>;
  }

  const { companyName, cin, companyAddress, quotationNo, date, clientName, clientAddress, quotationTitle, items, discount, totals } = quotations;


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* <h1 className="text-2xl font-bold mb-6">Quotation Details</h1> */}
      <div className="bg-white shadow-md rounded p-6 mx-12">
        <div ref={reportRef}>
          < div ref={reportRef} className="quotation-container">
            {/* Company Information */}
            <div className="mb-6">
              <div className="flex items-center w-full gap-6">
                {/* Company Logo */}
                <div className="w-1/4">
                  <img
                    src={companyLogo} // Use dummy logo if no logo is provided
                    alt="Company Logo"
                    className="w-full h-auto"
                  />
                </div>

                {/* Company Info */}
                <div className="w-1/2">
                  <p>
                    <strong className="uppercase underline font-bold">
                      {companyName}
                    </strong>
                  </p>
                  <p>
                    <strong>CIN:</strong>{" "}
                    <strong className="uppercase">{cin}</strong>
                  </p>
                  <p>
                    <strong>ADD:</strong>{" "}
                    <strong className="uppercase">{companyAddress}</strong>
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
                    {quotationTitle}
                  </strong>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <p className="text-left">
                  <strong>Date:</strong> {new Date(date).toLocaleDateString()}
                </p>
                <p className="text-right">
                  <strong>Quotation No:</strong> {quotationNo}
                </p>
              </div>
            </div>

            {/* Client Information */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">To</h2>
              <div>
                <p>
                  <strong className="uppercase font-bold">{clientName}</strong>
                </p>
                <p>{clientAddress}</p>
              </div>
            </div>

            {/* Items Table */}
            {items.map((item, index) => (
              <>
                <table className="w-full border-collapse border-none bg-white" key={item._id || index}>
                  <thead>
                    <tr className="bg-white">
                      <th className="border-t border-l px-4 py-2">Position</th>
                      <th className="border-t px-4 py-2">Quantity [Pcs]</th>
                      <th className="border-t px-4 py-2">Description</th>
                      <th className="border-t px-4 py-2">Area (Sqft)</th>
                      <th className="border-t border-r px-4 py-2">Total [INR]</th>
                    </tr>
                  </thead>
                  <tbody>

                    {/* Bind First and Second Rows */}
                    <tr className="text-center border-t">
                      <td className="border-b border-l px-4 py-2" rowSpan="2">
                        {item.type}
                      </td>
                      <td className="border-b px-4 py-2" rowSpan="2">
                        {item.quantity}
                      </td>
                      <td className="border-b px-4 py-2" rowSpan="2">

                      </td>
                      <td className="border-b px-4 py-2" rowSpan="2">
                        {item.area}
                      </td>
                      <td className="border-b border-r px-4 py-2" rowSpan="2">
                        {item.unitPrice}
                      </td>
                    </tr>
                    <tr className="text-center border-t"></tr>

                    {/* Render Interior View */}
                    <tr className="border-l border-r">
                      <td colSpan="5" className="px-5">
                        Interior View
                      </td>
                    </tr>

                    {/* Render Items */}
                    {/* {quotation.items.map((item) => ( */}
                    <tr>
                      <td
                        colSpan="5"
                        className="border-b col-span-5 border-l border-r px-4 py-2"
                      >
                        <div className="flex items-star gap-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 1625 2475"
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
                            {/* Add any item-specific SVG content if available */}
                          </svg>
                          <div className="flex-1">
                            <p>
                              <span className="font-bold text-gray-700">
                                {item.name} ({item.imageWidth} mm x {item.imageHeight} mm)
                              </span>{" "}
                              Consisting of a {item.type}.
                            </p>
                            <p>System: {item.size}</p>
                            <p>Colours: {item.color}</p>
                            <p>Glazing: {item.glazing}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* ))} */}

                  </tbody>
                </table>
              </>
            ))}
            {/* Totals */}
            <div className="mb-12">
              {/* First Row: Grand Total */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Grand Total</h2>
                <p>{discount} INR</p>
              </div>

              {/* Second Row: Total Sqft, Total Units, Price Per Sqft */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <p className="text-left">
                  <strong>Total Sqft:</strong> {totals.totalArea} Sqft
                </p>
                <p className="text-center">
                  <strong>Total Units:</strong> {totals.totalUnits} Sqft
                </p>
                <p className="text-right">
                  <strong>Price Per Sqft:</strong> ${totals.grandTotal} INR
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
                      a. All orders must be placed via mail, post, or electronic means and
                      are subject to acceptance by GALAXY ENCLAVE PVT. LTD., either in
                      full or in part.
                    </li>
                    <li className="text-sm">
                      b. Glass specifications are tailored to the customer's requirements,
                      and GALAXY ENCLAVE PVT. LTD. does not provide any warranty or
                      guarantee for the same.
                    </li>
                  </ul>
                  <li className="text-sm">2. OFFER VALIDITY</li>
                  <ul className="pl-5">
                    <li className="text-sm">
                      a. This quotation is valid for 15 days from the date of issuance.
                    </li>
                    <li className="text-sm">
                      b. The offer validity is subject to changes in Nalco rates or
                      exchange rates, whichever occurs earlier.
                    </li>
                  </ul>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
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
import React, { useRef, useEffect, useState} from "react";
import { jsPDF } from "jspdf";
import companyLogo from "./../../assets/logo_stone.jpeg";
import companyLogo2 from "./../../assets/aluk.png";
import { useParams } from "react-router-dom";
import { apiService } from "../common/apiService";


const SurveyReportPage = () => {
  const { id } = useParams();
  const [quotations, setQuotations] = useState();
    const [error, setError] = useState(null);
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
      {
        area: 50,
        color: "Blue",
        glazing: "Single",
        id: "1737558248214",
        imageHeight: 2,
        imageWidth: 6,
        name: "Window Panel",
        quantity: 5,
        size: "Large",
        total: 250,
        type: "Option1",
        unitPrice: 50,
        _id: "67911339c204e0f0a0c5ac5e",
      }
    ],
    discount: 5,
    __v: 0,
  };


  // const quotations = [
  //   {
  //     totals: {
  //       totalArea: 100,
  //       totalUnits: 20,
  //       grandTotal: 500,
  //     },
  //     _id: "67911339c204e0f0a0c5ac5d",
  //     companyLogo: "https://dummyimage.com/100x100/000/fff&text=Company+Logo",
  //     companyName: "Galaxy Enclave Pvt. Ltd.",
  //     cin: "U12345RJ2023PTC123456",
  //     companyAddress: "Sp-5 Mansarover Industrial Area, Jaipur-302020, Rajasthan",
  //     quotationNo: "QT-00123",
  //     date: "2025-01-22T00:00:00.000Z",
  //     clientName: "John Doe",
  //     clientAddress: "456 Business Lane, Jaipur",
  //     quotationTitle: "Quotation for Windows",
  //     items: [
  //       {
  //         area: 50,
  //         color: "Blue",
  //         glazing: "Single",
  //         id: "1737558248214",
  //         imageHeight: 2,
  //         imageWidth: 6,
  //         name: "Window Panel",
  //         quantity: 5,
  //         size: "Large",
  //         total: 250,
  //         type: "Option1",
  //         unitPrice: 50,
  //         _id: "67911339c204e0f0a0c5ac5e",
  //       }
  //     ],
  //     discount: 10,
  //     __v: 0,
  //   },
  //   {
  //     totals: {
  //       totalArea: 200,
  //       totalUnits: 15,
  //       grandTotal: 700,
  //     },
  //     _id: "67911339c204e0f0a0c5ac5g",
  //     companyLogo: "https://dummyimage.com/100x100/333/fff&text=Company+Logo",
  //     companyName: "Star Construction Pvt. Ltd.",
  //     cin: "U12345RJ2024PTC789012",
  //     companyAddress: "123 Industrial Area, Jaipur-302015, Rajasthan",
  //     quotationNo: "QT-00124",
  //     date: "2025-01-23T00:00:00.000Z",
  //     clientName: "Jane Smith",
  //     clientAddress: "789 Business Street, Udaipur",
  //     quotationTitle: "Quotation for Construction Materials",
  //     items: [
  //       {
  //         area: 70,
  //         color: "White",
  //         glazing: "Triple",
  //         id: "1737558248216",
  //         imageHeight: 4,
  //         imageWidth: 8,
  //         name: "Ceiling Panel",
  //         quantity: 10,
  //         size: "Large",
  //         total: 500,
  //         type: "Option3",
  //         unitPrice: 50,
  //         _id: "67911339c204e0f0a0c5ac5h",
  //       }
  //     ],
  //     discount: 15,
  //     __v: 0,
  //   },
  //   {
  //     totals: {
  //       totalArea: 300,
  //       totalUnits: 25,
  //       grandTotal: 1200,
  //     },
  //     _id: "67911339c204e0f0a0c5ac5j",
  //     companyLogo: "https://dummyimage.com/100x100/555/fff&text=Company+Logo",
  //     companyName: "Alpha BuildTech Pvt. Ltd.",
  //     cin: "U12345RJ2025PTC456789",
  //     companyAddress: "456 Tech Park, Jaipur-302001, Rajasthan",
  //     quotationNo: "QT-00125",
  //     date: "2025-01-24T00:00:00.000Z",
  //     clientName: "Michael Johnson",
  //     clientAddress: "123 Urban Square, Jodhpur",
  //     quotationTitle: "Quotation for Custom Glass Work",
  //     items: [
  //       {
  //         area: 150,
  //         color: "Clear",
  //         glazing: "Single",
  //         id: "1737558248218",
  //         imageHeight: 5,
  //         imageWidth: 10,
  //         name: "Custom Glass",
  //         quantity: 15,
  //         size: "Extra Large",
  //         total: 900,
  //         type: "Option5",
  //         unitPrice: 60,
  //         _id: "67911339c204e0f0a0c5ac5k",
  //       }
  //     ],
  //     discount: 20,
  //     __v: 0,
  //   },
  // ];

  // Fetch quotations from the API
  const fetchQuotations = async () => {
    try {
      const response = await apiService({
        path: `/quotation/67911339c204e0f0a0c5ac5d`, // API endpoint with ID
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError("Failed to fetch quotations: " + errorData.message);
        console.error("Failed to fetch quotations:", errorData);
        return;
      }

      const data = await response.json();
      console.log("data:::",data.data );
      setQuotations(data.data || []); // Update state with fetched quotations
    } catch (err) {
      setError("An error occurred while fetching the quotations.");
      console.error("Error while fetching quotations:", err);
    } 
  };

  // Call fetchQuotations on page load
  useEffect(() => {
    fetchQuotations();
  }, [id]);
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



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* <h1 className="text-2xl font-bold mb-6">Quotation Details</h1> */}
      <div className="bg-white shadow-md rounded p-6 mx-12" ref={reportRef}>

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
                    {quotation.companyName}
                  </strong>
                </p>
                <p>
                  <strong>CIN:</strong>{" "}
                  <strong className="uppercase">{quotation.cin}</strong>
                </p>
                <p>
                  <strong>ADD:</strong>{" "}
                  <strong className="uppercase">{quotation.companyAddress}</strong>
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
              <p>{quotation.clientAddress}</p>
            </div>
          </div>

          {/* Items Table */}
          {quotation.items.map((item) => (
            <>
              <table className="w-full border-collapse border-none bg-white">
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
                  <tr key={item._id}>
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
                          <p>Unit Price: {item.unitPrice} INR</p>
                          <p>Total: {item.total} INR</p>
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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../common/apiService";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import companyLogos from "./../../assets/logo_stone.jpeg";
import companyLogo2 from "./../../assets/aluk.png";

export default function SurveyFormPage() {
  const [companyLogo, setCompanyLogo] = useState(companyLogos);
  const [companyName, setCompanyName] = useState("");
  const [cin, setCin] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");

  const [date, setDate] = useState("");
  const [quotationNo, setQuotationNo] = useState("");

  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");

  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  const navigate = useNavigate();

  // Add a new item
  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      type: "Option1",
      quantity: 1,
      area: 0,
      unitPrice: 0,
      total: 0,
      image: null,
      imageHeight: 0,
      imageWidth: 0,
      name: "",
      size: "",
      color: "",
      glazing: "",
    };
    setItems([...items, newItem]);
  };

  // Handle item field changes
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    if (field === "quantity" || field === "unitPrice" || field === "area") {
      updatedItems[index].total = (updatedItems[index].quantity || 0) * (updatedItems[index].unitPrice || 0);
    }
    setItems(updatedItems);
  };

  // Remove an item
  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
  };

  // Calculate totals
  const calculateTotals = () => {
    const totalArea = items.reduce((sum, item) => sum + (item.area || 0), 0);
    const totalUnits = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
    const grandTotal = subtotal - subtotal * (discount / 100);

    return { totalArea, totalUnits, grandTotal, pricePerSqft: grandTotal / (totalArea || 1) };
  };

  // Save quotation
  const handleSaveQuotation = async () => {
    const { totalArea, totalUnits, grandTotal } = calculateTotals();
    const quotation = {
      companyLogo,
      companyName,
      cin,
      companyAddress,
      quotationNo,
      date,
      clientName,
      clientAddress,
      quotationTitle: "quotation",
      status:"completed",
      items,
      discount,
      totals: { totalArea, totalUnits, grandTotal },
    };

    try {
      // Call the API to save the quotation
      const response = await apiService({
        path: "/quotation",
        method: "POST",
        body: quotation,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to save quotation:", errorData);
        alert("Failed to save quotation: " + errorData.message);
        return; // Stop further execution if API fails
      }

      const data = await response.json(); // Parse the response JSON
      console.log("Quotation saved successfully:", data);

      // Navigate to the quotations page with the saved quotation data
      navigate("/quotations", { state: { quotation: data } });
    } catch (error) {
      console.error("Error occurred while saving quotation:", error);
      alert("An error occurred while saving the quotation.");
    }


  };

  // Toggle preview mode
  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  // Handle logo upload
  const handleLogoUpload = (e) => {
    setCompanyLogo(e.target.files[0]);
  };

  const { totalArea, totalUnits, grandTotal, pricePerSqft } = calculateTotals();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}

      {isPreview ? (
        // Preview Mode
        <div className="bg-white shadow-md rounded p-6 mx-12">
          < div className="quotation-container">
            {/* Company Information */}
            <div className="mb-6">
              <div className="flex items-center w-full gap-6">
                {/* Company Logo */}
                <div className="w-1/4">
                  <img
                    src={companyLogo2} // Use dummy logo if no logo is provided
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
                    src={companyLogos} // Use dummy logo if no logo is provided
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
                    quotation
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
            {items.map((item) => (
            <table className="w-full border-collapse border-none bg-white" key={item._id}>
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
                
                  {/* // <tr key={item._id}> */}
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
                          <p>Unit Price: {item.unitPrice} INR</p>
                          <p>Total: {item.total} INR</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                
              </tbody>
            </table>
          ))}
            {/* Totals */}
            <div className="mb-12">
              {/* First Row: Grand Total */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Grand Total</h2>
                <p>{grandTotal} INR</p>
              </div>

              {/* Second Row: Total Sqft, Total Units, Price Per Sqft */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <p className="text-left">
                  <strong>Total Sqft:</strong> {totalArea} Sqft
                </p>
                <p className="text-center">
                  <strong>Total Units:</strong> {totalUnits} Sqft
                </p>
                <p className="text-right">
                  <strong>Price Per Sqft:</strong> ${grandTotal} INR
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

          <button
            onClick={togglePreview}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to Edit
          </button>
        </div>
      ) : (
        <div>

          <div className="mb-4">
            <label>Company Logo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="w-full px-4 py-2 border rounded mb-2"
            />
          </div>
          {/* Company Details */}
          <div className="flex flex-wrap mb-4">
            {/* Company Name */}
            <div className="w-full sm:w-1/3 mb-4">
              {/* <label>Company Name:</label> */}
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2"
                placeholder="Company Name"
              />
            </div>

            {/* CIN */}
            <div className="w-full sm:w-1/3 mb-4">
              {/* <label>CIN:</label> */}
              <input
                type="text"
                value={cin}
                onChange={(e) => setCin(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2"
                placeholder="CIN"
              />
            </div>

            {/* Company Address */}
            <div className="w-full sm:w-1/3 mb-4">
              {/* <label>Company Address:</label> */}
              <input
                type="text"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2"
                placeholder="Company Address"
              />
            </div>
          </div>


          {/* Quotation Details */}
          <div className="flex flex-wrap mb-4">
            {/* Date */}
            <div className="w-full sm:w-1/2 mb-4">
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                className="w-full px-4 py-2 border rounded mb-2"
                placeholderText="Select a Date"
                dateFormat="dd/MM/yyyy" // You can adjust the date format here
              />
            </div>

            {/* Quotation No */}
            <div className="w-full sm:w-1/2 mb-4">
              {/* <label>Quotation No:</label> */}
              <input
                type="text"
                value={quotationNo}
                onChange={(e) => setQuotationNo(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                placeholder="Quotation No"
              />
            </div>
          </div>


          {/* Client Details */}
          <div className="flex flex-wrap mb-4">
            {/* Client Name */}
            <div className="w-full sm:w-1/2 mb-4">
              {/* <label>Client Name:</label> */}
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2"
                placeholder="Client Name"
              />
            </div>

            {/* Client Address */}
            <div className="w-full sm:w-1/2 mb-4">
              {/* <label>Client Address:</label> */}
              <input
                type="text"
                value={clientAddress}
                onChange={(e) => setClientAddress(e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2"
                placeholder="Client Address"
              />
            </div>
          </div>


          {/* Items Table */}
          <div className="mb-4">
            <h2 className="text-lg font-bold">Quotation Items</h2>
            {items.map((item, index) => (
              <div key={item.id} className="border p-4 mb-4 rounded-lg shadow-sm">

                {/* First Section */}
                <div className="mb-4">
                  <div className="flex flex-wrap mb-4">
                    {/* Type Selector */}
                    <div className="w-full sm:w-1/4 mb-4">
                      <label className="block text-sm font-semibold mb-2">Position Type</label>
                      <select
                        value={item.type}
                        onChange={(e) => handleItemChange(index, "type", e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                      >
                        <option value="" disabled>Position Type</option>
                        <option value="Option1">Option 1</option>
                        <option value="Option2">Option 2</option>
                        <option value="Option3">Option 3</option>
                      </select>
                    </div>

                    {/* Quantity Input */}
                    <div className="w-full sm:w-1/4 mb-4">
                      <label className="block text-sm font-semibold mb-2">Quantity</label>
                      <input
                        type="number"
                        placeholder="Quantity"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 0)}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>

                    {/* Area Input */}
                    <div className="w-full sm:w-1/4 mb-4">
                      <label className="block text-sm font-semibold mb-2">Area (Sqft)</label>
                      <input
                        type="number"
                        placeholder="Area (Sqft)"
                        value={item.area}
                        onChange={(e) => handleItemChange(index, "area", parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>

                    {/* Unit Price Input */}
                    <div className="w-full sm:w-1/4 mb-4">
                      <label className="block text-sm font-semibold mb-2">Unit Price</label>
                      <input
                        type="number"
                        placeholder="Unit Price"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, "unitPrice", parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Second Section */}
                <div className="flex flex-wrap mb-4">
                  {/* Image Section */}
                  <div className="w-full sm:w-1/2 mb-4">
                    <div className="border p-4 rounded-lg mb-4">
                      <label className="block mb-2">Image</label>
                      <input
                        type="file"
                        onChange={(e) => handleItemChange(index, 'image', e.target.files[0])}
                        className="mb-4"
                      />
                      <input
                        type="number"
                        placeholder="Height (mm)"
                        value={item.imageHeight}
                        onChange={(e) => handleItemChange(index, "imageHeight", parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border rounded mb-4"
                      />
                      <input
                        type="number"
                        placeholder="Width (mm)"
                        value={item.imageWidth}
                        onChange={(e) => handleItemChange(index, "imageWidth", parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border rounded mb-4"
                      />
                    </div>
                  </div>

                  {/* Window Details Section */}
                  <div className="w-full sm:w-1/2 mb-4">
                    <div className="mb-4">
                      <label className="block mb-2">Window Details</label>
                      <input
                        type="text"
                        placeholder="Name"
                        value={item.name}
                        onChange={(e) => handleItemChange(index, "name", e.target.value)}
                        className="w-full px-3 py-2 border rounded mb-2"
                      />
                      <input
                        type="text"
                        placeholder="Size"
                        value={item.size}
                        onChange={(e) => handleItemChange(index, "size", e.target.value)}
                        className="w-full px-3 py-2 border rounded mb-2"
                      />
                      <input
                        type="text"
                        placeholder="Color"
                        value={item.color}
                        onChange={(e) => handleItemChange(index, "color", e.target.value)}
                        className="w-full px-3 py-2 border rounded mb-2"
                      />
                      <input
                        placeholder="Glazing"
                        value={item.glazing}
                        onChange={(e) => handleItemChange(index, "glazing", e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <div className="text-right mt-4">
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="text-red-500 text-sm"
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}




            <button
              onClick={handleAddItem}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Add Item
            </button>
          </div>

        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => window.history.back()}
          className="bg-gray-300 text-black px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={togglePreview}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Preview
        </button>
        <button
          onClick={handleSaveQuotation}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <button
          onClick={handleSaveQuotation}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Publish
        </button>
      </div>
    </div>
  );
}

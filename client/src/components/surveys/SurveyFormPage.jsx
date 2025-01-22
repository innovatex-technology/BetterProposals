import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../common/apiService";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function SurveyFormPage() {
  const [companyLogo, setCompanyLogo] = useState(null);
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
        <div>
          {/* Items Table */}
          <table className="table-auto w-full border mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">S.N.</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Area (Sqft)</th>
                <th className="px-4 py-2">Total (INR)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2 text-center">{index + 1}</td>
                  <td className="px-4 py-2">{item.type}</td>
                  <td className="px-4 py-2 text-center">{item.quantity}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2 text-right">{item.area.toFixed(2)}</td>
                  <td className="px-4 py-2 text-right">{item.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer Section */}
          <div className="border-t pt-4">Grand Total:
            <div className="flex justify-between">
              <div>
                <table className="table-auto w-full border">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-8 py-2">Total Sqft</th>
                      <th className="px-4 py-2">Total Units</th>
                      <th className="px-4 py-2">Price per Sqft</th>
                      <th className="px-4 py-2">Grand Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={item.id} className="border-b">
                        <td className="px-4 py-2 text-center">{totalArea.toFixed(2)}</td>
                        <td className="px-4 py-2">{totalUnits}</td>
                        <td className="px-4 py-2">₹{pricePerSqft.toFixed(2)}</td>
                        <td className="px-4 py-2 text-center">₹{grandTotal.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <div>
              <h3 className="font-bold">TERMS AND CONDITIONS</h3>
              <ul className="list-disc pl-5">
                <li className="text-sm">1. ORDERS</li>
                <ul className="pl-5">
                  <li className="text-sm">
                    a. All orders by customers must be submitted electronically and accepted by the company.
                  </li>
                </ul>
                <li className="text-sm">2. OFFER VALIDITY</li>
                <ul className="pl-5">
                  <li className="text-sm">
                    a. This quotation is valid for 15 days from the date of issuance.
                  </li>
                </ul>
              </ul>
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
        // Edit Mode
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

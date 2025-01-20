import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SurveyFormPage() {
  const [clientName, setClientName] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [quotationTitle, setQuotationTitle] = useState("Quotation");
  const [quotationDate, setQuotationDate] = useState(new Date().toISOString().slice(0, 10));
  const [quotationNumber, setQuotationNumber] = useState("QTN-001");
  const [items, setItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [isPreview, setIsPreview] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({
    name: "Your Company Name",
    address: "Your Company Address",
    cin: "CIN: UXXXXXXXXX",
    description: "Company Description",
    logo: "",
  });
  const navigate = useNavigate();

  // Add a new item
  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      type: "",
      position: "",
      quantity: 1,
      description: "",
      area: 0,
      unitPrice: 0,
      total: 0,
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

  // Calculate totals
  const calculateTotals = () => {
    const totalArea = items.reduce((sum, item) => sum + (item.area || 0), 0);
    const totalUnits = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
    const grandTotal = subtotal - subtotal * (discount / 100);

    return { totalArea, totalUnits, grandTotal, pricePerSqft: grandTotal / (totalArea || 1) };
  };

  // Save quotation
  const handleSaveQuotation = () => {
    const { totalArea, totalUnits, grandTotal } = calculateTotals();
    const quotation = {
      clientName,
      contactInfo,
      clientAddress,
      title: quotationTitle,
      date: quotationDate,
      number: quotationNumber,
      items,
      discount,
      totals: { totalArea, totalUnits, grandTotal },
    };
    const quotations = JSON.parse(localStorage.getItem("quotations")) || [];
    quotations.push(quotation);
    localStorage.setItem("quotations", JSON.stringify(quotations));

    navigate("/quotations", { state: { quotation } });
  };

  // Toggle preview mode
  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  // Handle company logo upload
  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCompanyDetails((prev) => ({ ...prev, logo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const { totalArea, totalUnits, grandTotal, pricePerSqft } = calculateTotals();

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="border-b pb-4 mb-4 text-center">
        {/* First Row: Logo and Company Details */}
        <div className="flex justify-between items-center mb-4">
          {/* Logo and file upload */}
          <div className="flex flex-col items-center w-1/3">
            <div className="mb-4">
              {companyDetails.logo ? (
                <img src={companyDetails.logo} alt="Company Logo" className="w-24 h-24 object-contain" />
              ) : (
                <p className="text-gray-500">No Logo Uploaded</p>
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="mb-4 text-sm"
              />
            </div>
          </div>

          {/* Company Details */}
          <div className="flex flex-col items-center w-2/3">
            <h1 className="text-2xl font-bold">{companyDetails.name}</h1>
            <p>{companyDetails.cin}</p>
            <p>{companyDetails.description}</p>
            <p>{companyDetails.address}</p>
          </div>
        </div>

        {/* Second Row: Quotations Centered */}
        <div className="text-center mb-4">
          <p className="font-semibold">{companyDetails.name}</p>
        </div>

        {/* Third Row: Date (left) and Quotation No (right) */}
        <div className="flex justify-between mb-4">
          <div className="text-left">
            <p className="text-sm">Date: {quotationDate}</p>
          </div>
          <div className="text-right">
            <p className="text-sm">Quotation No: {quotationNumber}</p>
          </div>
        </div>

        {/* Fourth Row: CIN, Name, and Address */}
        <div className="flex justify-between mb-4">
          <p className="text-sm">To</p>
          <p className="text-sm">{companyDetails.name}</p>
          <p className="text-sm">{companyDetails.address}</p>
        </div>
      </div>

      {isPreview ? (
        // Preview Mode
        <div>
          {/* Items Table */}
          <table className="table-auto w-full border mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Position</th>
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
                  <td className="px-4 py-2">{item.position}</td>
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
          {/* Client Details */}
          <div className="mb-4">
            <label>Client Name:</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-2"
              placeholder="Client Name"
            />
          </div>
          <div className="mb-4">
            <label>Contact Info:</label>
            <input
              type="text"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="w-full px-4 py-2 border rounded mb-2"
              placeholder="Contact Information"
            />
          </div>
          <div className="mb-4">
            <label>Client Address:</label>
            <textarea
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="Client Address"
            />
          </div>

          {/* Items Table */}
          <div className="mb-4">
            <h2 className="text-lg font-bold">Quotation Items</h2>
            {items.map((item, index) => (
              <div key={item.id} className="border p-4 mb-2 rounded">
                <div className="flex space-x-4 mb-2">
                  <input
                    type="text"
                    placeholder="Type"
                    value={item.type}
                    onChange={(e) => handleItemChange(index, "type", e.target.value)}
                    className="w-1/4 px-2 py-1 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Position"
                    value={item.position}
                    onChange={(e) => handleItemChange(index, "position", e.target.value)}
                    className="w-1/4 px-2 py-1 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 0)}
                    className="w-1/4 px-2 py-1 border rounded"
                  />
                </div>
                <div className="flex space-x-4">
                  <textarea
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    className="w-2/3 px-2 py-1 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Area (Sqft)"
                    value={item.area}
                    onChange={(e) => handleItemChange(index, "area", parseFloat(e.target.value) || 0)}
                    className="w-1/6 px-2 py-1 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Unit Price"
                    value={item.unitPrice}
                    onChange={(e) => handleItemChange(index, "unitPrice", parseFloat(e.target.value) || 0)}
                    className="w-1/6 px-2 py-1 border rounded"
                  />
                </div>
                <div className="text-right mt-2">
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
      </div>
    </div>
  );
}

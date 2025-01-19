import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuotationFormPage() {
    const [rows, setRows] = useState([
        { position: '', quantity: '', description: '', area: '', total: '', photo: null, photoDescription: '' },
    ]);

    const navigate = useNavigate();

    const handleAddRow = () => {
        setRows([
            ...rows,
            { position: '', quantity: '', description: '', area: '', total: '', photo: null, photoDescription: '' },
        ]);
    };

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

    const handleFileChange = (index, file) => {
        const updatedRows = [...rows];
        updatedRows[index].photo = file;
        setRows(updatedRows);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <header className="flex justify-between items-center mb-8 border-b pb-4">
                <div className="flex items-center">
                    <img src="/path-to-company-logo.png" alt="Company Logo" className="h-12 mr-4" />
                    <div>
                        <h1 className="text-xl font-bold">Company Name</h1>
                        <p>CIN: [Company CIN]</p>
                        <p>Address: [Company Address]</p>
                    </div>
                </div>
                <div>
                    <img src="/path-to-client-logo.png" alt="Client Logo" className="h-12" />
                </div>
            </header>

            <h2 className="text-2xl font-bold mb-4 text-center">QUOTATION</h2>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Position</th>
                        <th className="border border-gray-300 px-4 py-2">Quantity</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Area (Sqft)</th>
                        <th className="border border-gray-300 px-4 py-2">Total [INR]</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <>
                            <tr key={`${index}-main`} className="border border-gray-300">
                                <td className="border border-gray-300 px-4 py-2" rowSpan="2">
                                    <input
                                        type="text"
                                        value={row.position}
                                        onChange={(e) => handleInputChange(index, 'position', e.target.value)}
                                        className="w-full border border-gray-300 px-2 py-1 rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="number"
                                        value={row.quantity}
                                        onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                        className="w-full border border-gray-300 px-2 py-1 rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <textarea
                                        value={row.description}
                                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                        className="w-full border border-gray-300 px-2 py-1 rounded"
                                        rows="3"
                                    ></textarea>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="text"
                                        value={row.area}
                                        onChange={(e) => handleInputChange(index, 'area', e.target.value)}
                                        className="w-full border border-gray-300 px-2 py-1 rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="text"
                                        value={row.total}
                                        onChange={(e) => handleInputChange(index, 'total', e.target.value)}
                                        className="w-full border border-gray-300 px-2 py-1 rounded"
                                    />
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Photo</th>
                        <th className="border border-gray-300 px-4 py-2">Photo Description</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <>
                            <tr key={`${index}-main`} className="border border-gray-300">
                                <td className="border border-gray-300 px-4 py-2" rowSpan="2">
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                                        className="w-full border border-gray-300 px-2 py-1 rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border border-gray-300 px-4 py-2">Winod name </th>
                                            <th className="border border-gray-300 px-4 py-2">System</th>
                                            <th className="border border-gray-300 px-4 py-2">Colors Profiles</th>
                                            <th className="border border-gray-300 px-4 py-2">Glazing</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, index) => (
                                            <>
                                                <tr key={`${index}-main`} className="border border-gray-300">
                                                    <td className="border border-gray-300 px-4 py-2" rowSpan="2">
                                                        <input
                                                            type="text"
                                                            value={row.position}
                                                            onChange={(e) => handleInputChange(index, 'position', e.target.value)}
                                                            className="w-full border border-gray-300 px-2 py-1 rounded"
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <input
                                                            type="text"
                                                            value={row.quantity}
                                                            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                                            className="w-full border border-gray-300 px-2 py-1 rounded"
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                    <input
                                                            type="text"
                                                            value={row.quantity}
                                                            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                                            className="w-full border border-gray-300 px-2 py-1 rounded"
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                    <input
                                                            type="text"
                                                            value={row.quantity}
                                                            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                                            className="w-full border border-gray-300 px-2 py-1 rounded"
                                                        />
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>
            <h2 className="text-2xl font-bold mb-4 text-center">Grand Total:</h2>

            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Position</th>
                        <th className="border border-gray-300 px-4 py-2">Quantity</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Area (Sqft)</th>
                        <th className="border border-gray-300 px-4 py-2">Total [INR]</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <>
                            <tr key={`${index}-main`} className="border border-gray-300">
                                <td className="border border-gray-300 px-4 py-2" rowSpan="2">
                                    <input
                                        type="text"
                                        value={row.position}
                                        onChange={(e) => handleInputChange(index, 'position', e.target.value)}
                                        className="w-full border border-gray-300 px-2 py-1 rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="number"
                                        value={row.quantity}
                                        onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                        className="w-full border border-gray-300 px-2 py-1 rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <textarea
                                        value={row.description}
                                        onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                        className="w-full border border-gray-300 px-2 py-1 rounded"
                                        rows="3"
                                    ></textarea>
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="text"
                                        value={row.area}
                                        onChange={(e) => handleInputChange(index, 'area', e.target.value)}
                                        className="w-full border border-gray-300 px-2 py-1 rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="text"
                                        value={row.total}
                                        onChange={(e) => handleInputChange(index, 'total', e.target.value)}
                                        className="w-full border border-gray-300 px-2 py-1 rounded"
                                    />
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Photo</th>
                        <th className="border border-gray-300 px-4 py-2">Photo Description</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <>
                            <tr key={`${index}-main`} className="border border-gray-300">
                                <td className="border border-gray-300 px-4 py-2" rowSpan="2">
                                    <input
                                        type="file"
                                        onChange={(e) => handleFileChange(index, e.target.files[0])}
                                        className="w-full border border-gray-300 px-2 py-1 rounded"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <thead>
                                        <tr className="bg-gray-200">
                                            <th className="border border-gray-300 px-4 py-2">Winod name </th>
                                            <th className="border border-gray-300 px-4 py-2">System</th>
                                            <th className="border border-gray-300 px-4 py-2">Colors Profiles</th>
                                            <th className="border border-gray-300 px-4 py-2">Glazing</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, index) => (
                                            <>
                                                <tr key={`${index}-main`} className="border border-gray-300">
                                                    <td className="border border-gray-300 px-4 py-2" rowSpan="2">
                                                        <input
                                                            type="text"
                                                            value={row.position}
                                                            onChange={(e) => handleInputChange(index, 'position', e.target.value)}
                                                            className="w-full border border-gray-300 px-2 py-1 rounded"
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                        <input
                                                            type="text"
                                                            value={row.quantity}
                                                            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                                            className="w-full border border-gray-300 px-2 py-1 rounded"
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                    <input
                                                            type="text"
                                                            value={row.quantity}
                                                            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                                            className="w-full border border-gray-300 px-2 py-1 rounded"
                                                        />
                                                    </td>
                                                    <td className="border border-gray-300 px-4 py-2">
                                                    <input
                                                            type="text"
                                                            value={row.quantity}
                                                            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                                            className="w-full border border-gray-300 px-2 py-1 rounded"
                                                        />
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                    </tbody>
                                </td>
                            </tr>
                        </>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end mt-4">
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                >
                    Cancel
                </button>
                <button
                    onClick={handleAddRow}
                    className="bg-indigo-600 text-white px-4 py-2 rounded"
                >
                    Add Row
                </button>
                
            </div>
                        {/* Terms and Conditions Section */}
                        <div className="mt-6">
                <h3 className="text-xl font-semibold">Terms and Conditions</h3>
                <ul className="list-disc pl-5">
                    <li>All orders are subject to acceptance by GALAXY ENCLAVE PVT LTD.</li>
                    <li>Prices may vary based on material and market conditions.</li>
                    <li>Offer valid for 15 days from the date of quotation.</li>
                </ul>
            </div>

        </div>
        
    );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuotationCard from "../SurveyCard"; // Import the QuotationCard component
import { apiService } from "../common/apiService"; // Import the API service

export default function SurveyListPage() {
  const navigate = useNavigate();
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isLoggedIn = true; 

  // Fetch quotations from the API
  const fetchQuotations = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await apiService({
        path: "/quotations", // Replace with your API endpoint
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError("Failed to fetch quotations: " + errorData.message);
        console.error("Failed to fetch quotations:", errorData);
        return;
      }

      const data = await response.json();
      setQuotations(data.data || []); // Update state with fetched quotations
      console.log("data::::::::::",data.data);
    } catch (err) {
      setError("An error occurred while fetching the quotations.");
      console.error("Error while fetching quotations:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Call fetchQuotations on page load
  useEffect(() => {
    fetchQuotations();
  }, []); // Empty dependency array ensures it runs only once

  if (!isLoggedIn) {
    // If user is not logged in, redirect to login page
    navigate("/");
  }

  if (loading) {
    return <div className="text-center">Loading quotations...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Quotations List</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotations.length > 0 ? (
          quotations.map((quotation) => (
            <QuotationCard key={quotation.id || quotation._id} quotation={quotation} />
          ))
        ) : (
          <div className="text-center col-span-full text-gray-500">No quotations available</div>
        )}
      </div>
    </div>
  );
}

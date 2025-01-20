import React, { useState } from 'react';

export default function PaymentPage() {
  const [step, setStep] = useState(1); // Step state to track the current section
  const [paymentMethod, setPaymentMethod] = useState('Credit or Debit Card');

  const handleNext = () => setStep(step + 1); // Navigate to the next step
  const handleBack = () => setStep(step - 1); // Navigate to the previous step

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {/* Step 1: Billing Details */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Billing Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="first-name">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="Enter your first name"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="last-name">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="Enter your last name"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="country">
                  Country <span className="text-red-500">*</span>
                </label>
                <select
                  id="country"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option>India</option>
                  <option>USA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="state">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  id="state"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                >
                  <option>Select a State</option>
                  <option>Delhi</option>
                  <option>Maharashtra</option>
                </select>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1" htmlFor="billing-email">
                Billing Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="billing-email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Payment Method</h2>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
              Select Payment Method <span className="text-red-500">*</span>
              </label>
              <div className="space-y-4">
                <div>
                  <input
                    type="radio"
                    id="credit-card"
                    name="payment-method"
                    value="Credit or Debit Card"
                    checked={paymentMethod === 'Credit or Debit Card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="credit-card">Credit or Debit Card</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="invoice"
                    name="payment-method"
                    value="Invoice"
                    checked={paymentMethod === 'Invoice'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="invoice">Invoice</label>
                </div>
              </div>
            </div>

            {/* Card Details */}
            {paymentMethod === 'Credit or Debit Card' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name-on-card">
                    Name on Card <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name-on-card"
                    placeholder="Enter name on card"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="card-number">
                    Card Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    placeholder="1234 5678 9123 4567"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="expiry-date">
                    Expiry Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="expiry-date"
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="cvv">
                    CVV <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    placeholder="123"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
            )}

            <div className="flex justify-between">
              <button
                onClick={handleBack}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review Order */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Review Order</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Team Premier - 2 Seats</li>
              <li>Unlimited surveys and questions</li>
              <li>Survey sharing with fine control over who can view and edit</li>
              <li>Let team members analyze, filter, and export results</li>
              <li>Shared asset library for on-brand surveys</li>
              <li>Phone support and 24/7 email support</li>
            </ul>
            <div className="flex justify-between mt-6">
              <button
                onClick={handleBack}
                className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
              >
                Back
              </button>
              <button
                onClick={() => alert('Order Placed!')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

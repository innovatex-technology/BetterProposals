import React from "react";
import { Link } from "react-router-dom";

export default function ProductPricing() {
  const dummySurveys = [
    { title: "Customer Feedback Survey", questions: 10, responses: 145 },
    { title: "Employee Engagement Survey", questions: 15, responses: 89 },
    { title: "Market Research Survey", questions: 20, responses: 230 },
    { title: "Event Experience Survey", questions: 8, responses: 120 },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      {/* <header className="bg-indigo-600 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">BetterProposals</h1>
          <nav className="space-x-4">
            <Link to="/features" className="hover:text-indigo-300">
              Features
            </Link>
            <Link to="/pricing" className="hover:text-indigo-300">
              Pricing
            </Link>
            <Link to="/contact" className="hover:text-indigo-300">
              Contact Us
            </Link>
          </nav>
        </div>
      </header> */}

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-800">
            Create Surveys That Drive Results
          </h2>
          <p className="text-gray-600 mt-4">
            Build surveys in minutes, gather insights instantly, and make data-driven decisions with ease.
          </p>
          <Link
            to="/signup"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg mt-6 inline-block hover:bg-indigo-700 transition-all duration-300"
          >
            Sign Up Free
          </Link>
        </section>

        {/* Features Section */}
        <section className="mb-12">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Powerful Features for Every Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Marketing", desc: "Boost campaigns with deep insights." },
              {
                title: "Customer Experience",
                desc: "Enhance satisfaction with actionable feedback.",
              },
              {
                title: "Human Resources",
                desc: "Build a strong, happy workforce.",
              },
              { title: "Product Development", desc: "Prioritize the right features." },
              { title: "Market Research", desc: "Gather data faster." },
              { title: "Event Planning", desc: "Capture event feedback." },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-gray-800">{feature.title}</h4>
                <p className="text-gray-600 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-gray-50 shadow-md rounded-lg p-6 mb-12">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Choose a Plan That Fits Your Needs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Basic",
                price: "Free",
                features: ["10 questions per survey", "25 responses per survey"],
                cta: "Sign Up Free",
                link: "/signup",
              },
              {
                title: "Pro",
                price: "₹1,999/month",
                features: ["Unlimited surveys", "15,000 responses/year"],
                cta: "Get Started",
                link: "/pricing/pro",
              },
              {
                title: "Team",
                price: "₹1,550/user/month",
                features: ["50,000 responses/year", "Collaboration tools"],
                cta: "Contact Sales",
                link: "/contact",
              },
            ].map((plan, index) => (
              <div
                key={index}
                className="border rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <h4 className="text-xl font-bold text-gray-800">{plan.title}</h4>
                <p className="text-indigo-600 text-2xl font-semibold my-4">
                  {plan.price}
                </p>
                <ul className="text-gray-600 text-sm mb-6 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>• {feature}</li>
                  ))}
                </ul>
                <Link
                  to={plan.link}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Dummy Surveys Section */}
        <section>
          <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Explore Our Popular Surveys
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dummySurveys.map((survey, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-all duration-300"
              >
                <h4 className="text-lg font-bold text-gray-800">{survey.title}</h4>
                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">{survey.questions}</span>{" "}
                  questions |{" "}
                  <span className="font-semibold">{survey.responses}</span>{" "}
                  responses
                </p>
                <Link
                  to="/surveys"
                  className="text-indigo-600 mt-4 inline-block hover:underline"
                >
                  View Survey
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-12">
          <h3 className="text-3xl font-semibold text-gray-800">
            Ready to Start?
          </h3>
          <p className="text-gray-600 mt-4">
            Join 300K+ organizations and transform the way you collect feedback.
          </p>
          <Link
            to="/signup"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg mt-6 inline-block hover:bg-indigo-700"
          >
            Sign Up Free
          </Link>
        </section>
      </main>
    </div>
  );
}

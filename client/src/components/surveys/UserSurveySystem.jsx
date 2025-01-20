import React, { useState, useEffect } from "react";

export default function UserSurveySystem() {
  const [step, setStep] = useState(1); // 1: Details, 2: Survey, 3: Thank You
  const [userDetails, setUserDetails] = useState({ name: "", email: "" });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(60); // Timer in seconds
  const [isSubmitted, setIsSubmitted] = useState(false);

  const surveyData = {
    title: "Employee Satisfaction Survey",
    description: "Gathering feedback on workplace environment and culture",
    questions: [
      { text: "How satisfied are you with the work environment?", type: "multiple-choice", options: ["Very Satisfied", "Satisfied", "Neutral","Dissatisfied","Very Dissatisfied"] },
      { text: "Do you feel valued by your team and management?", type: "rating" },
      { text: "What can be improved in the workplace culture?", type: "text" },
    ],
  };

  useEffect(() => {
    let interval;
    if (step === 2 && !isSubmitted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            handleAutoSubmit();
            clearInterval(interval);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, isSubmitted]);

  const handleStartSurvey = () => {
    if (userDetails.name && userDetails.email) {
      setStep(2);
      setTimer(60); // Reset timer
    } else {
      alert("Please fill in all details to proceed.");
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < surveyData.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setStep(3);
  };

  const handleAutoSubmit = () => {
    if (!isSubmitted) {
      alert("Time's up! The survey is being submitted automatically.");
      handleSubmit();
    }
  };

  if (step === 3) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-extrabold text-green-600">Thank You!</h2>
        <p className="text-lg text-gray-700 mt-4">Your survey has been submitted successfully.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 shadow-md rounded-lg">
      {step === 1 && (
        <div>
          <h2 className="text-3xl font-bold text-blue-600 mb-4">{surveyData.title}</h2>
          <p className="mb-6 text-gray-700">{surveyData.description}</p>

          <div className="mb-6">
            <label className="block mb-2 text-gray-600 font-medium">Name</label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-gray-600 font-medium">Email</label>
            <input
              type="email"
              className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded shadow-md"
            onClick={handleStartSurvey}
          >
            Start Survey
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-blue-600">{surveyData.title}</h2>
            <div className="text-red-600 font-bold text-lg">Time Left: {timer}s</div>
          </div>

          <div className="mb-8">
            <h3 className="font-semibold text-lg text-gray-800">
              {currentQuestionIndex + 1}. {surveyData.questions[currentQuestionIndex].text}
            </h3>
            {surveyData.questions[currentQuestionIndex].type === "multiple-choice" && (
              <ul className="list-disc ml-8 mt-4">
                {surveyData.questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <li key={index} className="mt-2 text-gray-700">{option}</li>
                  )
                )}
              </ul>
            )}
            {surveyData.questions[currentQuestionIndex].type === "rating" && (
              <div className="mt-4">
                {[...Array(10).keys()].map((num) => (
                  <span
                    key={num}
                    className="inline-block bg-gray-200 text-gray-700 px-3 py-2 mx-1 rounded-full shadow-sm cursor-pointer hover:bg-blue-100"
                  >
                    {num + 1}
                  </span>
                ))}
              </div>
            )}
            {surveyData.questions[currentQuestionIndex].type === "text" && (
              <div className="mt-4">
                <input
                  type="text"
                  className="border border-gray-300 rounded w-full px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                  placeholder="Your Answer"
                />
              </div>
            )}
          </div>

          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-2 rounded shadow-md"
            onClick={handleNextQuestion}
          >
            {currentQuestionIndex < surveyData.questions.length - 1
              ? "Next Question"
              : "Submit"}
          </button>
        </div>
      )}
    </div>
  );
}

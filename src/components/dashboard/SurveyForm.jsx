import { useState } from "react";

export default function SurveyForm({ onClose, onAddSurvey }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = (type) => {
    if (questions.length >= 25) {
      alert("You can only add up to 25 questions");
      return;
    }

    const newQuestion = { id: Date.now(), type, text: "", options: [] };
    setQuestions([...questions, newQuestion]);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.push("");
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (index, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options.splice(optionIndex, 1);
    setQuestions(updatedQuestions);
  };

  const handleSaveSurvey = () => {
    if (!title || questions.length === 0) {
      alert("Survey must have a title and at least one question.");
      return;
    }

    const newSurvey = {
      id: Date.now(),
      title,
      description,
      dueDate,
      status: "draft",
      respondents: 0,
      completionRate: 0,
      questions,
    };

    onAddSurvey(newSurvey);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Create New Survey</h2>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
            placeholder="Survey Title"
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
            placeholder="Survey Description"
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full px-4 py-2 border rounded mb-4"
          />
        </div>
        <div className="mb-4">
          <h3 className="font-bold">Questions</h3>
          {questions.map((question, index) => (
            <div key={question.id} className="mb-4 border p-4 rounded">
              <input
                type="text"
                value={question.text}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className="w-full px-4 py-2 border rounded mb-2"
                placeholder="Question text"
              />
              {question.type === "multiple-choice" && (
                <div className="mb-2">
                  <label className="block mb-1 font-medium">Options:</label>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center mb-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, optionIndex, e.target.value)
                        }
                        className="w-full px-4 py-2 border rounded mr-2"
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(index, optionIndex)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddOption(index)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded mt-2"
                  >
                    Add Option
                  </button>
                </div>
              )}
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove Question
              </button>
            </div>
          ))}
          <div className="flex space-x-2 mb-4">
            <button
              type="button"
              onClick={() => handleAddQuestion("multiple-choice")}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Add Multiple Choice Question
            </button>
            <button
              type="button"
              onClick={() => handleAddQuestion("rating")}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Add Rating Question
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSaveSurvey}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Save Survey
          </button>
        </div>
      </div>
    </div>
  );
}

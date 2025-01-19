import { useParams } from 'react-router-dom';

export default function SurveyDetailPage() {
  const { id } = useParams();
  const surveys = JSON.parse(localStorage.getItem('surveys')) || [];
  const survey = surveys[id];

  return (
    <div className="container mx-auto px-4 py-8">
      {survey ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{survey.title}</h2>
          <p>{survey.description}</p>
          <h3 className="font-bold mt-4">Questions</h3>
          {survey.questions.map((question, index) => (
            <div key={question.id} className="mb-4">
              <p><strong>{index + 1}. {question.text}</strong></p>
              {question.type === 'multiple-choice' && (
                <ul>
                  {question.options.map((option, i) => (
                    <li key={i}>{option}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </>
      ) : (
        <p>Survey not found.</p>
      )}
    </div>
  );
}

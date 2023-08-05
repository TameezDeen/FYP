  import React, { useState } from "react";
  import "./questionnairecard.css";

  const QuestionnaireCard = ({ data }) => {
    const [selectedValues, setSelectedValues] = useState({});

    //Function to handle the radio button selection
    const handleSelectValue = (questionId, value) => {
      setSelectedValues((prevSelectedValues) => ({
        ...prevSelectedValues,
        [questionId]: value,
      }));
    };

    return (
      <div className="questionnaire-card-container">
        {data.map((item) => (
          <div className="card" key={item.id}>
            <p>{item.question}</p>
            <div className="radio-buttons">
              {[1, 2, 3, 4, 5].map((value) => (
                <label key={value}>
                  <input
                    type="radio"
                    name={item.id}
                    value={value}
                    checked={selectedValues[item.id] === value}
                    onChange={() => handleSelectValue(item.id, value)}
                  />
                  {value}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  export default QuestionnaireCard;

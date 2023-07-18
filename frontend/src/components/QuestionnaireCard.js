import React from 'react'
import "./questionnairecard.css"

const QuestionnaireCard = ({ data }) => {
  return (
    
    <div className='questionnaire-card-container'>
        {data.map (item =>(
            <div className="card" key={item.id}>
                <p>{item.question}</p>
            </div>
        ))}
    </div>
  )
}


export default QuestionnaireCard
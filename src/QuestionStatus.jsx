import React from 'react';


const QuestionStatus = ({ questions, selectedOptions }) => {




  const renderStatus = () => {

    return questions.map((ques, index) => (
      <div
        key={index}
      >
        <div className={`${selectedOptions[index] ? 'attempted' : 'non-attempted'}`}>
          <h6 style={{ marginTop: "50%", transform: "translateY(-50%)" }}>{index + 1}</h6>
        </div>
      </div>
    ));

  };

  return (
    <>

      <div className="col-md-3">
        <div className="question-status-container">
          {renderStatus()}
        </div>
      </div>
    </>
  );
};

export default QuestionStatus;

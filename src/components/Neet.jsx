import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAnswer, saveAnswers } from "../store/neetSlice" // Update the path accordingly
import QuestionStatus from '../QuestionStatus';
export const Neet = ({ setActiveTab }) => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.neet.questions);

  // Pagination state
  const itemsPerPage = 1; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState(Array(questions.length).fill(null));

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentQuestions = questions.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate the total number of pages
  const totalPages = Math.ceil(questions.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleOptionChange = (questionIndex, optionIndex) => {
    // Handle the change of the selected option
    const selectedOption = currentQuestions[0].options[optionIndex];

    // Update selected options state
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[questionIndex + indexOfFirstItem] = selectedOption;
    setSelectedOptions(newSelectedOptions);

    // Dispatch the selectAnswer action to update the Redux store
    dispatch(selectAnswer({ questionIndex: questionIndex + indexOfFirstItem, selectedOption }));
  };

  const handleSave = () => {
    // Dispatch the saveAnswers action to save the selected answers
    dispatch(saveAnswers());
    alert('Answers submitted!');
  };

  const handleLogOut = () => {
    setActiveTab('');
  };

  const maxVisibleButtons = 10;

  const renderPageNumbers = () => {
    const startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    return Array.from({ length: endPage - startPage + 1 }).map((_, index) => (
      <button
        key={startPage + index}
        onClick={() => handlePageChange(startPage + index)}
        className={`page-number ${currentPage === startPage + index ? 'active' : ''}`}
        style={{
          color: currentPage === startPage + index ? 'red' : 'black',
          fontWeight: currentPage === startPage + index ? 'bold' : '',
          backgroundColor: currentPage === startPage + index ? 'white' : '',
        }}
      >
        {startPage + index}
      </button>
    ));
  };

  return (
    <>
      <div className="neet-heading">
        <h1>NEET Tauseef Akhtar</h1>
        <div>
          <button onClick={handleLogOut}>Logout</button>
        </div>
      </div>
      <div className='row'>

        <div className="neet-container col-md-9">
          {currentQuestions.map((ques, i) => (
            <div key={i} className="question-container">
              <p><span>{ques.id}: </span>{ques.question}</p>
              <ul className="options-list">
                {ques.options.map((option, j) => (
                  <li key={j}>
                    <input
                      type="radio"
                      id={`option_${i}_${j}`}
                      name={`question_${i}`} // Grouping by using the same name for all options in the same question
                      onChange={() => handleOptionChange(i, j)}
                      checked={selectedOptions[i + indexOfFirstItem] === option}
                    />
                    <label htmlFor={`option_${i}_${j}`}>{option}</label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pagination d-flex justify-content-center m-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={indexOfLastItem >= questions.length}
            >
              Next
            </button>
          </div>
          <button onClick={handleSave} disabled={!selectedOptions.some(option => option !== null)}>
            Save
          </button>

        </div>

        <QuestionStatus questions={questions} selectedOptions={selectedOptions} />

      </div>
    </>
  );
};

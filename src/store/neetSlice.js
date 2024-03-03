// neetSlice.js
import { createSlice } from "@reduxjs/toolkit";
import questions from "../assets/questions";

const neetSlice = createSlice({
  name: 'neet',
  initialState: {
    questions: questions,
    // Add any other properties you might need in the state
  },
  reducers: {
    // Add other reducer functions as needed
    selectAnswer: (state, action) => {
      // Update the selected answer for a specific question
      const { questionIndex, selectedOption } = action.payload;
      state.questions[questionIndex].selectedOption = selectedOption;
    },
    saveAnswers: (state) => {
      // Save the selected answers or perform any other logic
      // For example, you can store them in a separate array or API call
      // Modify this function according to your application's requirements
      console.log("Selected answers:", state.questions.map(q => q.selectedOption));
    },
    // Add more reducer functions as needed
  }
});

export const { selectAnswer, saveAnswers } = neetSlice.actions;

export default neetSlice;

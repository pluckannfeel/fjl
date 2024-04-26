export const modifyRequiredQuestions = (questions: any[]): any[] => {
  if (questions.length > 3) {
    // Remove the 4th item (index 3)
    questions.splice(3, 1);

    // Update the IDs of the subsequent questions
    for (let i = 3; i < questions.length; i++) {
      questions[i].id = String(i + 1);
    }
  }
  return questions;
};

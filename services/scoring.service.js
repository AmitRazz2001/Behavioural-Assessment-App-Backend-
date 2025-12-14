const assessment = require("../data/assessment.definition");

exports.calculateScores = (answers) => {
  const answerMap = {};
  answers.forEach(a => {
    if (a.value < 1 || a.value > 5) {
      throw new Error("Answer out of range! Please answer in range of 1 to 5 only");
    }
    answerMap[a.itemId] = a.value;
  });

  const scores = {};
  // Loop on Every Dimension (openness, conscientiousness, extraversion.)   
  for (const [dimension, items] of Object.entries(
    assessment.dimensions
  )) {
    const values = items
      .map(id => answerMap[id])
      .filter(v => v !== undefined);

    if (values.length) {
      scores[dimension] =
        values.reduce((a, b) => a + b, 0) / values.length;
    }
  }

  return scores;
};

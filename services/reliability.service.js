exports.checkReliability = (answers) => {
  const values = answers.map(a => a.value);  // Extract All Answer's values

  const allSame = values.every(v => v === values[0]);  // Checking low effort response

  const extremeRatio =
    values.filter(v => v === 1 || v === 5).length / values.length; // Checking extreme answers

  const tooManyMissing = answers.length < 4;  // Checking skipped answers

  return {
    usable: !(allSame || extremeRatio > 0.7 || tooManyMissing),  // If any fails response is not usable
    checks: {
      allSameAnswer: allSame,
      tooManyExtremes: extremeRatio > 0.7,
      tooManyMissing
    }
  };
};

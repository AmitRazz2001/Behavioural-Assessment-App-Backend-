function bucket(score) {
  if (score < 2.5) return "low";
  if (score < 4) return "medium";
  return "high";
}

exports.toPublicProfile = (data) => {
  const profile = {};
  for (const [k, v] of Object.entries(data.scores)) {
    profile[k] = bucket(v);
  }

  return {
    profile,
    reliability: data.reliability.usable
      ? "usable"
      : "questionable"
  };
};

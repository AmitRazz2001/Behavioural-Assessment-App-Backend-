exports.compare = (a, b) => {
  const similarities = [];      // Same dimensions profile
  const differences = [];       // Different in profile

  for (const dim in a.profile) {
    if (a.profile[dim] === b.profile[dim]) {
      similarities.push(dim);
    } else {
      differences.push({
        dimension: dim,
        userA: a.profile[dim],
        userB: b.profile[dim]
      });
    }
  }

  return { similarities, differences };
};

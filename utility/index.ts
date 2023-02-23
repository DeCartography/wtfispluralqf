export const connectionOrientedClusterMatch = (
  groups: number[][],
  contributions: number[]
): number => {
  // index of contributions
  const agents = Array.from(Array(contributions.length), (_, i) => i);

  // memberships[i] is the number of groups agent i is in
  const memberships = agents.map((agent) => {
    let count = 0;
    groups.forEach((group) => {
      if (group.includes(agent)) {
        count++;
      }
    });
    return count;
  });

  // friend_matrix[i][j] is the number of groups that agent i and j are both in
  const friedMatrix = agents.map((agent) => {
    const res = agents.map((agent2) => {
      let count = 0;
      groups.forEach((group) => {
        if (group.includes(agent) && group.includes(agent2)) {
          count++;
        }
      });
      return count;
    });
    return res;
  });

  // build up the funding amount. First, add in everyone's contributions
  const fundingAmount = contributions.reduce((sum, v) => (sum += v));

  const combinations: number[][][] = [];
  groups.map((group, i) => {
    groups.forEach((group2, j) => {
      if (group !== group2 && j > i) {
        combinations.push([group, group2]);
      }
    });
  });

  let sumOverAll = fundingAmount;

  combinations.forEach((p) => {
    let sumA = 0;
    p[0].forEach((i) => {
      let kVal = 0;

      let sum = 0;
      p[1].forEach((k) => {
        sum += friedMatrix[i][k];
      });
      if (sum > 0) {
        kVal = Math.sqrt(contributions[i]);
      } else {
        kVal = contributions[i];
      }

      sumA += kVal / memberships[i];
    });

    let sumB = 0;
    p[1].forEach((j) => {
      let kVal = 0;

      let sum = 0;
      p[0].forEach((k) => {
        sum += friedMatrix[j][k];
      });
      if (sum > 0) {
        kVal = Math.sqrt(contributions[j]);
      } else {
        kVal = contributions[j];
      }

      sumB += kVal / memberships[j];
    });

    sumOverAll += 2 * Math.sqrt(sumA) * Math.sqrt(sumB);
  });

  return sumOverAll;
};

// QF式を計算
export function calculateMatchedAmounts() {
  const matchingPool = parseFloat(document.getElementById('matchingPool').value) || 0;
  const contributions = Object.entries(donations).map(([node, amount]) => ({ node, amount }));
  let matchedAmounts = calculateMatchingFunds(matchingPool, clusters, contributions);

  // Calculate the total Matched Amounts
  let totalMatchedAmount = matchedAmounts.reduce((sum, {amount}) => sum + amount, 0);

  // Normalize the Matched Amounts so they don't exceed the Matching Pool
  matchedAmounts = matchedAmounts.map(({node, amount}) => ({
    node,
    amount: (amount / totalMatchedAmount) * matchingPool
  }));

  const tbody = document.getElementById('amountsTable').getElementsByTagName('tbody')[0];
  matchedAmounts.forEach(({ node, amount }, index) => {
    tbody.rows[index].cells[2].innerHTML = amount.toFixed(2);
  });

  updateLineChart();
  
  const matchedAmountsObj = {};

  matchedAmounts.forEach(({ node, amount }, index) => {
    tbody.rows[index].cells[2].innerHTML = amount.toFixed(2);
    matchedAmountsObj[node] = amount;
  });

  updateLineChart();
  
  return matchedAmountsObj;

}

  
// マッチングファンドを計算
export function calculateMatchingFunds(totalAmount, clusters, contributions) {
  const sqrt = Math.sqrt;
  let sqrtSums = {};
  clusters.forEach(cluster => {
      const sets = cluster['sets'].sort().toString();
      sqrtSums[sets] = sqrtSums[sets] || 0;
      cluster['nodes'].forEach(node => {
          const amount = contributions.find(con => con.node === node)?.amount || 0;  // 0をデフォルト値として設定
          sqrtSums[sets] += sqrt(amount);
      });
  });


  let matchingFunds = [];
  contributions.forEach(contribution => {
      const node = contribution.node;
      const amount = contribution.amount;
      const cluster = clusters.find(cluster => cluster.nodes.includes(node));
      const sets = cluster['sets'].sort().toString();
      const matchedAmount = sqrtSums[sets] !== 0 ? (sqrt(amount) / sqrtSums[sets]) * (totalAmount) : 0;  // sqrtSumsが0でない場合だけ計算
      matchingFunds.push({ node, amount: matchedAmount });
  });

  // Check if the total matched amounts exceed the total pool
  const totalMatched = matchingFunds.reduce((acc, val) => acc + val.amount, 0);
  if (totalMatched > totalAmount) {
      console.error("Total matched amounts exceed the total pool. Please check the logic.");
  }

  return matchingFunds;

}
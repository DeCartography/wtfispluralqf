// chartFunctions.js

import { Chart } from 'chart.js';

export let myLineChart;

export function initLineChart() {
  myLineChart = new Chart(document.getElementById("myLineChart").getContext("2d"), {
    type: 'line',
    data: {
      labels: Array.from({length: 101}, (_, i) => i),  // 0 to 100
      datasets: [{
        label: 'Matched amount',
        data: Array.from({length: 101}, () => 0),  // 最初は0
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
        pointRadius: Array.from({length: 101}, () => 0)  // 点の半径をゼロで初期化する
      }]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'X: Donation Amount (input by slider)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Y: Matched Amount'
          }
        }
      },
      plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const tableRow = document.getElementById('amountsTable').getElementsByTagName('tbody')[0].rows;
            let matchedAmount = null;
            for (let i = 0; i < tableRow.length; i++) {
              if (tableRow[i].cells[0].innerHTML === currentAgent) {
                matchedAmount = tableRow[i].cells[2].innerHTML;
                break;
              }
            }
            return `Matched Amount: ${matchedAmount}`;
          }
        }
      }
    }
    }
  });
}

export function updateLineChart() {
  const matchingPool = parseFloat(document.getElementById('matchingPool').value) || 0;  // Matching Poolを取得
  const otherDonations = {...donations};  // 現在の全エージェントの寄付額をコピー
  delete otherDonations[currentAgent];  // 操作中のエージェントの寄付額を削除
  const yData = [];

  for (let i = 0; i <= 100; i++) {
    otherDonations[currentAgent] = i;
    const contributions = Object.entries(otherDonations).map(([node, amount]) => ({ node, amount }));
    let matchedAmounts = calculateMatchingFunds(matchingPool, clusters, contributions);

    // total Matched Amountsを計算
    let totalMatchedAmount = matchedAmounts.reduce((sum, {amount}) => sum + amount, 0);

    // マッチング・プールを超えないよう、マッチング額を正規化する。
    matchedAmounts = matchedAmounts.map(({node, amount}) => ({
      node,
      amount: (amount / totalMatchedAmount) * matchingPool
    }));

    const currentMatchedAmount = matchedAmounts.find(m => m.node === currentAgent).amount || 0;
    yData.push(currentMatchedAmount);
  }

    const currentDonation = donations[currentAgent] || 0;
  myLineChart.data.datasets[0].pointRadius = Array.from({length: 101}, (_, i) => i === currentDonation ? 5 : 0);

  // チャートのデータをアップデート
  myLineChart.data.datasets[0].data = yData;
  myLineChart.update();
}

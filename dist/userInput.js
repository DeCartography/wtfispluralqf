export let donations = {};
  // donationsの中には、各エージェントの寄付額の値が入る
  // `donations[0]`は、中身がintでargent0の寄付額が入っている
  // donations = {10, 20, 30}の場合は、argent0が10、argent1が20、argent2が30を寄付していることを意味する
export let initialized = false;

// 一番最初に各エージェントの寄付額が0であることを確定する
export function initializeDonations() {
  for (let i = 0; i <= 6; i++) {
      donations[`argent${i}`] = 0;
    }
  initialized = true;
}

// 各エージェントのボタンをクリックするとこの関数が発火する。押されたエージェントによってargentIdの値が変わる。argent0なら`argent0`という値が伝えられる。
export function showSlider(agentId) {
  if (currentAgent) {
    document.getElementById(currentAgent).classList.remove('selected');
  }

  currentAgent = agentId;
  document.getElementById(agentId).classList.add('selected');

  document.getElementById('slider-container').style.display = 'block';
  currentAgent = agentId;

  // まだ初期化されていない場合は寄付を初期化する
  if (!initialized) {
    initializeDonations();
  }

  const currentDonation = donations[agentId] || 0; // 寄付金額が設定されていない場合は0を使用する。
  document.getElementById('slider').value = currentDonation;
  document.getElementById('slidervalue').textContent = currentDonation;

  updateLineChart();
}

// スライダーが更新されたら、テーブルを更新・計算を実行・グラフを再度描画
export function updateDonationAndCalculate() {
  const sliderValue = parseFloat(document.getElementById('slider').value);
  document.getElementById('slidervalue').textContent = sliderValue;
  donations[currentAgent] = sliderValue;
  updateTable();
  calculateMatchedAmounts();
  updateLineChart();
  // showAgentInfo(agentId);
}


// テーブルを更新
export function updateTable() {
  const tbody = document.getElementById('amountsTable').getElementsByTagName('tbody')[0];
  tbody.innerHTML = '';

  for (const [agent, donation] of Object.entries(donations)) {
    const row = tbody.insertRow();
    row.insertCell(0).innerHTML = agent;
    row.insertCell(1).innerHTML = donation;
    row.insertCell(2).innerHTML = '';
    }
}

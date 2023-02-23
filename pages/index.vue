<script setup lang="ts">
import { Chart } from "chart.js/auto";
import { ref } from "vue";
import { connectionOrientedClusterMatch } from "~/utility/index";

const amountToDonate = ref(1000);
const rangeStyle = computed(() => {
  const filledRate = (amountToDonate.value / 5000) * 100;
  return {
    background: `linear-gradient(
        90deg,
        #548bf4 0%,
        #548bf4 ${filledRate.toFixed(0)}%,
        #f5f6f7 ${filledRate.toFixed(0)}%,
        #f5f6f7 100%
      )`,
  };
});

let chartData: number[] = [];
for (let i = 0; i < 100; i++) {
  chartData.push(
    connectionOrientedClusterMatch(
      [
        [0, 1, 2, 7, 8, 12, 13, 14, 15, 21, 22, 23],
        [2, 3, 6, 7, 8, 9, 14, 15, 16],
        [4, 5, 6, 8, 0, 10, 11, 15, 16, 17, 18, 19, 20, 24, 26, 27],
        [21, 28],
        [13, 14, 15, 16, 22, 23, 24, 25, 26, 28, 29, 30, 31, 32],
        [32, 33],
        [18, 27],
      ],
      [
        0,
        5900,
        0,
        0,
        3000 - i * 15,
        10,
        0,
        40,
        400,
        50,
        0,
        0,
        200,
        0,
        0,
        i * 15,
        0,
        0,
        540,
        0,
        0,
        0,
        0,
        1200,
        0,
        1000,
        0,
        2100,
        0,
        0,
        0,
        6200,
        0,
        0,
        0,
      ]
    )
  );
}

const totalAmountToBeDonated = computed(() => {
  return connectionOrientedClusterMatch(
    [
      [0, 1, 2, 7, 8, 12, 13, 14, 15, 21, 22, 23],
      [2, 3, 6, 7, 8, 9, 14, 15, 16],
      [4, 5, 6, 8, 0, 10, 11, 15, 16, 17, 18, 19, 20, 24, 26, 27],
      [21, 28],
      [13, 14, 15, 16, 22, 23, 24, 25, 26, 28, 29, 30, 31, 32],
      [32, 33],
      [18, 27],
    ],
    [
      0,
      50,
      0,
      0,
      200 - amountToDonate.value > 0 ? 200 - amountToDonate.value : 0,
      10,
      0,
      0,
      10,
      10,
      0,
      0,
      20,
      0,
      0,
      amountToDonate.value,
      0,
      0,
      40,
      0,
      0,
      0,
      0,
      0,
      0,
      10,
      0,
      10,
      0,
      0,
      0,
      120,
      0,
      0,
      0,
    ]
  ).toFixed(2);
});

onMounted(() => {
  setTimeout(() => {
    const x = document.getElementById("lineChart") as HTMLCanvasElement;
    if (!x) return;
    const chart = new Chart(x, {
      type: "line",
      data: {
        labels: new Array(chartData.length).fill(""),
        datasets: [
          {
            borderWidth: 4,
            label: "",
            data: chartData,
            borderColor: "#578FFF",
            backgroundColor: "##578FFF",
            fill: {
              target: "origin",
              above: "#F4F7FF",
            },
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
          },
        },
        elements: {
          point: {
            radius: 0,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
            position: "nearest",
            external: (context) => {
              // Tooltip Element
              const { chart, tooltip } = context;

              if (!chart || !chart.canvas || !chart.canvas.parentNode) return;

              let tooltipEl = chart.canvas.parentNode.querySelector("div");

              if (!tooltipEl) {
                tooltipEl = document.createElement("div");
                tooltipEl.style.background = "rgba(0, 0, 0, 0.7)";
                tooltipEl.style.borderRadius = "3px";
                tooltipEl.style.color = "white";
                tooltipEl.style.opacity = "1";
                tooltipEl.style.pointerEvents = "none";
                tooltipEl.style.position = "absolute";
                tooltipEl.style.transform = "translate(-50%, 0)";
                tooltipEl.style.transition = "all .1s ease";

                const table = document.createElement("table");
                table.style.margin = "0px";

                tooltipEl.appendChild(table);
                chart.canvas.parentNode.appendChild(tooltipEl);
              }

              // Hide if no tooltip
              if (tooltip.opacity === 0) {
                tooltipEl.style.opacity = "0";
                return;
              }

              // Set Text
              if (tooltip.body) {
                const titleLines = [`+$${amountToDonate.value}`];
                const bodyLines = ["Estimationed matched"];

                const tableHead = document.createElement("thead");

                titleLines.forEach((title) => {
                  const tr = document.createElement("tr");
                  tr.style.borderWidth = "0";

                  const th = document.createElement("th");
                  th.style.borderWidth = "0";
                  const text = document.createTextNode(title);

                  th.appendChild(text);
                  tr.appendChild(th);
                  tableHead.appendChild(tr);
                });

                const tableBody = document.createElement("tbody");
                bodyLines.forEach((body, i) => {
                  const colors = tooltip.labelColors[i];

                  const span = document.createElement("span");
                  span.style.background = colors.backgroundColor.toString();
                  span.style.borderColor = colors.borderColor.toString();
                  span.style.borderWidth = "2px";
                  span.style.marginRight = "10px";
                  span.style.height = "10px";
                  span.style.width = "10px";
                  span.style.display = "inline-block";

                  const tr = document.createElement("tr");
                  tr.style.backgroundColor = "inherit";
                  tr.style.borderWidth = "0";

                  const td = document.createElement("td");
                  td.style.borderWidth = "0";
                  td.style.padding = "16px";

                  const text = document.createTextNode(body.toString());

                  td.appendChild(span);
                  td.appendChild(text);
                  tr.appendChild(td);
                  tableBody.appendChild(tr);
                });

                const tableRoot = tooltipEl.querySelector("table");

                // Remove old children
                while (tableRoot?.firstChild) {
                  tableRoot.firstChild.remove();
                }

                // Add new children
                tableRoot?.appendChild(tableHead);
                tableRoot?.appendChild(tableBody);
              }

              const { offsetLeft: positionX, offsetTop: positionY } =
                chart.canvas;

              // Display, position, and set styles for font
              tooltipEl.style.opacity = "1";
              tooltipEl.style.left = positionX + tooltip.caretX + "px";
              tooltipEl.style.top = positionY + tooltip.caretY + "px";
              tooltipEl.style.font = tooltip.options.bodyFont.toString();
              tooltipEl.style.padding =
                tooltip.options.padding +
                "px " +
                tooltip.options.padding +
                "px";
            },
          },
        },
      },
    });
  }, 2000);
});
</script>
<template>
  <div>
    <div class="h-screen relative w-full overflow-x-hidden">
      <img
        class="md:w-full w-auto h-full max-w-none"
        src="@/assets/images/social-graph-abstract-trimmed.png"
      />
      <div class="absolute inset-x-0 bottom-20 text-white w-full text-center">
        <p class="font-bold text-5xl mb-6">
          Social Graph<br />
          for era of plurality
        </p>
        <p class="max-w-lg mb-6 mx-auto">
          <span class="font-bold">DeCartography</span> is Social Graph tool for
          governance. fully decentralized, clustering by wisdom of crowds, based
          on wallet transaction
        </p>
        <p>
          Read more about DeCartography
          <img class="inline-block" src="@/assets/images/drop-down-icon.svg" />
        </p>
      </div>
    </div>

    <div
      class="flex flex-wrap-reverse py-16 md:py-64 px-8 md:px-32"
      style="background-color: #ebf1f9"
    >
      <div class="w-full md:w-1/2 md:pr-16">
        <p class="text-3xl mb-8">
          <span class="font-bold">Plurality</span> is comming:<br />
          Fluently decntrized social graph
        </p>
        <p class="mb-10">
          DeCartography provides a social graph by identifying based on wallet
          transactions, each SBTs. Clustering by a crowd, powered by assumption.
        </p>
        <p>
          <a
            class="underline"
            href="https://gov.gitcoin.co/t/how-soulbound-tokens-can-make-gitcoin-grants-more-pluralistic/10077"
          >
            https://gov.gitcoin.co/t/how-soulbound-tokens-can-make-gitcoin-grants-more-pluralistic/10077
          </a>
        </p>
      </div>
      <div class="w-full md:w-1/2 md:pl-16 mb-10 md:mb-0">
        <img
          src="@/assets/images/categorized_social_graph-removebg-preview.png"
          alt=""
        />
      </div>
    </div>

    <div class="py-20 px-8 md:px-32" style="background-color: #f6f9fc">
      <div class="text-center mb-10">
        <p class="font-bold text-3xl" style="color: #0f0857">
          Work to Earn, Compare each pair to Earn
        </p>
        <p class="font-bold text-2xl" style="color: #00d182">
          Just compare. you can Earn ETH in minute
        </p>
      </div>
      <img src="@/assets/images/worker-screen.jpg" />
    </div>

    <div class="py-24" style="background-color: #ebf1f9">
      <div class="text-center mb-28 md:mb-60 px-8">
        <p class="font-bold text-3xl" style="color: #0f0857">
          Recap: Gitcoin Grant Round 3(Result)
        </p>
        <p class="font-bold text-2xl mb-4" style="color: #00d182">
          Using a Quadratic Funding to distribute each grants
        </p>
        <p class="max-w-xl mx-auto">
          Gitcoin grant is the biggest grants distributor in ETH. They provided
          money, resource for public goods. distributed $270k via 1,982
          contributions
        </p>
        <img
          class="mt-16 mx-auto"
          src="@/assets/images/gitcoins-q3-match.png"
        />
      </div>
      <div class="flex flex-wrap px-8 md:px-28">
        <div class="w-full md:w-1/2 md:pr-8 md:mb-0 mb-10">
          <p class="text-3xl mb-12">more diversity</p>
          <p>
            Gitcoin Grant Round(GR)
            3は、1,982のコントリビューターによって$270k分の資金が公共財に対して分配されました。
          </p>
          <p>
            右の画像は、GRのデータをグラフ化したものです。ネットワークの各ノードはユーザー（または助成金）であり、各エッジはそれらのノード間のトランザクションです。
          </p>
        </div>
        <img
          class="w-full md:w-1/2"
          src="@/assets/images/Social-Graph-from-GR3.gif"
        />
      </div>
    </div>

    <div class="py-10 mx-auto" style="background-color: #f6f9fc">
      <div class="text-center">
        <p class="font-bold text-3xl" style="color: #0f0857">
          Social Graph for user who donated each project
        </p>
        <p class="font-bold text-2xl" style="color: #00d182">
          conecting wallet among donated same project
        </p>
      </div>
      <div
        class="grid md:grid-cols-2 md:grid-rows-2 px-8 md:px-32 py-20 md:py-4 mt-8 gap-12 justify-items-center"
      >
        <div class="max-w-lg">
          <img
            class="mb-5"
            src="@/assets/images/donated_StarkDeFi_onGR15.png"
          />
          <div class="flex justify-between items-center pb-2 border-b">
            <p>
              <img class="inline-block" src="@/assets/images/startkdefi.png" />
              <span class="ml-1">0x1e...8683</span>
            </p>
            <p class="flex items-center">
              <img
                class="inline-block h-6 w-6"
                src="@/assets/images/menu.svg"
              />
              <span class="mx-2">0.01</span>
              <img
                class="inline-block h-6 w-6"
                src="@/assets/images/open-in-new.svg"
              />
            </p>
          </div>
        </div>
        <div class="max-w-lg">
          <img class="mb-5" src="@/assets/images/donated_Phi_onGR15.png" />
          <div class="flex justify-between items-center pb-2 border-b">
            <p>
              <img class="inline-block" src="@/assets/images/phi.png" />
              <span class="ml-1">0x1e...8683</span>
            </p>
            <p class="flex items-center">
              <img
                class="inline-block h-6 w-6"
                src="@/assets/images/menu.svg"
              />
              <span class="mx-2">30</span>
              <img
                class="inline-block h-6 w-6"
                src="@/assets/images/open-in-new.svg"
              />
            </p>
          </div>
        </div>
        <div class="max-w-lg">
          <img class="mb-5" src="@/assets/images/donated_Phi_onGR15.png" />
          <div class="flex justify-between items-center pb-2 border-b">
            <p>
              <img class="inline-block" src="@/assets/images/phi.png" />
              <span class="ml-1">0x1e...8683</span>
            </p>
            <p class="flex items-center">
              <img
                class="inline-block h-6 w-6"
                src="@/assets/images/menu.svg"
              />
              <span class="mx-2">30</span>
              <img
                class="inline-block h-6 w-6"
                src="@/assets/images/open-in-new.svg"
              />
            </p>
          </div>
        </div>
        <div class="max-w-lg">
          <img
            class="mb-5"
            src="@/assets/images/donated_StarkDeFi_onGR15.png"
          />
          <div class="flex justify-between items-center pb-2 border-b">
            <p>
              <img class="inline-block" src="@/assets/images/startkdefi.png" />
              <span class="ml-1">0x1e...8683</span>
            </p>
            <p class="flex items-center">
              <img
                class="inline-block h-6 w-6"
                src="@/assets/images/menu.svg"
              />
              <span class="mx-2">0.01</span>
              <img
                class="inline-block h-6 w-6"
                src="@/assets/images/open-in-new.svg"
              />
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="px-8 md:px-32 py-20 md:py-40" style="background-color: #ebf1f9">
      <div class="flex flex-wrap mb-16">
        <div class="w-full md:w-1/2 md:pr-8 md:mb-0 mb-10">
          <p class="text-3xl mb-12">more diversity</p>
          <p>
            Submitting zkp proof data without running zkp verifications on-chain
            enables optimistic commitment with no possibility of malicious
            activities. This can safely shorten the 7-day waiting period of
            Optimistic Rollups to just a few hours. It also safely allows a
            longer commitment interval in a zkRollup.
          </p>
        </div>
        <iframe
          class="w-full md:w-1/2 md:pl-8"
          height="400"
          src="https://twitframe.com/show?url=https://twitter.com/VitalikButerin/status/1580313964067508224"
        ></iframe>
      </div>
      <div class="flex flex-wrap">
        <div class="w-full md:w-1/2 md:pr-8 md:mb-0 mb-10 mt-10 md:mt-0">
          <p class="text-3xl mb-12">Pairwise coordination subsidies</p>
          <p>
            Submitting zkp proof data without running zkp verifications on-chain
            enables optimistic commitment with no possibility of malicious
            activities. This can safely shorten the 7-day waiting period of
            Optimistic Rollups to just a few hours. It also safely allows a
            longer commitment interval in a zkRollup.
          </p>
        </div>
        <img
          class="w-full md:w-1/2 md:pl-8"
          src="@/assets/images/coordination.png"
        />
      </div>
    </div>

    <div class="px-8 md:px-16 py-12 md:py-36" style="background-color: #f6f9fc">
      <div class="bg-white py-12 mx-auto px-8">
        <p class="font-bold text-3xl text-center mb-12" style="color: #53565c">
          donate power calculator
        </p>
        <div class="w-full max-w-6xl mx-auto">
          <div class="mb-4 bg-gray-100 rounded p-8">
            <p class="text-gray-600 font-semibold">Sample 1</p>
            <div class="flex flex-wrap justify-center items-center">
              <img
                class="w-full md:w-1/2"
                src="@/assets/images/categorized_social_graph-removebg-preview.png"
              />
              <div class="md:pl-16 mt-6 w-full md:w-1/2">
                <p class="text-4xl font-semibold mb-4">0xF60fB....90331</p>
                <p class="text-gray-500 mb-3">Tagged by crowds</p>
                <p class="text-2xl font-semibold text-gray-700 mb-4">
                  Blockchain, IPFS, Open Source
                </p>
                <div class="flex justify-between border-b pb-1 mb-2">
                  <div>
                    <img
                      class="inline-block"
                      src="@/assets/images/0x1e8683.png"
                    />
                    <span class="ml-2">0xaC...D394</span>
                  </div>
                  <div class="flex items-center">
                    <img
                      class="inline-block h-6 w-6 text-gray-200"
                      src="@/assets/images/menu.svg"
                    />
                    <span class="ml-0.5 mr-4">30</span>
                    <img
                      class="inline-block h-5 w-5"
                      src="@/assets/images/open-in-new.svg"
                    />
                  </div>
                </div>
                <div class="flex justify-between border-b pb-1">
                  <div>
                    <img
                      class="inline-block"
                      src="@/assets/images/0xaCD394.png"
                    />
                    <span class="ml-2">0xaC...D394</span>
                  </div>
                  <div class="flex items-center">
                    <img
                      class="inline-block h-6 w-6 text-gray-200"
                      src="@/assets/images/menu.svg"
                    />
                    <span class="ml-0.5 mr-4">0.01</span>
                    <img
                      class="inline-block h-5 w-5"
                      src="@/assets/images/open-in-new.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="text-gray-400 mb-4">Amount, Donate</p>
          <p class="text-xl">${{ amountToDonate }}</p>
          <div class="relative w-full my-6">
            <span class="w-full h-2 rounded-sm block" :style="rangeStyle" />
            <input
              type="range"
              v-model.number="amountToDonate"
              min="1"
              max="5000"
              step="1"
              class="w-full bg-transparent absolute -top-[4px]"
            />
          </div>
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/2 mb-10 md:mb-0 px-0 md:px-10">
              <canvas id="lineChart" />
              <p class="font-semibold text-gray-600">Number of Deviation</p>
              <p class="text-gray-500">
                Pairwise Quadratic Funding with DeCartography encourages support
                for projects that are supported by the broader community.The
                lower the Number of Deviation, the higher matching amount.
              </p>
            </div>
            <div
              class="w-full md:w-1/2 bg-gray-100 border rounded-lg my-2 md:my-7 py-7 px-10"
            >
              <table class="w-full" style="color: #96999e">
                <tr>
                  <th class="text-left font-normal pb-3">Donate</th>
                  <td class="text-right">$ {{ amountToDonate }}</td>
                </tr>
                <tr>
                  <th class="text-left font-normal pb-3">
                    Number of Deviation
                  </th>
                  <td class="text-right">0.4</td>
                </tr>
                <tr>
                  <th class="text-left font-normal pb-3">Humanity</th>
                  <td class="text-right">110%</td>
                </tr>
                <tr>
                  <th class="pb-4 text-left font-normal3">Boost (%)</th>
                  <td class="pb-4 text-right">200%</td>
                </tr>
                <tr class="border-t border-gray-300">
                  <th class="pt-4 text-left">Total amount project will get</th>
                  <td class="pt-4 text-right">${{ totalAmountToBeDonated }}</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="h-screen flex justify-center items-center px-0 md:px-24 py-64"
      style="background-color: #0c0331"
    >
      <div>
        <img src="@/assets/images/Regenerative-Society.png" alt="" />
      </div>
    </div>
  </div>
</template>
<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  width: 100%;
}
input[type="range"]:focus {
  outline: none;
}
input[type="range"]::-webkit-slider-thumb {
  box-shadow: 1px 1px 1px #e6e6e6;
  border: 4px solid white;
  height: 20px;
  width: 24px;
  border-radius: 10px;
  background: #578fff;
  cursor: pointer;
  -webkit-appearance: none;
}
input[type="range"]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #e6e6e6;
  border: 4px solid white;
  height: 20px;
  width: 24px;
  border-radius: 10px;
  background: #578fff;
  cursor: pointer;
}
input[type="range"]::-ms-thumb {
  box-shadow: 1px 1px 1px #e6e6e6;
  border: 4px solid white;
  height: 20px;
  width: 24px;
  border-radius: 10px;
  background: #578fff;
  cursor: pointer;
}
</style>

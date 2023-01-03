<script setup lang="ts">
import { ref } from "vue";

const amountToDonate = ref(10);
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
        <div class="w-full md:w-1/2 md:mb-0 mb-10">
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
          <div class="mb-4"><!--Social Graph HERE--></div>
          <p class="text-gray-400 mb-4">Amount, Donate</p>
          <p class="text-xl">${{ amountToDonate }}</p>
          <input
            type="range"
            v-model="amountToDonate"
            min="1"
            max="10000"
            step="1"
            class="w-full my-6"
          />
          <div class="flex flex-wrap">
            <div class="w-full md:w-1/2 mb-10 md:mb-0 px-10">
              <p class="font-semibold text-gray-600">Number of Deviation</p>
              <p class="text-gray-500">
                Pairwise Quadratic Funding with DeCartography encourages support
                for projects that are supported by the broader community.The
                lower the Number of Deviation, the higher matching amount.
              </p>
            </div>
            <div
              class="w-full md:w-1/2 bg-gray-100 border rounded-lg py-7 px-10"
            >
              <table class="w-full">
                <tr>
                  <th class="text-left font-normal">Donate</th>
                  <td class="text-right">$ {{ amountToDonate }}</td>
                </tr>
                <tr>
                  <th class="text-left font-normal">Number of Deviation</th>
                  <td class="text-right">0.4</td>
                </tr>
                <tr>
                  <th class="text-left font-normal">Humanity</th>
                  <td class="text-right">110%</td>
                </tr>
                <tr>
                  <th class="pb-4 text-left font-normal">Boost (%)</th>
                  <td class="pb-4 text-right">200%</td>
                </tr>
                <tr class="border-t border-gray-300">
                  <th class="pt-4 text-left">Total amount project will get</th>
                  <td class="pt-4 text-right">$20</td>
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

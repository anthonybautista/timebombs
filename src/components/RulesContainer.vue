<template>
  <div id="cc" class="q-pa-none q-mt-xl q-mb-none flex justify-center rounded-borders q-mx-auto shadow-5">
    <q-banner rounded class="bg-accent text-white q-px-none q-mx-none" id="banner">
      <div id="gameBanner" class="text-center q-mx-auto">
        <img src="@/assets/logo-large.png" id="logo" class="q-mx-auto"/>
        <p class="full">
          Timebombs is a game of strategy and luck. NFTs are used as "timebombs" that are set to explode after a certain amount of time.
        </p>
        <p class="full">
          Reset your bomb before the timer runs out for a chance at remaining in the game. The last active bombs win!
        </p>
        <q-separator class="full" size="3px"/>
        <p class="full ruleHeader q-pt-sm">
          Game Dashboard
        </p>
        <p class="full">
          You will first be prompted to enter a Game ID. Once you select a game, you will be taken to the dashboard.
        </p>
        <img src="@/assets/started.png" class="ruleImg q-mx-auto"/>
        <p class="ruleText text-left q-pl-sm">
          Displays countdown to game start.
        </p>
        <img src="@/assets/bombs-left.png" class="ruleImg q-mx-auto"/>
        <p class="ruleText text-left q-pl-sm">
          Displays # active bombs remaining in game.
        </p>
        <img src="@/assets/active-bombs.png" class="ruleImg q-mx-auto"/>
        <p class="ruleText text-left q-pl-sm">
          Active bomb IDs. Click them for info.
        </p>
        <img src="@/assets/bomb-number.png" class="ruleImg q-mx-auto"/>
        <p class="ruleText text-left q-pl-sm">
          Selected Active Bomb.
        </p>
        <img src="@/assets/bomb-timer.png" class="ruleImg q-mx-auto"/>
        <p class="ruleText text-left q-pl-sm">
          Time left on selected bomb.
        </p>
        <p class="full q-mt-sm q-mb-none">
          When there are 3 or less active bombs remaining and you have at least one of them, you can halt the game.
        </p>
        <img src="@/assets/halt-game.png" class="full q-mx-auto q-mb-sm"/>
        <q-separator class="full" size="3px"/>
        <p class="full ruleHeader q-pt-sm">
          Your Bombs
        </p>
        <p class="full">
          Each game uses a specific NFT collection. If you have any NFTs from the specified collection they will show up
          underneath the game dashboard.
        </p>
        <p class="full">
          Your bombs will have a different button depending on the game state.
        </p>
        <img src="@/assets/activate.png" class="ruleImg q-mx-auto"/>
        <p class="ruleText text-left q-pl-sm">
          You can activate your bomb before the game starts.
        </p>
        <img src="@/assets/not-active.png" class="ruleImg q-mx-auto q-pt-sm"/>
        <p class="ruleText text-left q-pl-sm">
          If the game has already started and you did not activate the bomb.
        </p>
        <img src="@/assets/reset.png" class="ruleImg q-mx-auto"/>
        <p class="ruleText text-left q-pl-sm">
          Reset your bomb timer. There is a chance of accidental detonation!
        </p>
        <p class="full q-mb-sm">
          Your bomb timer shows how long until your bomb is automatically detonated!
        </p>
        <img src="@/assets/timer.png" class="full q-mx-auto q-mb-sm"/>
        <q-separator class="full" size="3px"/>
        <p class="full ruleHeader q-pt-sm">
          Creating a Game
        </p>
        <p class="full">
          Anyone can create a Timebomb game that uses any Avalanche NFT collection and can specify fees in AVAX or an ERC20 token.
        </p>
        <p class="full">
          Creating a game costs $BOMB tokens.
        </p>
      </div>
    </q-banner>
    <q-list bordered class="q-mx-none q-mt-sm bg-secondary" id="nft-exp">
      <q-expansion-item label="Create New Game" header-class="text-black text-right text-weight-bold" id="exp" expand-icon-class="text-black">
      <slot></slot>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: "RulesContainer",
  data: function() {
    return {
    }
  },

  props: {
  },

  computed: {
  },

  methods: {
  },

  watch: {
  },

  mounted: async function () {
  },
}
</script>

<style scoped>
#cc {
  width: 95%;
  max-width: 600px;
}
#banner {
  width: 100%;
}
#nft-exp {
  width: 100%;
}
#gameBanner {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-template-rows: auto;
  font-weight: bolder;
}
#exp {
  width: 100%;
  border-color: white;
}
#logo {
  width: 66%;
  grid-column: 1/4;
}
.full {
  grid-column: 1/4;
}
.ruleHeader {
  font-size: large;
  text-decoration: underline;
}
.ruleImg {
  width:100%;
  grid-column:1/2;
  max-width: 150px;
}
.ruleText {
  width:100%;
  grid-column:2/4;
}

@media screen and (min-width: 400px) {
  .ruleText {
    padding-top: 10px;
  }
}
</style>
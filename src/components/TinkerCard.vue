<template>
  <better-timer :timestamp="Date.now() + 86400000"></better-timer>
  <p class="text-negative q-ma-none">{{this.errorMessage}}</p>
  <div v-if="this.bomb.staked" class="q-mt-sm">
<!--    TODO check BOMB balance-->
    <p class="q-ma-none">Claimable $BOMB</p>
    <p class="q-ma-none">{{claimable}}</p>
  </div>
  <q-card-section class="q-pb-sm q-pt-sm">
    <q-btn class="bg-primary text-white" @click="tinker">Tinker</q-btn>
  </q-card-section>
  <q-card-section  v-if="this.bomb.staked" class="q-pt-none">
    <q-btn class="bg-primary text-white" @click="claim">Claim</q-btn>
  </q-card-section>
</template>

<script>
import BetterTimer from "@/components/BetterTimer";
//import Bomb from "@/models/bomb";
export default {
  name: "TinkerCard",
  components: {BetterTimer},
  data: function() {
    return {
      errorMessage: "",
      provider: null,
      info: [],
      claimable: 1000,
    }
  },

  props: {
    bomb: {
      type: Object,
      required: true,
    },
  },

  methods: {
    // TODO implement claim and tinker
    async claim() {
      this.errorMessage = "Claiming..."
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000)
    },

    async tinker() {
      this.errorMessage = "Trying to Tinker..."
      setTimeout(() => {
        this.errorMessage = null;
      }, 3000)
    },
  },

  watch: {
  },

  computed: {
    staked(){
      return this.bomb.staked;
    },
    timestamp(){
      return (Date.now() * 1000) + 86400000;
    },
  },

  mounted: async function () {
    //this.info = await Bomb.bombInfo(this.game.gameAddress, this.bomb.tokenId);
  },
}
</script>

<style>
.nft {
  height: 160px;
}

.bombCard {
  width: 160px;
}
</style>
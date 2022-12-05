<template>
  <timer :bomb-timestamp="timestamp" :active="active" :game="game"></timer>
  <p class="text-negative q-ma-none">{{this.errorMessage}}</p>
  <q-card-section v-if="!gameStarted && !active">
    <q-btn class="bg-primary text-white" @click="act">Activate</q-btn>
  </q-card-section>
  <q-card-section v-else-if="gameStarted && active">
    <q-btn class="bg-primary text-white" @click="reset">Reset Bomb</q-btn>
  </q-card-section>
  <q-card-section v-else-if="!gameStarted && active">
    <q-btn class="bg-primary text-white">Not Started</q-btn>
  </q-card-section>
  <q-card-section v-else>
    <q-btn class="bg-primary text-white">Not  Active</q-btn>
  </q-card-section>
</template>

<script>
import Timer from "@/components/Timer";
import Bomb from "@/models/bomb";
export default {
  name: "BombCard",
  components: {Timer},
  data: function() {
    return {
      gameStarted: Date.now() > this.game.startTime,
      errorMessage: "",
      provider: null,
      info: [],
    }
  },

  props: {
    bomb: {
      type: Object,
      required: true,
    },
    game: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async reset() {
      this.errorMessage = "Resetting Bomb..."
      try {
        this.errorMessage = await Bomb.resetBomb(this.game.gameAddress, this.bomb.tokenId);
        setTimeout(this.updateInfo, 30000);
      } catch (e) {
        this.errorMessage = e;
      }

    },

    async updateInfo() {
      this.info = await Bomb.bombInfo(this.game.gameAddress, this.bomb.tokenId);
      setTimeout(this.refreshBomb, 2000);
    },

    refreshBomb() {
      if (this.active && (this.timestamp + this.game.resetInterval) > Date.now()) {
        this.errorMessage = "Success!";
      } else {
        this.errorMessage = "BOOM!";
      }
    },

    async act() {
      this.errorMessage = "Activating Bomb..."
      this.errorMessage = await Bomb.activateBomb(this.game.gameAddress, this.bomb.tokenId);
      this.info = await Bomb.bombInfo(this.game.gameAddress, this.bomb.tokenId);

    },
  },

  watch: {
  },

  computed: {
    active(){
      return this.info[2];
    },
    timestamp(){
      return Number(this.info[1]) * 1000;
    },
  },

  mounted: async function () {
    this.info = await Bomb.bombInfo(this.game.gameAddress, this.bomb.tokenId);
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
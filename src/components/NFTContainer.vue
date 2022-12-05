<template>
  <div class="flex justify-center q-ma-l q-pa-md text-center bg-primary">
    <div v-if="nfts.length > 0" id="itemContainer" class="flex justify-center q-ma-l q-pa-md text-center bg-primary" :key="nfts">
      <slot></slot>
    </div>
    <div v-else>
      <div class="buffer q-mt-xl"></div>
      <p class="text-white">If NFTs don't load after a few seconds, click button.</p>
      <q-btn class="bg-accent text-white" @click="reload">Load NFTs</q-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "NFTContainer",
  data: function() {
    return {

    }
  },

  props: {
    nfts: {
      type: Array,
      required: true,
    },
  },

  computed: {
  },

  methods: {
    reload() {
      this.$emit('reload');
    },
  },

  watch: {
  },

  mounted: function () {
  },
}
</script>

<style scoped>
#itemContainer {
  width: 90%;
}
</style>
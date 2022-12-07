<template>
  <div id="cc" class="q-pb-sm q-mt-xl q-mb-none flex justify-center bg-accent rounded-borders q-mx-auto shadow-5">
    <img src="@/assets/villain.png" id="villain" class="q-mx-auto"/>
    <p id="lab" class="bg-secondary text-primary text-center q-mb-sm">The Lab</p>
    <q-banner rounded class="bg-accent text-white q-px-none q-mx-auto" id="banner">
      <p>The Lab is where villains tinker with their bombs. Tinkering allows villains to generate new
        $BOMB tokens, starting with 1,000 $BOMB after the first 24 hours. Villains who continue tinkering
        will see their claimable amount double every 24 hours until reaching a maximum 32,000 $BOMB!</p>
      <p>However, there's a catch! Each day villains must choose to continue tinkering, or claim their $BOMB tokens.
         Both of these options have a 20% chance of destroying all claimable $BOMB tokens! </p>
      <p>Tinkering costs 0.02 LINK. You must approve the token to tinker (button will appear if not approved).</p>
    </q-banner>
  </div>
  <slot name="token"></slot>
  <slot name="nfts"></slot>
</template>

<script>
export default {
  name: "LabContainer",
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
    width: 90%;
    margin: auto;
  }
  #villain {
    width: 250px;
    z-index: 2;
  }
  #lab {
    width:100%;
    font-size: large;
    position: relative;
    top: -23px;
    z-index: 1;
  }
</style>
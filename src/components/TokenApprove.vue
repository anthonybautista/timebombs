<template>
  <div v-if="approved" id="approvedToken" class="bg-accent text-white rounded-borders shadow-5 q-mx-auto q-mt-sm q-pa-sm">
    <div class="text-center">
      <p id="tokenLabel" class="q-pa-none q-ma-none">Your ${{token.name}}</p>
      <p id="tokenBalance" class="q-pa-none q-ma-none">{{balance}}</p>
    </div>
  </div>
  <div v-else id="notApprovedToken" class="bg-accent text-white rounded-borders shadow-5 q-mx-auto q-mt-sm q-pa-sm">
    <div id="notApprovedDiv" class="text-center">
      <p id="tokenLabel" class="q-pa-none q-ma-none">Your ${{token.name}}</p>
      <p id="tokenBalance" class="q-pa-none q-ma-none">{{balance}}</p>
    </div>
    <q-btn label="Approve" @click="approve" color="secondary"/>
  </div>
</template>

<script>
export default {
  name: "TokenApprove",
  data: function() {
    return {
    }
  },

  props: {
    balance: {
      type: Number,
      required: true,
    },
    token: {
      type: Object,
      required: true,
    },
    approved: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    //TODO implement approve function
    approve: function() {
      this.$emit('approve', this.token.address);
    }
  },

  watch: {
  },

  computed: {
  },

  mounted: async function () {
  },
}
</script>

<style>
#approvedToken {
  width: 150px;
}

#notApprovedToken {
  width: 300px;
  display: grid;
  grid-template-columns: 50% 50%;
}

#notApprovedToken p {
  grid-column: 1/2;
}

#notApprovedToken q-btn {
  grid-column: 2/3;
}

#notApprovedDiv {
  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: 100%;
}

#tokenLabel {
  grid-row: 1/2;
}

#tokenBalance {
  grid-row: 2/3;
}
</style>
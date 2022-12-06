<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="q-pl-xs">
        <q-toolbar-title>
          <img src="@/assets/logo-large.png" class="logo"/>
        </q-toolbar-title>
        <q-btn v-if="alias" class="bg-negative text-lowercase text-caption q-px-xs">{{this.alias}}</q-btn>
        <q-btn v-else @click="connect" class="bg-warning">
          Connect
        </q-btn>
      </q-toolbar>
    <div>
      <q-btn-toggle
          v-model="selected"
          spread
          no-caps
          toggle-color="accent"
          color="secondary"
          text-color="primary"
          :options="navTabs"
      ></q-btn-toggle>
    </div>
    </q-header>

    <div class="buffer q-mt-xl"></div>
    <div v-if="selected === 'dash'">
      <game-info-container v-if="game" :game="game" :key="game" :error="dashError" @halt-game="halt" @reset-game="resetGame">
        <template v-slot:dash>
          <dashboard :game="game" :bomb-timer="bombTimer" @get-bomb-info="bombInfo"></dashboard>
        </template>
        <template v-slot:nfts>
          <n-f-t-container :nfts="userGameBombs" :key="refreshController" @reload="reloadContainer">
            <n-f-t-card v-for="item in userGameBombs" :key="item.tokenId" :nft="item">
              <bomb-card :bomb="item" :game="game"></bomb-card>
            </n-f-t-card>
          </n-f-t-container>
        </template>
        <p class="text-white">text</p>
      </game-info-container>
      <div v-else class="q-pa-md q-mt-xl q-mb-none flex justify-center">
        <q-banner rounded class="bg-accent text-white">
          <div class="text-center">
            <q-input class="q-ma-sm bg-secondary q-pa-none rounded-borders"
                     type="number"
                     filled
                     label="Enter Game ID"
                     lazy-rules
                     v-model="gameId"
                     :rules="[ val => val > 0 || 'Invalid Game ID']"
            ></q-input>
            <div class="q-mt-lg">
              <q-btn label="Enter" @click="setUpGame" color="primary"> </q-btn>
            </div>
          </div>
        </q-banner>
      </div>
    </div>

    <div v-else-if="selected==='faq'">
      <rules-container>
        <q-form @submit.prevent="createGame" class="q-gutter-md q-pb-sm">
          <q-input
              filled
              v-model="form.subAddress"
              label="VRF Subscription Address *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Must enter 0xAddress']"
          />
          <q-input
              filled
              type="number"
              v-model="form.subId"
              label="VRF Subscription Id *"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Please enter subscription Id',
                val => val > 0 || 'Please type a real sub Id'
              ]"
          />
          <q-input
              filled
              v-model="form.operator"
              label="Fee Address *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Must enter 0xAddress']"
          />
          <q-input
              filled
              v-model="form.nftAddress"
              label="NFT Address *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Must enter 0xAddress']"
          />
          <q-toggle v-model="form.useERC20" label="Use ERC20 for entry?" />
          <q-toggle v-model="form.feeERC20" label="Use ERC20 for fee?" />
          <q-input
              filled
              type="number"
              v-model="form.cost"
              label="Entry Cost *"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Please enter entry cost'
              ]"
          />
          <q-input
              filled
              type="number"
              v-model="form.fee"
              label="Operator Fee *"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Please enter operator fee'
              ]"
          />
          <q-input
              filled
              type="number"
              v-model="form.maxSupply"
              label="Max Entries *"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Please enter max entries',
                val => val > 1 || 'Must allow at least 2 entries'
              ]"
          />
          <q-input
              filled
              type="number"
              v-model="form.maxPerAddress"
              label="Max Entries Per Address *"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Please enter max entries',
                val => val > 0 || 'Must allow at least 1 entry'
              ]"
          />
          <q-input
              filled
              type="number"
              v-model="form.startTime"
              label="Start Time (Unix Timestamp) *"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Please enter start time',
                val => val > (Date.now() / 1000) || 'Start time must be in the future.'
              ]"
          />
          <q-input
              filled
              type="number"
              v-model="form.successPct"
              label="Success Percentage *"
              lazy-rules
              :rules="[
                val => val !== null && val !== '' || 'Please enter success percentage',
                val => val > 0 && val < 100 || 'Number must be between 1-99.'
              ]"
          />
          <div class="text-center">
            <p id="createError"></p>
            <q-btn label="Coming Soon" type="submit" color="primary"/>
          </div>
        </q-form>
      </rules-container>
    </div>

    <div v-else>
      <lab-container>
        <template v-slot:token>

        </template>
        <template v-slot:nfts>
          <n-f-t-container :nfts="userTimebombs" :key="refreshController" @reload="reloadContainer">
            <n-f-t-card v-for="item in userTimebombs" :key="item.tokenId" :nft="item" v-bind:style= "[item.staked ? 'outline: #631d76 solid 5px;' : 'outline: none;']">
              <tinker-card :bomb="item"></tinker-card>
            </n-f-t-card>
          </n-f-t-container>
        </template>
      </lab-container>
    </div>

    <div class="buffer-lg"></div>

    <q-footer class="bg-none text-white q-pt-sm">
      <q-page-sticky position="bottom-left" :offset="[18, 18]">
        <q-btn fab :icon="fabTwitter" color="accent" @click="gotoURL('https://twitter.com/timebombs_nft')"/>
      </q-page-sticky>
      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn fab :icon="fabDiscord" color="accent" @click="gotoURL('https://discord.gg/ybHwNXXH6v')"/>
      </q-page-sticky>
    </q-footer>
    <web3-modal-vue
        ref="web3modal"
        :theme="theme"
        :provider-options="providerOptions"
        cache-provider
    />
  </q-layout>
</template>

<script>
import { fabTwitter, fabDiscord } from '@quasar/extras/fontawesome-v6'
import Web3ModalVue from "web3modal-vue";
import WalletConnectProvider from "@walletconnect/web3-provider";
import {web3Modal} from "./config/mixins";
import {getFireContract} from "@/utils/contract";
import GameInfoContainer from "@/components/GameInfoContainer";
import Game from "@/models/game";
import Dashboard from "@/components/Dashboard";
import Bomb from "@/models/bomb";
import NFTContainer from "@/components/NFTContainer";
import axios from "axios";
import NFTCard from "@/components/NFTCard";
import BombCard from "@/components/BombCard";
import RulesContainer from "@/components/RulesContainer";
import LabContainer from "@/components/LabContainer";
import NFT from "@/models/nft";
import TinkerCard from "@/components/TinkerCard";

export default {
  name: 'LayoutDefault',

  setup () {
    return {
      fabTwitter,
      fabDiscord,
    }
  },

  components: {
    TinkerCard,
    LabContainer,
    RulesContainer,
    BombCard,
    NFTCard,
    NFTContainer,
    Dashboard,
    GameInfoContainer,
    Web3ModalVue,
  },

  mixins: [web3Modal],

  data(){
    return {
      theme: 'light',
      providerOptions: {
        walletconnect: {
          package: WalletConnectProvider,
          options: {
            rpc: {
              43113: "https://api.avax-test.network/ext/bc/C/rpc",
              43114: "https://api.avax.network/ext/bc/C/rpc",
            }
          }
        }
      },
      navTabs: [
        {label: 'How To Play', value: 'faq'},
        {label: 'Game Dashboard', value: 'dash'},
        {label: 'Timebombs Lab', value: 'bombs'},
      ],
      dashError: null,
      createError: null,
      selected: "faq",
      gameId: 0,
      game: null,
      alias: null,
      timebombs: "0x27669989A5F9d6a4643F6afa4e5b888ffB274292",
      userGameBombs: [new Bomb(999999,require("@/assets/no-bomb.png"))],
      userTimebombs: [new Bomb(999999,require("@/assets/no-bomb.png"))],
      bombTimer: null,
      refreshController: false,
      form: {
        subAddress: "",
        subId: 0,
        operator: "",
        nftAddress: "",
        useERC20: false,
        feeERC20: false,
        cost: 0,
        fee: 0,
        maxSupply: 100,
        maxPerAddress: 3,
        startTime: 1704002400,
        successPct: 80
      },
    }
  },

  methods: {
    gotoURL: function(url) {
      window.open(url);
    },
    connect: function() {
      this.$store.dispatch('connect');
    },
    getAlias: async function(account) {
      const contract = getFireContract();
      let fire = await contract.usernameFor(account);

      if (fire !== "") {
        return fire;
      } else {
        return "..."+ account.substring(34);
      }
    },
    reloadContainer: function() {
      this.refreshController = !this.refreshController;
    },
    setUpGame: async function() {
      // TODO setup gameId => address lookup
      let address = "0x38C1Acc7bb26CD108E4DA34eC8CD48D05e02271f";
      this.game = await Game.setUpGame(this.gameId, address)
      setTimeout(this.reloadContainer, 1000);
    },
    resetGame: function() {
      this.game = null;
    },
    getBombs: function(nftAddress, x = null) {
      const options = {
        method: 'GET',
        url: 'https://deep-index.moralis.io/api/v2/'+this.account+'/nft',
        params: {
          chain: '0xa869',
          format: 'decimal',
          token_addresses: nftAddress,
        },
        headers: {accept: 'application/json', 'X-API-Key': 'naggQZQHKX2aoWZNsi4ttLcGR0959aM4N93dYjrvmMDRujDY3c7ZBGhUP0Vjg1OU'}
      };
      /*const options = {
          method: 'GET',
          url: 'https://deep-index.moralis.io/api/v2/'+this.wallet.account+'/nft',
          params: {
              chain: '0xa86a',
              format: 'decimal',
              token_addresses: this.game.nftAddress,
          },
          headers: {accept: 'application/json', 'X-API-Key': 'naggQZQHKX2aoWZNsi4ttLcGR0959aM4N93dYjrvmMDRujDY3c7ZBGhUP0Vjg1OU'}
      };*/
      let bombs = [];
      axios.request(options).then(function (response) {
        if(response.data.total > 0) {
          response.data.result.forEach(async item => {
            let token = item.token_id;
            let uri = JSON.parse(item.metadata)["image"];
            if (uri.substring(0,4) === "ipfs") {
              uri = "https://gateway.pinata.cloud/ipfs/"+uri.substring(7);
            }
            if (x===1){
              //TODO add call to staking contract
              let staked = false;
              if(token%2 === 0){
                staked = true;
              }
              bombs.push(new NFT(token, uri, staked));
            } else {
              bombs.push(new Bomb(token, uri));
            }
          });
        } else {
          bombs.push(new Bomb(99999,require("@/assets/no-bomb.png"),0,false));
        }
      }).catch(function (error) {
        console.error(error);
      });
      if (x===1){
        this.userTimebombs = bombs;
      } else {
        this.userGameBombs = bombs;
      }
    },
    bombInfo: async function(bomb) {
      this.bombTimer = await Bomb.bombInfo(this.game.gameAddress, bomb);
    },
    halt: async function() {
      this.dashError = "Halting Game..."
      try {
        let winningBomb = 0;
        let foundWinner = false;
        let i = 0;
        while (i < this.userGameBombs.length && !foundWinner) {
          this.activeBombs.forEach(bomb => {
            if (Number(bomb) === Number(this.userGameBombs[i].tokenId)) {
              foundWinner = true;
              winningBomb = Number(this.userGameBombs[i].tokenId);
            }
          })
          i++;
        }
        if (winningBomb > 0) {
          //this.errorMessage = await Bomb.haltGame(this.game.gameAddress, winningBomb);
        } else {
          this.dashError = "You don't have a winning bomb!";
        }
      } catch (e) {
        this.dashError = "Error halting game.";
        console.log(e);
      }
      setTimeout(() => {
        this.dashError = null;
      }, 3000)
    },
  },


  // computed: values that are updated and cached if dependencies change
  computed: {
    account: function() {
        const {active, account} = this.web3Modal
        if (active) {
          return account;
        }
        return null;
    }
  },

  //mounted:  called after the instance has been mounted,
  mounted: async function () {
    this.$nextTick(async () => {
      const web3modal = this.$refs.web3modal;
      this.$store.commit('setWeb3Modal', web3modal)
      if (web3modal.cachedProvider) {
        await this.$store.dispatch('connect')
      }
    });
    const {active, account} = this.web3Modal
    if (active) {
      this.alias = await this.getAlias(account);
    }
  },

  // watch:   calls the function if the value changes
  // https://travishorn.com/add-localstorage-to-your-vue-app-in-2-lines-of-code-56eb2c9f371b
  watch: {
    account: {
      handler: async function(newAccount) {
        if (newAccount) {
          this.alias = await this.getAlias(newAccount);
          if (this.game) {
            await this.getBombs(this.game.nftAddress);
          }
          await this.getBombs(this.timebombs, 1);
        }
      },
    },
    game: {
      handler: async function(newAccount) {
        if (newAccount) {
          if (this.account) {
            await this.getBombs(this.game.nftAddress);
            await this.getBombs(this.timebombs, 1);
          }
        }
      },
    },
    selected: {
      handler: function(newSelection) {
        console.log(newSelection);
      },
      immediate: true,
    },
  },

}
</script>

<style>
body {
  background-color: black;
}

.logo {
  height: 40px;
}

.buffer {
  height: 5px;
}

.buffer-lg {
  height: 100px;
}

</style>
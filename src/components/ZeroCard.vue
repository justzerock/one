<template>
  <v-card
    class="mx-auto"
    light
    v-ripple="{ class: `${colors[colorIndex]}--text text--accent-4` }"
    hover
    @click="clickCard"
  >
    <v-card-text 
      class="subheading pt-5 pb-4 px-5" 
      style="width:inherit"
    >
      {{hitoContent}}
    </v-card-text>

    <v-card-actions class="text-xs-center">
      <v-layout row wrap>
        <v-chip color="primary" text-color="white">
          <v-avatar>
            <v-icon>account_circle</v-icon>
          </v-avatar>
          {{hitoFrom}}
        </v-chip>
        <v-chip color="secondary" text-color="white">
          <v-avatar class="secondary darken-1">
            <v-icon>star</v-icon>
          </v-avatar>
          {{hitoType}}
        </v-chip>
      </v-layout>
    </v-card-actions>

  </v-card>
</template>

<script>
import { clearTimeout, setTimeout } from 'timers';
let lastTime = 0
let clickTimer
export default {
  props: {
    hitoContent: {
      type: String,
      default: '凡人皆有一死。'
    },
    hitoFrom: {
      type: String,
      default: '无面者'
    },
    hitoType: {
      type: String,
      default: 'GOT'
    }
  },
  data () {
    return {
      colors: ['red','purple','light-blue','teal'],
      colorIndex: 0
    }
  },
  methods: {
    clickCard () {
      let date = new Date()
      let nowTime = date.getTime()
      if ( nowTime - lastTime < 400 ) {
        lastTime = 0
        clickTimer && clearTimeout(clickTimer) 
        console.log(this.$props.hitoContent)
      } else {
        lastTime = nowTime
        clickTimer = setTimeout(() => {
          let index = this.$data.colorIndex
          index < 3 ? index++ : index=0
          this.$data.colorIndex = index
          }, 400)
      }
    }
  }
}
</script>

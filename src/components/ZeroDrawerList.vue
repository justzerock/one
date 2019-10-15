<template>
  <div>
    <v-list>
      <v-list-tile avatar>
        <v-list-tile-content>
          <v-list-tile-title>
            {{zero}}
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-avatar>
          <img :src="require('../assets/logo.png')">
        </v-list-tile-avatar>
      </v-list-tile>
    </v-list>
    <v-list>
      <v-divider></v-divider>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="item.to"
        replace
      >
        <v-list-tile-action>
          <v-icon color="primary">{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title class="primary--text">
            {{ item.title }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>
      <v-list-tile>
        <v-switch
          v-model="switchColor"
          color="primary"
          value="primary"
        >
          <template v-slot:label>
            <strong style="padding-left:.5em" :class="[ switchColor ? 'primary--text' : '']">锁定: {{getTimeHex}}</strong>
          </template>
        </v-switch>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>

export default {
  data () {
    return {
      zero: 'Hitokoto',
      items: [
        { title: '亦言', icon: 'home', to: '/' },
        { title: '收藏', icon: 'favorite', to: '/favorite' },
        { title: '关于', icon: 'info', to: '/about' }
      ],
      switchColor: 'primary',
      color: ''
    }
  },
  computed: {
    getTimeHex () {
      return this.$vuetify.theme.primary
    },
    getPrimary () {
      return this.$store.state.primary
    }
  },
  watch: {
    switchColor: function () {
      let timer = !this.switchColor
      let primary = ''
      if (!timer) {
        primary = this.getTimeHex
      }
      this.$store.commit('setPrimary', primary)
      this.$store.commit('setHexTimer', timer)
    }
  },
  created () {
    if (this.getPrimary === '') {
      this.switchColor = ''
    }
  }
}
</script>

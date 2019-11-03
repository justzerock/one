<template>
  <div>
    <v-list>
      <v-list-tile avatar>
        <v-list-tile-content>
          <v-list-tile-title
            :style="{'color': getPrimary}"
          >
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
          <v-icon color="primary">{{ 'if if-' + item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title class="primary--text">
            {{ item.title }}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider></v-divider>

      <v-list-group
        :append-icon="cusAppendIcon"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">if if-set</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="primary--text">数据源</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile>
          <v-list-tile-content>
            <v-radio-group row
              hide-details
              v-model="dataOrigin"
              class="menu-radio-group">
              <v-radio :off-icon="radios.off" :on-icon="radios.on" color="primary" label="一言" value="hito"></v-radio>
              <v-radio :off-icon="radios.off" :on-icon="radios.on" color="primary" label="诗词" value="poem"></v-radio>
              <v-radio :off-icon="radios.off" :on-icon="radios.on" color="primary" label="随机" value="random"></v-radio>
            </v-radio-group>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>

      <v-list-group
        :append-icon="cusAppendIcon"
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="primary">if if-colors</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="primary--text">主题色</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile>
          <v-list-tile-content>
            <div
              class="cur-color-style"
              :style="[{ 'background': getPrimary }]"
            >{{getColorName}} · {{getPrimary}}</div>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          style="display:inline-flex;"
          v-for="(item, index) in colorList" :key="index">
          <v-list-tile-content>
            <span
              @click="setColor(item.name, item.color)"
              class="colors-style"
              :style="[{ 'background': item.color }]"
            >
              <v-icon
                color="white"
                class="sel-color"
                :style="{opacity: item.color === getPrimary ? 1 : 0}"
              >if if-check</v-icon>
            </span>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>

export default {
  data () {
    return {
      zero: '亦言',
      items: [
        { title: '主页', icon: 'home', to: '/' },
        { title: '收藏', icon: 'bookmark', to: '/favorite' },
        { title: '关于', icon: 'info', to: '/about' }
      ],
      dataOrigin: 'random',
      colorList: [
        { name: '檀', color: '#B36D61' },
        { name: '胭脂', color: '#9D2933' },
        { name: '海棠红', color: '#DB5A6B' },
        { name: '绛紫', color: '#8C4356' },
        { name: '紫酱', color: '#815463' },
        { name: '酱紫', color: '#815476' },
        { name: '赭色', color: '#955539' },
        { name: '黎', color: '#75664D' },
        { name: '黯', color: '#41555D' },
        { name: '黛绿', color: '#426666' },
        { name: '铜绿', color: '#549688' },
        { name: '藏青', color: '#2E4E7E' },
        { name: '靛蓝', color: '#065279' },
        { name: '靛青', color: '#177CB0' },
        { name: '群青', color: '#4C8DAE' },
        { name: '漆黑', color: '#161823' },
        { name: '玄青', color: '#3D3B4F' },
        { name: '鸦青', color: '#424C50' },
        { name: '黛蓝', color: '#425066' },
        { name: '墨灰', color: '#758A99' },
        { name: '苍青', color: '#7397AB' }
      ],
      colorName: '黯',
      cusAppendIcon: 'if if-arrow-down',
      radios: {
        on: 'if if-radio-button-selected',
        off: 'if if-radio-button-unselected'
      }
    }
  },
  computed: {
    getPrimary () {
      return this.$store.state.primary
    },
    getColorName () {
      return this.$store.state.colorName
    },
    getDataOrigin () {
      return this.$store.state.dataOrigin
    }
  },
  methods: {
    setColor (name, color) {
      this.$vuetify.theme.primary = color
      this.$store.commit('setPrimary', color)
      this.$store.commit('setColorName', name)
    }
  },
  watch: {
    dataOrigin: function (val) {
      this.$store.commit('setDataOrigin', val)
    }
  },
  created () {
    this.dataOrigin = this.getDataOrigin
  }
}
</script>

<style lang="stylus" scoped>
.menu-radio-group, .menu-switch
  display flex
  justify-content center
  align-items center
  margin-top inherit
  padding-top inherit
  margin-left 1em
.colors-style
  width 66px
  height 30px
  border-radius 10px
  box-shadow 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)
  cursor pointer
  transition all .3s ease
  display flex
  justify-content center
  align-items center
  &:active
    transform scale(.9)
  .sel-color
    transition all .3s ease
    position absolute
.cur-color-style
  border-radius 10px
  box-shadow 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)
  color #fff
  display flex
  justify-content center
  align-items center
  width 264px
  height 40px
  transition all .3s ease
  &:active
    transform scale(.9)
</style>

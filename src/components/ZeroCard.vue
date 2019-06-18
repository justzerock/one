<template>
  <v-card
    class="mx-auto"
    light
    ripple
    hover
  >
    <v-card-text class="subheading pt-5 pb-4 px-5" >
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
  }
}
</script>

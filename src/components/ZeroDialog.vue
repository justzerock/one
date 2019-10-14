<template>
  <v-dialog
    v-model="dialog"
    max-width="290"
  >
    <v-card>
      <v-card-title class="headline">确定要删除?</v-card-title>

      <v-card-text>
        此操作不可撤销
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          flat="flat"
          @click="cancelDialog"
        >
          取消
        </v-btn>

        <v-btn
          color="error"
          flat="flat"
          @click="deleteCard"
        >
          删除
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    deleteCard () {
      this.$emit('deleteCard')
    },
    cancelDialog () {
      this.$emit('cancelDialog')
    }
  }
}
</script>

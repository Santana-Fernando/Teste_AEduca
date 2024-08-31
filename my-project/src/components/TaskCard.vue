<template>
  <v-card>
    <v-card-text>
      <div>#{{ student.RA }}</div>
      <p class="ma-0 pa-0 text-h5 text--primary">{{ student.Nome }}</p>
      <p class="ma-0 pa-0 text-h5 text--primary">{{ student.Email }}</p>
    </v-card-text>
    <v-card-actions>
      <v-list-item class="grow">
        <v-row align="center" justify="end">
          <v-btn icon color="grey" @click="edit"
            ><v-icon>fas fa-pen</v-icon></v-btn
          >
          <v-btn icon color="grey" @click="remove"
            ><v-icon>far fa-trash-alt</v-icon></v-btn
          >
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['student'],
  data: () => ({
    updateLoading: false,
    removeLoading: false,
  }),
  methods: {
    edit() {
      this.$emit('onEdit', this.student)
    },
    remove() {
      this.$emit('onRemove', this.student)
    },
  },
}
</script>

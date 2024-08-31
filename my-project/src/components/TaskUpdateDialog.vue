<template>
  <v-container>
    <v-dialog
      v-model="showDialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <task-form
        :student="student"
        :loading="loading"
        @onSave="updateTask"
        @onClose="$emit('onClose')"
      ></task-form>
    </v-dialog>
  </v-container>
</template>

<script>
import TasksApi from '@/api/tasks.api.js'
import ApiResponseMixin from '@/mixins/ApiResponseMixin'
import TaskForm from '@/components/TaskForm'

export default {
  props: ['showDialog', 'student'],
  data: () => ({
    loading: false,
  }),
  mixins: [ApiResponseMixin],
  components: {
    TaskForm,
  },
  methods: {
    updateTask(student) {
      this.loading = true
      TasksApi.update(student)
        .then(() => {
          this.$emit('onUpdated')
        })
        .catch((error) => {
          this.$emit('onError', this.extractErrorFromResponse(error))
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

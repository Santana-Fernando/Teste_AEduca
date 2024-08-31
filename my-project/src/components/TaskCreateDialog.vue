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
        @onSave="createTask"
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
  props: ['showDialog'],
  mixins: [ApiResponseMixin],
  data: () => ({
    loading: false,
    student: {
      RA: 0,
      Nome: '',
      Email: '',
      CPF: '',
    },
  }),
  components: {
    TaskForm,
  },
  methods: {
    clearFields() {
      this.student.Nome = ''
      this.student.Email = ''
      this.student.CPF = ''
    },
    createTask(student) {
      this.loading = true
      TasksApi.create(student)
        .then(() => {
          this.$emit('onUpdated')
          this.clearFields()
        })
        .catch((error) => {
          console.log(error)
          this.$emit('onError', this.extractErrorFromResponse(error))
        })
        .finally(() => {
          this.loading = false
        })
    },
  },
}
</script>

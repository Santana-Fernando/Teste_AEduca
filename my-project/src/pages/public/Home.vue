<template>
  <v-main class="overflow-hidden">
    <app-bar
      :background="'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg'"
      @OnAdd="createTask"
    ></app-bar>

    <v-container>
      <v-row
        v-if="loading"
        class="fill-height"
        align-content="center"
        justify="center"
      >
        <v-col class="text-subtitle-1 text-center" cols="12">
          Getting list...
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="blue accent-4"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>

      <v-row v-if="!loading">
        <v-col
          class="pa-1"
          cols="12"
          v-for="student in students"
          :key="student.RA"
        >
          <task-card
            :student="student"
            @onEdit="editTask"
            @onRemove="removeTask"
          ></task-card>
        </v-col>
      </v-row>

      <v-row v-if="!loading" class="pa-5">
        <v-col cols="12">
          <div v-if="students && students.length == 0">
            <h2>Your list is empty 🥺</h2>
          </div>
          <div v-if="students && students.length > 3" class="pb-7">
            <h2>You've reached the end! 👋</h2>
          </div>
        </v-col>
      </v-row>

      <!-- Create Task Dialog -->
      <task-create-dialog
        :showDialog="showTaskCreateDialog"
        @onUpdated="taskCreated"
        @onClose="showTaskCreateDialog = false"
        @onError="showError"
      />

      <!-- Update Task Dialog -->
      <task-update-dialog
        :showDialog="showTaskUpdateDialog"
        :student="student"
        @onUpdated="taskSaved"
        @onClose="showTaskUpdateDialog = false"
        @onError="showError"
      />

      <!-- SNACKBAR TOAST -->
      <v-snackbar v-model="snackbar" :vertical="true" :top="true">
        {{ snackbar_text }}
      </v-snackbar>
    </v-container>
  </v-main>
</template>

<script>
import TasksApi from '@/api/tasks.api.js'
import AppBar from '@/components/AppBar.vue'
import TaskCard from '@/components/TaskCard.vue'
import TaskCreateDialog from '@/components/TaskCreateDialog.vue'
import TaskUpdateDialog from '@/components/TaskUpdateDialog.vue'

export default {
  data: () => ({
    loading: false,
    students: [],
    showTaskCreateDialog: false,
    showTaskUpdateDialog: false,
    student: null,
    snackbar: false,
    snackbar_text: null,
  }),
  created() {
    this.loadTasks()
  },
  methods: {
    loadTasks() {
      this.loading = true
      console.log('Entrou na função')
      TasksApi.list().then((response) => {
        console.log(response)
        this.students = response
        this.loading = false
      })

      console.log(this.students)
    },
    createTask() {
      this.showTaskCreateDialog = true
    },
    taskCreated() {
      this.loadTasks()
      this.showTaskCreateDialog = false
      this.snackbar_text = 'Task has been created!'
      this.snackbar = true
    },
    editTask(student) {
      TasksApi.get(student.RA).then((student) => {
        this.student = student
        this.showTaskUpdateDialog = true
      })
    },
    taskSaved() {
      this.loadTasks()
      this.showTaskUpdateDialog = false
      this.snackbar_text = 'Task saved successfuly!'
      this.snackbar = true
    },
    removeTask(student) {
      TasksApi.delete(student.RA).then(() => {
        this.loadTasks()
      })
    },
    showError(error) {
      this.snackbar_text = error
      this.snackbar = true
    },
  },
  components: { AppBar, TaskCard, TaskCreateDialog, TaskUpdateDialog },
}
</script>

<style lang="scss"></style>

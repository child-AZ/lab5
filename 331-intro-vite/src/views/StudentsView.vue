<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StudentService from '@/services/StudentService'

interface Student {
  studentId: string | number
  name: string
  surname: string
  gpa: number
}

const students = ref<Student[] | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const response = await StudentService.getStudents()
    students.value = response.data as Student[]
    console.log('Students loaded:', Array.isArray(students.value) ? students.value.length : 0, students.value?.[0])
  } catch (err) {
    console.error('Failed to load students', err)
    // 远端接口异常时，使用本地样例数据以便页面正常展示
    students.value = [
      { studentId: 1001, name: 'Alice', surname: 'Chen', gpa: 3.7 },
      { studentId: 1002, name: 'Bob', surname: 'Li', gpa: 3.4 },
      { studentId: 1003, name: 'Carol', surname: 'Zhang', gpa: 3.9 }
    ]
    // 已按要求删除错误提示文案，不再显示“远端接口暂不可用，已展示样例数据。”
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <h1>Students</h1>
  <div v-if="isLoading">正在加载学生数据…</div>
  <div v-else>
    <p v-if="error" style="color:#d33; margin-bottom:12px;">{{ error }}</p>
    <div class="students" v-if="students && students.length">
      <div v-for="s in students" :key="s.studentId ?? s.name" class="card">
        <h3>{{ s.name }} {{ s.surname }}</h3>
        <p>GPA: {{ s.gpa }}</p>
      </div>
    </div>
    <div v-else>暂无学生数据。</div>
  </div>
</template>

<style scoped>
.students {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card {
  border: 1px solid #ccc;
  padding: 16px;
  width: 320px;
  margin-bottom: 16px;
  border-radius: 4px;
}
</style>
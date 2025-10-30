<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'
const store = useMessageStore()
const { message } = storeToRefs(store)
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialiased">
      <header>
       <div id="flashMessage" class="animate-fade" v-if="message">
         <h4>{{ message }}</h4>
       </div>
       <h1>Deploy with Vercel</h1>

       <div class="wrapper">
         <nav class="py-6">
            <RouterLink
              class="font-bold text-gray-700"
              exact-active-class="text-green-500"
              :to="{ name: 'event-list-view' }"
            >Event</RouterLink>
            |
            <RouterLink
              class="font-bold text-gray-700"
              exact-active-class="text-green-500"
              :to="{ name: 'about' }"
            >About</RouterLink>
            |
            <RouterLink
              class="font-bold text-gray-700"
              exact-active-class="text-green-500"
              :to="{ name: 'students' }"
            >Students</RouterLink>
          </nav>
          <div class="mt-2">
            Page size:
            <RouterLink :to="{ name: 'event-list-view', query: { page: 1, perPage: 3 } }">3</RouterLink> |
            <RouterLink :to="{ name: 'event-list-view', query: { page: 1, perPage: 4 } }">4</RouterLink> |
            <RouterLink :to="{ name: 'event-list-view', query: { page: 1, perPage: 6 } }">6</RouterLink>
          </div>
        </div>
      </header>

      <RouterView />
    </div>
</template>

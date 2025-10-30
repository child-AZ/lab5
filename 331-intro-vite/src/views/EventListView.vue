<script setup lang="ts">
import EventCard from '@/components/EventCard.vue'
import EventMeta from '@/components/EventMeta.vue'
import { type Event } from '@/types'
import { ref, onMounted, computed, watchEffect } from 'vue'
import EventService from '@/services/EventService'
import { useRouter } from 'vue-router'

const events = ref<Event[] | null>(null)
const totalEvents = ref(0)

const props = defineProps<{
  page: number
  perPage: number
}>()
const page = computed(() => props.page)
const perPage = computed(() => props.perPage)
const router = useRouter()

onMounted(() => {
  watchEffect(() => {
    EventService.getEvents(3, page.value)
      .then((response) => {
        events.value = response.data
        totalEvents.value = Number(response.headers['x-total-count'] ?? 0)
      })
      .catch((error) => {
        console.error('There was an error!', error)
        router.push({ name: 'network-error-view' })
      })
  })
})

const hasNexPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / 3)
  return page.value < totalPages
})
</script>

<template>
  <h1>Events For Good</h1>
  <div class="flex flex-col items-center" v-if="events">
    <div v-for="event in events" :key="event.id">
      <EventCard :event="event" />
      <EventMeta :event="event" />
    </div>

    <div class="flex w-[290px]">
      <RouterLink
        id="page-prev"
        class="flex-1 no-underline text-gray-700 text-left"
        :to="{ name: 'event-list-view', query: { page: page - 1, perPage: perPage } }"
        rel="prev"
        v-if="page != 1"
      >&#60; Prev Page</RouterLink>

      <RouterLink
        id="page-next"
        class="flex-1 no-underline text-gray-700 text-right"
        :to="{ name: 'event-list-view', query: { page: page + 1, perPage: perPage } }"
        rel="next"
        v-if="hasNexPage"
      >Next Page &#62;</RouterLink>
    </div>
  </div>
</template>

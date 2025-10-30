<script setup lang="ts">
import type { Event } from '@/types'

defineProps<{
  event: Event
}>()
</script>

<template>
  <div class="text-right">
    <div class="meta-item">{{ event.category }}</div>
    <div class="meta-item">{{ event.organizer }}</div>
  </div>
  
</template>
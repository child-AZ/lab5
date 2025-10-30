import type { Event } from '@/types'

const BASE_URL = 'https://my-json-server.typicode.com/child-AZ/db_json'

export async function fetchEvents(): Promise<Event[]> {
  const url = `${BASE_URL}/events?t=${Date.now()}`
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`)
  }
  return res.json() as Promise<Event[]>
}
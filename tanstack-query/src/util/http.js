import { QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient()

// 이벤트 목록 가져오기
export async function fetchEvents({ signal, searchTerm }) {
  let url = "http://localhost:3000/events"

  if (searchTerm) {
    url += "?search=" + searchTerm
  }
  const response = await fetch(url, { signal: signal })

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the events")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const { events } = await response.json()

  return events
}

// 새로운 이벤트 생성하기
export async function createNewEvent(eventData) {
  const response = await fetch(`http://localhost:3000/events`, {
    method: "POST",
    body: JSON.stringify(eventData),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const error = new Error("An error occurred while creating the event")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const { event } = await response.json()

  return event
}

// 이미지 가져오기
export async function fetchSelectableImages({ signal }) {
  const response = await fetch(`http://localhost:3000/events/images`, {
    signal,
  })

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the images")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const { images } = await response.json()

  return images
}

// 이벤트 상세 페이지 가져오기
export async function fetchEvent({ id, signal }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, { signal })

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the event")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  const { event } = await response.json()

  return event
}

// 이벤트 삭제
export async function deleteEvent({ id }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const error = new Error("An error occurred while deleting the event")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  return response.json()
}

export async function updateEvent({ id, event }) {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "PUT",
    body: JSON.stringify({ event }),
    headers: {
      "Content-Type": "application/json",
    },
  })

  if (!response.ok) {
    const error = new Error("An error occurred while updating the event")
    error.code = response.status
    error.info = await response.json()
    throw error
  }

  return response.json()
}

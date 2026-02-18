const eventSource = new EventSource("http://localhost:8000/api/news")

const liveContainer = document.getElementById("live-container")

// Handle live price updates
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  const story = data.story
  liveContainer.textContent = story
}

// Handle connection loss
eventSource.onerror = () => {
  console.log("Connection lost. Attempting to reconnect...")
}

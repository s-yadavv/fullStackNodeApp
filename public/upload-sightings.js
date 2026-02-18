// Get form and message elements
const form = document.querySelector("form");
const formMessageText = document.querySelector(".form-message");

// Handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop page reload

  // Read input values
  const title = document.getElementById("title").value.trim();
  const location = document.getElementById("location").value.trim();
  const text = document.getElementById("description").value.trim();
  const isoDateString = document.getElementById("datetime").value;

  // Basic validation
  if (!title || !location || !text || !isoDateString) {
    formMessageText.textContent = "Please fill in all fields";
    return;
  }

  // Convert ISO string to Date object
  const date = new Date(isoDateString);

  // Format date to readable string
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const readableDate = date.toLocaleString("en-GB", options);

  // Prepare data to send
  const formData = {
    title: title,
    location: location,
    text: text,
    timeStamp: readableDate,
  };

  try {
    // Clear previous message
    formMessageText.textContent = "";

    // Send data to backend
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      formMessageText.innerHTML =
        "Your sighting was uploaded successfully. <a href='sightings.html'>View here</a>";
      form.reset();
    } else {
      formMessageText.textContent = "Failed to upload sighting.";
    }
  } catch (err) {
    console.error(err);
    formMessageText.textContent = "Something went wrong. Try again.";
  }
});

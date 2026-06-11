/* ─── Helper: close popup ───────────────────── */
function closePopup() {
  document.getElementById("popup").innerHTML = "";
}

/* ─── Subscribe Popup ───────────────────────── */
function openSubscribe() {
  document.getElementById("popup").innerHTML = `
    <div class="overlay" onclick="handleOverlayClick(event)">
      <div class="popup">
        <button class="popup-close" onclick="closePopup()" aria-label="Close">&#x2715;</button>
        <h2>Subscribe</h2>
        <p class="popup-subtitle">Enter your email to receive JioStar's weekly newsletter.</p>

        <label class="field-label" for="email">Email Address</label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          autocomplete="email"
        >

        <div class="popup-actions">
          <button class="btn btn-secondary" onclick="closePopup()">Cancel</button>
          <button class="btn btn-primary" onclick="submitSubscribe()">Subscribe</button>
        </div>
      </div>
    </div>
  `;
}

/* ─── Topics Popup ──────────────────────────── */
function openTopics() {
  document.getElementById("popup").innerHTML = `
    <div class="overlay" onclick="handleOverlayClick(event)">
      <div class="popup">
        <button class="popup-close" onclick="closePopup()" aria-label="Close">&#x2715;</button>
        <h2>Select Topics</h2>
        <p class="popup-subtitle">We'll personalise your newsletter based on your selections.</p>

        <label class="field-label" for="email2">Email Address</label>
        <input
          type="email"
          id="email2"
          placeholder="you@example.com"
          autocomplete="email"
          required
        >

        <p class="section-label">Topics</p>
        <div class="topics-grid">

          <label class="topic-label">
            <input type="checkbox" value="Artificial Intelligence">
            Artificial Intelligence
          </label>

          <label class="topic-label">
            <input type="checkbox" value="Startup Funding">
            Startup Funding
          </label>

          <label class="topic-label">
            <input type="checkbox" value="Sports Technology">
            Sports Technology
          </label>

          <label class="topic-label">
            <input type="checkbox" value="Media & Entertainment">
            Media &amp; Entertainment
          </label>

          <label class="topic-label">
            <input type="checkbox" value="Creator Economy">
            Creator Economy
          </label>

          <label class="topic-label">
            <input type="checkbox" value="Product Launches">
            Product Launches
          </label>

          <label class="topic-label" style="grid-column: 1 / -1;">
            <input type="checkbox" value="Other" id="otherCheckbox">
            Other
          </label>

        </div>

        <input
          type="text"
          id="otherTopic"
          placeholder="Please specify topic"
          style="display:none;"
        >

        <div class="popup-actions">
          <button class="btn btn-secondary" onclick="closePopup()">Cancel</button>
          <button class="btn btn-primary" onclick="submitTopics()">Save Preferences</button>
        </div>
      </div>
    </div>
  `;

  /* Re-bind "Other" toggle after popup is injected */
  document.getElementById("otherCheckbox").addEventListener("change", function () {
    const otherInput = document.getElementById("otherTopic");
    if (this.checked) {
      otherInput.style.display = "block";
    } else {
      otherInput.style.display = "none";
      otherInput.value = "";
    }
  });
}

/* ─── Close on overlay click ────────────────── */
function handleOverlayClick(e) {
  if (e.target.classList.contains("overlay")) {
    closePopup();
  }
}

/* ─── Subscribe Submission ──────────────────── */
function submitSubscribe() {
  const email = document.getElementById("email").value.trim();

  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  const formData = new FormData();
  formData.append("entry.2080434396", email);

  fetch(
    "https://docs.google.com/forms/d/1TFlxSDoyz6CAuB7i7PXwL5Omo6_ImNb6apPMiLNX71U/formResponse",
    { method: "POST", mode: "no-cors", body: formData }
  );

  closePopup();
  alert("You've subscribed successfully!");
}

/* ─── Topics Submission ─────────────────────── */
function submitTopics() {
  const email = document.getElementById("email2").value.trim();

  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  const checked = document.querySelectorAll(".topics-grid input:checked");

  if (checked.length === 0) {
    alert("Please select at least one topic.");
    return;
  }

  const formData = new FormData();
  formData.append("entry.2041127076", email);

  checked.forEach(item => {
    if (item.value === "Other") {
      const otherTopic = document.getElementById("otherTopic").value.trim();
      if (otherTopic !== "") {
        formData.append("entry.1924720534", otherTopic);
      }
    } else {
      formData.append("entry.1924720534", item.value);
    }
  });

  fetch(
    "https://docs.google.com/forms/d/1pokRgth60-zMKDyDvYfj9NJ2Iu2TsvRCYOFdhZV02bk/formResponse",
    { method: "POST", mode: "no-cors", body: formData }
  );

  alert("Your preferences have been saved successfully!");
  closePopup();
}
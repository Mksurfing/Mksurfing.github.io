"use strict";

// 1. POLL
const poll = new Map();

/* -----------------------------
   UPDATE DROPDOWN (MOVED UP)
------------------------------*/
function updateDropdown() {
  const select = document.getElementById("option-select");

  select.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Choose a fishing option";
  select.appendChild(defaultOption);

  for (const option of poll.keys()) {
    const opt = document.createElement("option");
    opt.value = option;
    opt.textContent = option;
    select.appendChild(opt);
  }
}

/* -----------------------------
   ADD OPTION
------------------------------*/
function addOption(option) {
  if (!option) {
    return "Option cannot be empty.";
  }

  if (poll.has(option)) {
    return `Option "${option}" already exists.`;
  }

  poll.set(option, new Set());
  updateDropdown();

  return `Option "${option}" added to the poll.`;
}

/* -----------------------------
   VOTE
------------------------------*/
function vote(option, voterId) {
  if (!poll.has(option)) {
    return `Option "${option}" does not exist.`;
  }

  const voters = poll.get(option);

  if (voters.has(voterId)) {
    return `Voter ${voterId} has already voted for "${option}".`;
  }

  voters.add(voterId);

  return `Voter ${voterId} voted for "${option}".`;
}

/* -----------------------------
   RESULTS
------------------------------*/
function displayResults() {
  let output = "Poll Results:\n";

  for (let [option, voters] of poll.entries()) {
    output += `${option}: ${voters.size} votes\n`;
  }

  return output.trim();
}

/* -----------------------------
   EVENTS
------------------------------*/
document.getElementById("add-btn").addEventListener("click", () => {
  const input = document.getElementById("option-input");
  document.getElementById("add-message").textContent =
    addOption(input.value.trim());

  input.value = "";
});

document.getElementById("vote-btn").addEventListener("click", () => {
  const option = document.getElementById("option-select").value;
  const voterId = document.getElementById("voter-id").value.trim();

  document.getElementById("vote-message").textContent =
    vote(option, voterId);
});

document.getElementById("results-btn").addEventListener("click", () => {
  document.getElementById("results").textContent = displayResults();
});

/* -----------------------------
   REQUIRED TEST DATA
------------------------------*/
addOption("Turkey");
addOption("Morocco");
addOption("Spain");

vote("Turkey", "traveler1");
vote("Turkey", "traveler2");
vote("Morocco", "traveler3");
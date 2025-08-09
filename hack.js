let directoryHandle;
let hackApplied = false;

document.getElementById("select-sd-card").addEventListener("click", async () => {
  try {
    directoryHandle = await window.showDirectoryPicker();
    checkHackStatus();
  } catch (error) {
    console.error("Error accessing the directory:", error);
  }
});

document.getElementById("hack-button").addEventListener("click", async () => {
  if (hackApplied) {
    await removeHack();
  } else {
    await applyHack();
  }
});

async function checkHackStatus() {
  try {
    await directoryHandle.getFileHandle("ham_cfg_support", { create: false });
    hackApplied = true;
  } catch (error) {
    if (error.name === "NotFoundError") {
      hackApplied = false;
    }
  }

  const statusElement = document.getElementById("hack-status");
  const buttonElement = document.getElementById("hack-button");
  const statusParent = statusElement.parentElement;

  if (hackApplied) {
    statusElement.innerHTML = "Status: Applied, eject the SD Card, and insert it into <b>your goggles</b>.";
    buttonElement.innerHTML = `
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16"></path>
      </svg>
      Remove Hack
    `;
    buttonElement.className = "inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:shadow-xl";

    // Update status indicator
    const indicator = statusParent.querySelector('.w-3');
    indicator.className = "w-3 h-3 bg-green-400 rounded-full mr-3";
  } else {
    statusElement.innerText = "Status: Not Applied";
    buttonElement.innerHTML = `
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
      </svg>
      Apply Hack
    `;
    buttonElement.className = "inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl";

    // Update status indicator
    const indicator = statusParent.querySelector('.w-3');
    indicator.className = "w-3 h-3 bg-red-400 rounded-full mr-3";
  }
  document.getElementById("hack-container").style.display = "block";
  document.getElementById("hack-container").classList.remove("hidden");
}

async function applyHack() {
  await directoryHandle.getFileHandle("ham_cfg_support", { create: true });
  checkHackStatus();
}

async function removeHack() {
  await directoryHandle.removeEntry("ham_cfg_support");
  checkHackStatus();
}

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

  if (hackApplied) {
    document.getElementById("hack-status").innerHTML =
      "Status: Applied, eject the SD Card, and insert it into <b>your goggles</b>.";
    document.getElementById("hack-button").innerText = "Remove Hack";
  } else {
    document.getElementById("hack-status").innerText = "Status: Not Applied";
    document.getElementById("hack-button").innerText = "Apply Hack";
  }
  document.getElementById("hack-container").style.display = "block";
}

async function applyHack() {
  await directoryHandle.getFileHandle("ham_cfg_support", { create: true });
  checkHackStatus();
}

async function removeHack() {
  await directoryHandle.removeEntry("ham_cfg_support");
  checkHackStatus();
}

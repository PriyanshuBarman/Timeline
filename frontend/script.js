const screenshotBtn = document.querySelector(".screenshot-btn");

screenshotBtn.addEventListener("click", async () => {
  try {
    screenshotBtn.disabled = true;
    screenshotBtn.textContent = "Please wait...";

    const response = await fetch("http://localhost:3000/screenshot");

    if (!response.ok) throw new Error("Failed to fetch screenshot");

    const blob = await response.blob();

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "screenshot.png";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);

  } catch (error) {
    console.error("Error downloading screenshot:", error);
    alert("Failed to download screenshot. Please try again.");
  } finally {
    screenshotBtn.disabled = false;
    screenshotBtn.textContent = "Take Screenshot";
  }
});

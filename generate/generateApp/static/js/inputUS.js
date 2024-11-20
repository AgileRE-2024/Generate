// Save input values and navigate to resultUS.html
function saveUserStory() {
    // Ambil nilai input dari form
    const whoInput = document.getElementById("who").value.trim();
    const whatInput = document.getElementById("what").value.trim();
    const whyInput = document.getElementById("why").value.trim();

    // Validasi input
    if (!whoInput || !whatInput || !whyInput) {
        alert("Please fill in all fields!");
        return;
    }

    // Format input menjadi user story
    const userStory = `As a ${whoInput.toLowerCase()}, I want to ${whatInput} So that I can ${whyInput}.`;

    // Simpan user story ke localStorage
    localStorage.setItem("userStory", userStory);

    // Redirect ke halaman resultUS.html
    const resultURL = document.getElementById("saveBtn").getAttribute("data-url");
    window.location.href = resultURL;
}

// Tambahkan event listener untuk tombol Save
document.getElementById("saveBtn").addEventListener("click", saveUserStory);

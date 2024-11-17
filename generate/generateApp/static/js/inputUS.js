// Optional: Add JavaScript validation (to complement HTML `required` attribute)
document.getElementById('userStoryForm').addEventListener('submit', function (event) {
    const who = document.getElementById('who').value.trim();
    const what = document.getElementById('what').value.trim();
    const why = document.getElementById('why').value.trim();

    if (!who || !what || !why) {
        event.preventDefault();
        alert('Please fill out all fields!');
    }
});
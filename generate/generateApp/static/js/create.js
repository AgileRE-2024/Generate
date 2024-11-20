document.getElementById('projectForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('projectName');
    const descriptionInput = document.getElementById('projectDescription');
    const nameError = document.getElementById('nameError');
    const descriptionError = document.getElementById('descriptionError');
    
    nameError.style.display = 'none';
    descriptionError.style.display = 'none';
    
    let isValid = true;
    
    if (!nameInput.value.trim()) {
        nameError.style.display = 'block';
        isValid = false;
    }
    
    if (!descriptionInput.value.trim()) {
        descriptionError.style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        const projectData = {
            name: nameInput.value.trim(),
            description: descriptionInput.value.trim(),
            createdAt: new Date().toISOString()
        };
        
        console.log('Project created:', projectData);
        
        nameInput.value = '';
        descriptionInput.value = '';
        
        alert('Project created successfully!');
    }
});
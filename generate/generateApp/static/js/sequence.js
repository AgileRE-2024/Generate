document.addEventListener('DOMContentLoaded', () => {
    // Initialize event listeners
    initializeEventListeners();
    initializeFeaturePicker();
});

function initializeEventListeners() {
    // Back arrow functionality
    const backArrow = document.querySelector('.back-arrow');
    backArrow.addEventListener('click', () => {
        // Handle back navigation
        console.log('Back navigation clicked');
    });

    // Add buttons functionality
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(btn => {
        btn.addEventListener('click', handleAddActivity);
    });

    // Edit buttons functionality
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
        btn.addEventListener('click', handleEditActivity);
    });

    // Delete buttons functionality
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', handleDeleteActivity);
    });

    // Expand buttons functionality
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(btn => {
        btn.addEventListener('click', handleExpandActivity);
    });

    // Save button functionality
    const saveButton = document.querySelector('.save-btn');
    saveButton.addEventListener('click', handleSave);
}

function handleAddActivity(event) {
    const activityItem = event.target.closest('.activity-item');
    const newActivityItem = createNewActivityItem();
    activityItem.insertAdjacentElement('afterend', newActivityItem);
    
    // Reinitialize event listeners for the new elements
    initializeEventListeners();
}

function handleEditActivity(event) {
    const activityContent = event.target.closest('.activity-content');
    const textSpan = activityContent.querySelector('span');
    const currentText = textSpan.textContent;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.style.width = '70%';
    
    textSpan.replaceWith(input);
    input.focus();
    
    input.addEventListener('blur', () => {
        const newSpan = document.createElement('span');
        newSpan.textContent = input.value;
        input.replaceWith(newSpan);
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            input.blur();
        }
    });
}

function handleDeleteActivity(event) {
    const activityItem = event.target.closest('.activity-item');
    if (document.querySelectorAll('.activity-item').length > 1) {
        activityItem.remove();
    } else {
        alert('Cannot delete the last activity');
    }
}

function handleExpandActivity(event) {
    const button = event.target;
    const activityItem = button.closest('.activity-item');
    const dropdownContent = activityItem.querySelector('.dropdown-content');
    
    button.textContent = button.textContent === '↓' ? '↑' : '↓';
    dropdownContent.classList.toggle('hidden');
}

function handleSave() {
    const activities = [];
    document.querySelectorAll('.activity-item').forEach(item => {
        const activityData = {
            text: item.querySelector('.activity-content span').textContent,
            actor: item.querySelector('.form-group:nth-child(1)').textContent.replace('Actor: ', '').trim(),
            activity: item.querySelector('.form-group:nth-child(2)').textContent.replace('Activity: ', '').trim(),
            lifeline: item.querySelector('.form-group:nth-child(3)').textContent.replace('Lifeline: ', '').trim()
        };
        activities.push(activityData);
    });
    
    console.log('Saving activities:', activities);
    // Add actual save functionality here
}

function createNewActivityItem() {
    const div = document.createElement('div');
    div.className = 'activity-item';
    div.innerHTML = `
        <div class="activity-content">
            <span>New Activity</span>
            <div class="action-buttons">
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
                <button class="expand-btn">↓</button>
            </div>
        </div>
        <div class="dropdown-content hidden">
            <div class="form-group">
                Actor: Student
            </div>
            <div class="form-group">
                Activity: Display Form for Entering Search Parameters
            </div>
            <div class="form-group">
                Lifeline: 
                <div class="pick-button">Pick</div>
            </div>
        </div>
        <button class="add-btn">+</button>
    `;
    return div;
}

function initializeFeaturePicker() {
    const modal = document.getElementById('featurePickerModal');
    const pickButtons = document.querySelectorAll('.pick-button');
    let currentLifelineElement = null;

    // Add click event to all pick buttons
    pickButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            modal.classList.remove('hidden');
            currentLifelineElement = e.target.closest('.form-group');
        });
    });

    // Add click events to feature options
    const featureOptions = document.querySelectorAll('.feature-option');
    featureOptions.forEach(option => {
        option.addEventListener('click', () => {
            const feature = option.getAttribute('data-feature');
            if (currentLifelineElement) {
                currentLifelineElement.innerHTML = `
                    Lifeline: ${feature}
                    <button class="pick-button">Pick</button>
                `;
                // Reinitialize the pick button event listener
                initializeFeaturePicker();
            }
            modal.classList.add('hidden');
        });
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

// Update createNewActivityItem function to include the proper structure
function createNewActivityItem() {
    const div = document.createElement('div');
    div.className = 'activity-item';
    div.innerHTML = `
        <div class="activity-content">
            <span>New Activity</span>
            <div class="action-buttons">
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
                <button class="expand-btn">↓</button>
            </div>
        </div>
        <div class="dropdown-content hidden">
            <div class="form-group">
                Actor: Student
            </div>
            <div class="form-group">
                Activity: Display Form for Entering Search Parameters
            </div>
            <div class="form-group">
                Lifeline: 
                <button class="pick-button">Pick</button>
            </div>
        </div>
        <button class="add-btn">+</button>
    `;
    return div;
}

// Add generate button handler
const generateBtn = document.querySelector('.generate-btn');
const resultPage = document.querySelector('#result-page');

generateBtn.addEventListener('click', () => {
    resultPage.classList.remove('hidden');
});

// Add back arrow handler for result page
const backArrow = resultPage.querySelector('.back-arrow');
backArrow.addEventListener('click', () => {
    resultPage.classList.add('hidden');
});
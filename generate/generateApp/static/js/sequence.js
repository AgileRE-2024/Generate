document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    initializeFeaturePicker();
  });
  
  function initializeEventListeners() {
    const backArrow = document.querySelector('.back-arrow');
    backArrow.addEventListener('click', () => {
        console.log('Back navigation clicked');
    });
  
    const addButtons = document.querySelectorAll('.add-btn');
    addButtons.forEach(btn => {
        btn.addEventListener('click', handleAddActivity);
    });
  
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(btn => {
        btn.addEventListener('click', handleEditActivity);
    });
  
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', handleDeleteActivity);
    });
  
    const expandButtons = document.querySelectorAll('.expand-btn');
    expandButtons.forEach(btn => {
        btn.addEventListener('click', handleExpandActivity);
    });
  
    const saveButton = document.querySelector('.save-btn');
    saveButton.addEventListener('click', handleSave);
  }
  
  function handleAddActivity(event) {
    const activityItem = event.target.closest('.activity-item');
    const newActivityItem = createNewActivityItem();
    activityItem.insertAdjacentElement('afterend', newActivityItem);
    initializeEventListeners();
    initializeFeaturePicker();
  }
  
  function handleEditActivity(event) {
    const activityContent = event.target.closest('.activity-content');
    const actionSpan = activityContent.querySelector('.action-text');
    const currentText = actionSpan.textContent;
    
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.style.width = '70%';
    
    actionSpan.replaceWith(input);
    input.focus();
    
    input.addEventListener('blur', () => {
        const newSpan = document.createElement('span');
        newSpan.className = 'action-text';
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
    document.querySelectorAll('.activity-item').forEach((item, index) => {
        const activityData = {
            text: `Activity${index + 1}: ${item.querySelector('.action-text').textContent}`,
            actor: item.querySelector('.form-group:nth-child(1)').textContent.replace('Actor: ', '').trim(),
            activity: item.querySelector('.form-group:nth-child(2)').textContent.replace('Activity: ', '').trim(),
            lifeline: item.querySelector('.form-group:nth-child(3)').textContent.replace('Lifeline: ', '').trim()
        };
        activities.push(activityData);
    });
    
    console.log('Saving activities:', activities);
  }
  
  function createNewActivityItem() {
    const div = document.createElement('div');
    div.className = 'activity-item';
    const activityNumber = document.querySelectorAll('.activity-item').length + 1;
    div.innerHTML = `
        <div class="activity-content">
            <div class="activity-text">
                <span class="activity-label">Activity${activityNumber}: </span>
                <span class="action-text">New Activity</span>
            </div>
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
  
  function initializeFeaturePicker() {
    const modal = document.getElementById('featurePickerModal');
    const pickButtons = document.querySelectorAll('.pick-button');
    pickButtons.forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
    });
  
    document.querySelectorAll('.pick-button').forEach(button => {
        button.addEventListener('click', (e) => {
            modal.classList.remove('hidden');
            currentLifelineElement = e.target.closest('.form-group');
        });
    });
  
    const featureOptions = document.querySelectorAll('.feature-option');
    let currentLifelineElement = null;
  
    featureOptions.forEach(option => {
        option.addEventListener('click', () => {
            const feature = option.getAttribute('data-feature');
            if (currentLifelineElement) {
                currentLifelineElement.innerHTML = `
                    Lifeline: ${feature}
                    <button class="pick-button">Pick</button>
                `;
                initializeFeaturePicker();
            }
            modal.classList.add('hidden');
        });
    });
  
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
  }
  
  const generateBtn = document.querySelector('.generate-btn');
  const resultPage = document.querySelector('#result-page');
  
  generateBtn.addEventListener('click', () => {
    resultPage.classList.remove('hidden');
  });
  
  const backArrow = resultPage.querySelector('.back-arrow');
  backArrow.addEventListener('click', () => {
    resultPage.classList.add('hidden');
  });
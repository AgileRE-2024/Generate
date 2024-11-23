document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.modal');
    let currentDropdown = null;
  
    function initializeEventListeners() {
        document.querySelectorAll('.arrow-btn').forEach(button => {
            button.replaceWith(button.cloneNode(true));
        });
  
        document.querySelectorAll('.arrow-btn').forEach(button => {
            button.addEventListener('click', function() {
                const activityItem = this.closest('.activity-item');
                const dropdown = activityItem.querySelector('.entity-dropdown');
                dropdown.classList.toggle('show');
                this.textContent = dropdown.classList.contains('show') ? '↑' : '↓';
            });
        });
  
        document.querySelectorAll('.pick-btn').forEach(button => {
            button.replaceWith(button.cloneNode(true));
        });
  
        document.querySelectorAll('.pick-btn').forEach(button => {
            button.addEventListener('click', function() {
                modal.classList.add('show');
                currentDropdown = this.closest('.entity-dropdown');
            });
        });
  
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.replaceWith(button.cloneNode(true));
        });
  
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function() {
                const activityHeader = this.closest('.activity-header');
                const activityText = activityHeader.querySelector('.activity-text');
                const currentText = activityText.textContent;
                
                const match = currentText.match(/^(Action\d+:\s*)(.*)$/);
                if (!match) return;
                
                const [_, prefix, description] = match;
                
                const container = document.createElement('div');
                container.style.display = 'flex';
                
                const prefixSpan = document.createElement('span');
                prefixSpan.textContent = prefix;
                prefixSpan.style.flexShrink = '0';
                
                const input = document.createElement('input');
                input.type = 'text';
                input.value = description;
                input.style.flexGrow = '1';
                input.style.marginLeft = '4px';
                
                container.appendChild(prefixSpan);
                container.appendChild(input);
                
                activityText.innerHTML = '';
                activityText.appendChild(container);
                input.focus();

                input.addEventListener('blur', function() {
                    activityText.textContent = prefix + this.value;
                });

                input.addEventListener('keypress', function(e) {
                    if (e.key === 'Enter') {
                        activityText.textContent = prefix + this.value;
                    }
                });
            });
        });
  
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.replaceWith(button.cloneNode(true));
        });
  
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function() {
                const activityItem = this.closest('.activity-item');
                activityItem.remove();
                renumberActions();
            });
        });
  
        document.querySelectorAll('.add-btn').forEach(button => {
            button.replaceWith(button.cloneNode(true));
        });
  
        document.querySelectorAll('.add-btn').forEach(button => {
            button.addEventListener('click', function() {
                const currentItem = this.closest('.activity-item');
                addNewAction(currentItem);
            });
        });
    }
  
    function addNewAction(currentItem) {
        const nextActionNumber = document.querySelectorAll('.activity-item').length + 1;
        const newItem = document.createElement('div');
        newItem.className = 'activity-item';
        newItem.innerHTML = `
            <div class="activity-header">
                <div class="activity-text">Action${nextActionNumber}: New Action</div>
                <div class="button-group">
                    <button class="edit-btn">✏️</button>
                    <button class="delete-btn">🗑️</button>
                    <button class="arrow-btn">↓</button>
                </div>
            </div>
            <div class="entity-dropdown">
                <div>Entity/Role:</div>
                <button class="pick-btn">Pick</button>
            </div>
            <button class="add-btn">+</button>
        `;
  
        currentItem.parentNode.insertBefore(newItem, currentItem.nextSibling);
        initializeEventListeners();
    }
  
    function renumberActions() {
        const activities = document.querySelectorAll('.activity-item');
        activities.forEach((activity, index) => {
            const activityText = activity.querySelector('.activity-text');
            const text = activityText.textContent;
            const description = text.replace(/^Action\d+:\s*/, '');
            activityText.textContent = `Action${index + 1}: ${description}`;
        });
    }
  
    document.querySelectorAll('.entity-choice').forEach(choice => {
        choice.addEventListener('click', function() {
            if (currentDropdown) {
                currentDropdown.querySelector('div').textContent = 'Entity/Role: ' + this.textContent;
            }
            modal.classList.remove('show');
        });
    });
  
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
  
    const saveButton = document.querySelector('.save-btn');
    saveButton.addEventListener('click', function() {
        alert('Activities saved successfully!');
    });
  
    initializeEventListeners();
  
    const generateButton = document.querySelector('.generate-btn');
    const resultPage = document.querySelector('#result-page');
    const activityContainer = document.querySelector('#activity-container');
    
    generateButton.addEventListener('click', function() {
        activityContainer.style.display = 'none';
        
        resultPage.style.display = 'block';
        
        document.getElementById('activity-diagram-result').src = 'path_to_your_image.png';
        
        document.querySelector('.save-btn').style.display = 'none';
        document.querySelector('.generate-btn').style.display = 'none';
    });
  
    document.querySelector('.back-to-list').addEventListener('click', function() {
        window.location.href = 'activity.html';
    });
  });
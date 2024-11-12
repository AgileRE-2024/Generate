document.addEventListener('DOMContentLoaded', function() {
  const modal = document.querySelector('.modal');
  let currentDropdown = null;

  // Initialize all event listeners
  function initializeEventListeners() {
      // Arrow buttons (Dropdown toggle)
      document.querySelectorAll('.arrow-btn').forEach(button => {
          // Remove existing listeners
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

      // Pick buttons
      document.querySelectorAll('.pick-btn').forEach(button => {
          // Remove existing listeners
          button.replaceWith(button.cloneNode(true));
      });

      document.querySelectorAll('.pick-btn').forEach(button => {
          button.addEventListener('click', function() {
              modal.classList.add('show');
              currentDropdown = this.closest('.entity-dropdown');
          });
      });

      // Edit buttons
      document.querySelectorAll('.edit-btn').forEach(button => {
          // Remove existing listeners
          button.replaceWith(button.cloneNode(true));
      });

      document.querySelectorAll('.edit-btn').forEach(button => {
          button.addEventListener('click', function() {
              const activityHeader = this.closest('.activity-header');
              const activityText = activityHeader.querySelector('.activity-text');
              const currentText = activityText.textContent;
              const input = document.createElement('input');
              input.type = 'text';
              input.value = currentText;
              input.style.width = '100%';
              activityText.innerHTML = '';
              activityText.appendChild(input);
              input.focus();

              input.addEventListener('blur', function() {
                  activityText.textContent = this.value;
              });

              input.addEventListener('keypress', function(e) {
                  if (e.key === 'Enter') {
                      activityText.textContent = this.value;
                  }
              });
          });
      });

      // Delete buttons
      document.querySelectorAll('.delete-btn').forEach(button => {
          // Remove existing listeners
          button.replaceWith(button.cloneNode(true));
      });

      document.querySelectorAll('.delete-btn').forEach(button => {
          button.addEventListener('click', function() {
              const activityItem = this.closest('.activity-item');
              activityItem.remove();
              renumberActions();
          });
      });

      // Add buttons
      document.querySelectorAll('.add-btn').forEach(button => {
          // Remove existing listeners
          button.replaceWith(button.cloneNode(true));
      });

      document.querySelectorAll('.add-btn').forEach(button => {
          button.addEventListener('click', function() {
              const currentItem = this.closest('.activity-item');
              addNewAction(currentItem);
          });
      });
  }

  // Add new action functionality
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

  // Renumber actions
  function renumberActions() {
      const activities = document.querySelectorAll('.activity-item');
      activities.forEach((activity, index) => {
          const activityText = activity.querySelector('.activity-text');
          const text = activityText.textContent;
          const newText = text.replace(/Action\d+:/, `Action${index + 1}:`);
          activityText.textContent = newText;
      });
  }

  // Entity choice functionality
  document.querySelectorAll('.entity-choice').forEach(choice => {
      choice.addEventListener('click', function() {
          if (currentDropdown) {
              currentDropdown.querySelector('div').textContent = 'Entity/Role: ' + this.textContent;
          }
          modal.classList.remove('show');
      });
  });

  // Close modal when clicking outside
  modal.addEventListener('click', function(e) {
      if (e.target === modal) {
          modal.classList.remove('show');
      }
  });

  // Save functionality
  const saveButton = document.querySelector('.save-btn');
  saveButton.addEventListener('click', function() {
      alert('Activities saved successfully!');
  });

  // Initialize all event listeners on page load
  initializeEventListeners();

  // Generate button functionality
  const generateButton = document.querySelector('.generate-btn');
  const resultPage = document.querySelector('#result-page');
  const activityContainer = document.querySelector('#activity-container');
  
  generateButton.addEventListener('click', function() {
      // Hide the activity container
      activityContainer.style.display = 'none';
      
      // Show the result page
      resultPage.style.display = 'block';
      
      // Set the image source - replace 'path_to_your_image.png' with your actual image path
      document.getElementById('activity-diagram-result').src = 'path_to_your_image.png';
      
      // Hide the buttons
      document.querySelector('.save-btn').style.display = 'none';
      document.querySelector('.generate-btn').style.display = 'none';
  });

  // Back button functionality (if needed)
  document.querySelector('.back-to-list').addEventListener('click', function() {
      window.location.href = 'activity.html';
  });
});
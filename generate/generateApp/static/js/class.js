document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll(".delete-icon");
    const dropdownButtons = document.querySelectorAll(".dropdown-icon");
    const editButtons = document.querySelectorAll(".edit-icon");
    const addClassButton = document.querySelector(".add-class-button");
    const backButton = document.querySelector(".back-button");
    const addMethodButtons = document.querySelectorAll(".add-method-button");
    const pickButtons = document.querySelectorAll(".pick-button");
    const generateClassButton = document.querySelector(".generate-class-button");
    const projectListButton = document.querySelector(".project-list-button");
    const inputPage = document.querySelector(".container");
    const resultPage = document.querySelector(".result-page");
  
    const modalHTML = `
      <div id="confirmationModal" class="modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.5); z-index: 1000;">
        <div class="modal-content" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: white; padding: 20px; border-radius: 8px; text-align: center; min-width: 300px;">
          <p style="margin-bottom: 20px;">Are you sure to pick this class? This action can't be undone.</p>
          <button id="confirmPick" style="background-color: #e67e22; color: white; border: none; padding: 8px 16px; border-radius: 4px; margin-right: 10px; cursor: pointer;">Yes</button>
          <button id="cancelPick" style="background-color: #666; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Cancel</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
  
    const modal = document.getElementById('confirmationModal');
  
    generateClassButton?.addEventListener("click", () => {
      const pickedClasses = document.querySelectorAll('.picked');
      if (pickedClasses.length === 0) {
        alert("Please pick at least one class before generating the diagram.");
        return;
      }
  
      if (inputPage) inputPage.style.display = "none";
      if (resultPage) {
        resultPage.style.display = "block";
        if (!resultPage.querySelector('.diagram-container')) {
          resultPage.innerHTML = `
            <h1>
              <span class="input-text">Result</span>
              <span class="title-text">Class Diagram</span>
            </h1>
            <div class="diagram-container">
              <img src="/api/placeholder/800/600" alt="Class Diagram" class="diagram-image">
            </div>
            <button class="project-list-button">Go to Project List</button>
          `;
        }
      }
    });
  
    projectListButton?.addEventListener("click", () => {
      console.log("Navigating to project list...");
    });
  
    function handlePickButton(button) {
      button.addEventListener("click", () => {
        if (!button.classList.contains('picked')) {
          modal.style.display = "block";
          
          modal.dataset.currentButton = button.getAttribute('data-button-id');
          
          const confirmBtn = document.getElementById('confirmPick');
          const cancelBtn = document.getElementById('cancelPick');
          
          //confirm
          confirmBtn.onclick = () => {
            const pickButton = button;
            const classWrapper = pickButton.closest('.class-wrapper');
            
            //checkmark
            const checkmark = document.createElement('div');
            checkmark.className = 'checkmark-button';
            checkmark.innerHTML = '✓';
            checkmark.style.cssText = `
              background-color: #e67e22;
              color: white;
              width: 30px;
              height: 30px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-top: 10px;
              margin-left: auto;
              margin-right: auto;
            `;
  
            pickButton.style.backgroundColor = '#666';
            pickButton.classList.add('picked');
            pickButton.disabled = true;
          
            classWrapper.appendChild(checkmark);
            
            modal.style.display = "none";
          };
          
          cancelBtn.onclick = () => {
            modal.style.display = "none";
          };
        }
      });
    }
  
    pickButtons.forEach((button, index) => {
      button.setAttribute('data-button-id', `pick-button-${index}`);
      handlePickButton(button);
    });
  
    //method 
    function handleAddMethod(button) {
      button.addEventListener("click", () => {
        const methodsContainer = button.closest(".dropdown-content").querySelector(".methods");
        const inputContainer = document.createElement("div");
        inputContainer.className = "method-input-container";
        inputContainer.style.marginBottom = "10px";
        
        inputContainer.innerHTML = `
          <input type="text" placeholder="Enter method (e.g., + methodName(): returnType)" 
                 style="width: 100%; padding: 5px; margin-bottom: 5px; font-family: monospace;">
          <div style="display: flex; gap: 5px;">
            <button class="save-method-btn" style="background-color: #e67e22; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Save</button>
            <button class="cancel-method-btn" style="background-color: #666; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Cancel</button>
          </div>
        `;
        
        button.parentElement.insertBefore(inputContainer, button);
        const methodInput = inputContainer.querySelector("input");
        methodInput.focus();
  
        inputContainer.querySelector(".save-method-btn").addEventListener("click", () => {
          const methodText = methodInput.value.trim();
          if (methodText) {
            const methodItem = document.createElement("div");
            methodItem.className = "method-item";
            methodItem.textContent = methodText.startsWith("+") ? methodText : `+ ${methodText}`;
            
            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = "🗑️";
            deleteBtn.style.cssText = "background: none; border: none; cursor: pointer; float: right;";
            deleteBtn.addEventListener("click", () => methodItem.remove());
            methodItem.appendChild(deleteBtn);
            
            methodsContainer.appendChild(methodItem);
          }
          inputContainer.remove();
        });
  
        inputContainer.querySelector(".cancel-method-btn").addEventListener("click", () => {
          inputContainer.remove();
        });
  
        methodInput.addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            inputContainer.querySelector(".save-method-btn").click();
          }
        });
      });
    }
  
    addMethodButtons.forEach(button => handleAddMethod(button));
  
    deleteButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const classWrapper = e.target.closest(".class-wrapper");
        if (classWrapper) {
          classWrapper.remove();
        }
      });
    });
  
    dropdownButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const classContainer = e.target.closest(".class-container");
        const dropdownIcon = e.target;
        
        document.querySelectorAll(".class-container.active").forEach(container => {
          if (container !== classContainer) {
            container.classList.remove("active");
            container.querySelector(".dropdown-icon").textContent = "▼";
          }
        });
        
        classContainer.classList.toggle("active");
        dropdownIcon.textContent = classContainer.classList.contains("active") ? "▲" : "▼";
      });
    });
  
    editButtons.forEach(button => {
      button.addEventListener("click", (e) => {
        const classNameInput = e.target.closest(".class-item").querySelector(".class-name");
        classNameInput.removeAttribute("readonly");
        classNameInput.focus();
  
        classNameInput.addEventListener("blur", () => {
          classNameInput.setAttribute("readonly", true);
        });
      });
    });
  
    addClassButton?.addEventListener("click", () => {
      const classList = document.querySelector(".class-list");
      const newClassWrapper = document.createElement("div");
      newClassWrapper.className = "class-wrapper";
      
      const buttonId = `pick-button-${document.querySelectorAll('.pick-button').length}`;
      
      newClassWrapper.innerHTML = `
        <div class="class-container">
          <div class="class-item">
            <input type="text" class="class-name" value="NewClass" readonly>
            <div class="icons">
              <button class="edit-icon">✏️</button>
              <button class="delete-icon">🗑️</button>
              <button class="dropdown-icon">▼</button>
            </div>
          </div>
          <div class="dropdown-content">
            <div class="attributes">
              <div class="attribute-item">- id: int</div>
            </div>
            <hr>
            <div class="methods">
              <div class="method-item">+ newMethod(): void</div>
            </div>
            <button class="add-method-button">+ Add Method</button>
          </div>
        </div>
        <button class="pick-button" data-button-id="${buttonId}">Pick</button>
      `;
  
      classList.appendChild(newClassWrapper);
      addEventListenersToNewClass(newClassWrapper);
    });
  
    function addEventListenersToNewClass(classWrapper) {
      const deleteButton = classWrapper.querySelector(".delete-icon");
      const editButton = classWrapper.querySelector(".edit-icon");
      const dropdownButton = classWrapper.querySelector(".dropdown-icon");
      const addMethodButton = classWrapper.querySelector(".add-method-button");
      const pickButton = classWrapper.querySelector(".pick-button");
  
      deleteButton.addEventListener("click", () => classWrapper.remove());
      
      editButton.addEventListener("click", () => {
        const classNameInput = classWrapper.querySelector(".class-name");
        classNameInput.removeAttribute("readonly");
        classNameInput.focus();
        classNameInput.addEventListener("blur", () => classNameInput.setAttribute("readonly", true));
      });
  
      dropdownButton.addEventListener("click", (e) => {
        const classContainer = e.target.closest(".class-container");
        const dropdownIcon = e.target;
        
        document.querySelectorAll(".class-container.active").forEach(container => {
          if (container !== classContainer) {
            container.classList.remove("active");
            container.querySelector(".dropdown-icon").textContent = "▼";
          }
        });
        
        classContainer.classList.toggle("active");
        dropdownIcon.textContent = classContainer.classList.contains("active") ? "▲" : "▼";
      });
  
      handleAddMethod(addMethodButton);
      handlePickButton(pickButton);
    }
  
    // Back Button Handler
    backButton?.addEventListener("click", () => {
      if (resultPage && resultPage.style.display === "block") {
        resultPage.style.display = "none";
        if (inputPage) inputPage.style.display = "block";
      } else {
        console.log("Back to previous page...");
      }
    });
  
    document.querySelector(".save-button")?.addEventListener("click", () => {
      console.log("Save button clicked");
    });
  
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
  });
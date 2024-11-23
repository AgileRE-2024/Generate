document.addEventListener("DOMContentLoaded", () => {
  // Select all necessary elements
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
  const diagramContainer = resultPage.querySelector(".diagram-container");

  // Existing modal creation code
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

  // Function to generate class diagram
  function generateClassDiagram() {
    const pickedClasses = document.querySelectorAll('.picked');
    
    if (pickedClasses.length === 0) {
      alert("Please pick at least one class before generating the diagram.");
      return;
    }

    // Collect class information
    const classData = Array.from(pickedClasses).map(pickedClass => {
      const classWrapper = pickedClass.closest('.class-wrapper');
      const className = classWrapper.querySelector('.class-name').value;
      
      const attributes = Array.from(
        classWrapper.querySelectorAll('.attribute-item')
      ).map(attr => attr.textContent.trim());
      
      const methods = Array.from(
        classWrapper.querySelectorAll('.method-item')
      ).map(method => method.textContent.trim());

      return {
        name: className,
        attributes: attributes,
        methods: methods
      };
    });

    // Create SVG representation of class diagram
    function createClassDiagramSVG(classes) {
      const svgWidth = 800;
      const svgHeight = Math.max(300, classes.length * 200);
      const classBoxWidth = 250;
      const classBoxHeight = 200;
      const padding = 20;

      let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
        <style>
          .class-box { fill: white; stroke: black; stroke-width: 2; }
          .class-title { font-weight: bold; font-size: 16px; }
          .section { font-size: 12px; }
          .attribute { fill: #666; }
          .method { fill: #333; }
        </style>`;

      classes.forEach((classObj, index) => {
        const x = padding;
        const y = padding + index * (classBoxHeight + padding);

        // Calculate dynamic heights based on content
        const attributeHeight = 20 * classObj.attributes.length;
        const methodHeight = 20 * classObj.methods.length;
        const totalHeight = 40 + attributeHeight + methodHeight + 60; // Header + attributes + methods + padding

        svg += `
          <rect x="${x}" y="${y}" width="${classBoxWidth}" height="${totalHeight}" class="class-box" />
          
          <!-- Class Name -->
          <text x="${x + classBoxWidth/2}" y="${y + 30}" class="class-title" text-anchor="middle">${classObj.name}</text>
          
          <!-- Divider line after class name -->
          <line x1="${x}" y1="${y + 40}" x2="${x + classBoxWidth}" y2="${y + 40}" stroke="black" stroke-width="1"/>
          
          <!-- Attributes -->
          ${classObj.attributes.map((attr, attrIndex) => `
            <text x="${x + 10}" y="${y + 65 + attrIndex * 20}" class="section attribute">${attr}</text>
          `).join('')}
          
          <!-- Divider line before methods -->
          <line x1="${x}" y1="${y + 50 + attributeHeight}" x2="${x + classBoxWidth}" y2="${y + 50 + attributeHeight}" stroke="black" stroke-width="1"/>
          
          <!-- Methods -->
          ${classObj.methods.map((method, methodIndex) => `
            <text x="${x + 10}" y="${y + 75 + attributeHeight + methodIndex * 20}" class="section method">${method}</text>
          `).join('')}
        `;

        // Add relationship lines if needed
        if (index < classes.length - 1) {
          svg += `
            <line x1="${x + classBoxWidth/2}" y1="${y + totalHeight}" 
                  x2="${x + classBoxWidth/2}" y2="${y + totalHeight + padding}" 
                  stroke="black" stroke-width="1" stroke-dasharray="4"/>
          `;
        }
      });

      svg += `</svg>`;
      return svg;
    }

    // Generate and display SVG
    const diagramSVG = createClassDiagramSVG(classData);
    
    // Update result page
    inputPage.style.display = "block"; //ini harusnya none, tp kl none result pagenya gamau muncul -sara
    resultPage.style.display = "block";
    
    // Clear previous content and add new SVG
    diagramContainer.innerHTML = diagramSVG;
  }

  // Event Listeners
  generateClassButton?.addEventListener("click", generateClassDiagram);

  projectListButton?.addEventListener("click", () => {
    console.log("Navigating to project list...");
    // Implement project list navigation logic if needed
  });

  // Back button to return to input page
  backButton?.addEventListener("click", () => {
    inputPage.style.display = "block";
    resultPage.style.display = "none";
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

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});
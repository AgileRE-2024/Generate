document.addEventListener("DOMContentLoaded", () => {
    const deleteButtons = document.querySelectorAll(".delete-icon");
    const dropdownButtons = document.querySelectorAll(".dropdown-icon");
    const editButtons = document.querySelectorAll(".edit-icon");
    const addMethodButton = document.querySelector(".method-button");

    // Delete class item
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const classItem = e.target.closest(".class-item");
            if (classItem) {
                classItem.remove();
            }
        });
    });

    // Toggle dropdown content
    dropdownButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const classItem = e.target.closest(".class-item");
            const dropdown = classItem.querySelector(".dropdown-content");

            if (dropdown.style.display === "none" || dropdown.style.display === "") {
                dropdown.style.display = "block";
            } else {
                dropdown.style.display = "none";
            }
        });
    });

    // Edit class name
    editButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const classNameInput = e.target.closest(".class-item").querySelector(".class-name");
            classNameInput.removeAttribute("readonly");
            classNameInput.focus();

            // Save edited name on blur
            classNameInput.addEventListener("blur", () => {
                classNameInput.setAttribute("readonly", true);
            });
        });
    });

    // Add a new method item to the method list within the dropdown
    addMethodButton.addEventListener("click", () => {
        const classItem = document.querySelector(".class-item"); // Choose the first class-item
        const methodList = classItem.querySelector(".method-list"); // Method list

        // Prompt the user for method details
        const methodName = prompt("Enter method name:");
        const parameters = prompt("Enter parameters (example: studentId: int, courseId: int):");
        const returnType = prompt("Enter return type (example: void):");

        if (methodName && returnType !== null) {
            // Create a new element for the method
            const newMethod = document.createElement("li");
            newMethod.innerHTML = `${methodName}(${parameters}): ${returnType} <button class="edit-method">✏️</button>`;
            methodList.appendChild(newMethod);
        }
    });

    // Edit attribute
    document.querySelectorAll(".edit-attribute").forEach(button => {
        button.addEventListener("click", (e) => {
            const attributeItem = e.target.parentElement;
            const newAttribute = prompt("Edit attribute:", attributeItem.textContent.trim().replace("✏️", "").trim());

            if (newAttribute) {
                attributeItem.innerHTML = `${newAttribute} <button class="edit-attribute">✏️</button>`;
            }
        });
    });

    // Edit method
    document.querySelectorAll(".edit-method").forEach(button => {
        button.addEventListener("click", (e) => {
            const methodItem = e.target.parentElement;
            const newMethod = prompt("Edit method:", methodItem.textContent.trim().replace("✏️", "").trim());

            if (newMethod) {
                methodItem.innerHTML = `${newMethod} <button class="edit-method">✏️</button>`;
            }
        });
    });

    // Event listener for adding a new class diagram
    document.querySelector(".add-class-button").addEventListener("click", () => {
        const classList = document.querySelector(".class-list");

        // Create a new class item
        const newClassItem = document.createElement("div");
        newClassItem.className = "class-item";
        newClassItem.innerHTML = `
            <input type="text" value="NewClass" class="class-name" readonly>
            <div class="icons">
                <button class="edit-icon">✏️</button>
                <button class="delete-icon">🗑️</button>
                <button class="dropdown-icon">▼</button>
            </div>
            <div class="dropdown-content">
                <ul class="attribute-list">
                    <li>- attribute: type <button class="edit-attribute">✏️</button></li>
                </ul>
                <hr>
                <ul class="method-list">
                    <li>+ methodName(params): returnType <button class="edit-method">✏️</button></li>
                </ul>
            </div>
        `;

        // Append the new class item to the class list
        classList.appendChild(newClassItem);

        // Apply event listeners to new elements
        addEventListenersToNewClass(newClassItem);
    });

    // Function to add event listeners to a new class item
    function addEventListenersToNewClass(classItem) {
        classItem.querySelector(".delete-icon").addEventListener("click", () => classItem.remove());
        classItem.querySelector(".dropdown-icon").addEventListener("click", () => {
            const dropdown = classItem.querySelector(".dropdown-content");
            dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
        });
        classItem.querySelector(".edit-icon").addEventListener("click", () => {
            const classNameInput = classItem.querySelector(".class-name");
            classNameInput.removeAttribute("readonly");
            classNameInput.focus();
            classNameInput.addEventListener("blur", () => classNameInput.setAttribute("readonly", true));
        });
    }

    // Save button
    document.querySelector(".save-button").addEventListener("click", () => {
        alert("Save action triggered! (Implement your save logic here)");
    });
});

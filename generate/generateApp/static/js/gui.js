// Function to add an attribute
function addAttribute(event) {
  // Determine the attribute section where the new attribute should be added
  const attributeSection = event ? event.target.closest('.attribute-section') : document.getElementById("attribute-section");
  if (!attributeSection) return;

  // Create a new attribute group and append it to the attribute section
  const newAttributeGroup = createAttributeGroup();
  attributeSection.appendChild(newAttributeGroup);
}

// Function to add a new page and its attribute section
function addPage() {
  // Get the main form section
  const formSection = document.getElementById("form-section");

  // Create a new div to contain the dropdown and attribute section
  const newEntry = document.createElement("div");
  newEntry.classList.add("form-entry");

  // Create a container for the dropdown and add-page button, like in the static HTML
  const pageDropdownContainer = document.createElement("div");
  pageDropdownContainer.classList.add("page-dropdown");

  // Create a new input for "Type Page"
  const newPageInput = document.createElement("input");
  newPageInput.type = "text";
  newPageInput.placeholder = "Type Page";
  newPageInput.classList.add("page-dropdown-input");

  // Create a button to add more attributes to this entry
  const addPageButton = document.createElement("button");
  addPageButton.classList.add("add-page");
  addPageButton.innerHTML = `<img src="/static/images/Add.png" alt="Add Page" class="add-icon">`;
  addPageButton.onclick = (e) => addAttribute(e);

  // Append dropdown and button to the container
  pageDropdownContainer.appendChild(newPageInput);
  pageDropdownContainer.appendChild(addPageButton);

  // Create an attribute section for this entry
  const attributeSection = document.createElement("div");
  attributeSection.classList.add("attribute-section");

  // Add an initial attribute group to the attribute section
  const attributeGroup = createAttributeGroup();
  attributeSection.appendChild(attributeGroup);

  // Append dropdown container and attribute section to the new entry
  newEntry.appendChild(pageDropdownContainer);
  newEntry.appendChild(attributeSection);

  // Insert the new entry above the save button
  const saveButton = document.querySelector(".save-button");
  formSection.insertBefore(newEntry, saveButton);
}


// Helper function to create a new attribute group with input and buttons
function createAttributeGroup() {
  const attributeGroup = document.createElement("div");
  attributeGroup.classList.add("attribute-group");

  // Create the input for the attribute
  const attributeInput = document.createElement("input");
  attributeInput.type = "text";
  attributeInput.placeholder = "Type Attribute";
  attributeInput.classList.add("attribute-input");

  // Add button for adding attributes
  const addButton = document.createElement("button");
  addButton.classList.add("add-attribute");
  addButton.innerHTML = `<img src="/static/images/Add.png" alt="Add Attribute" class="add-icon">`;
  addButton.onclick = (e) => addAttribute(e);

  // Delete button for removing the attribute group
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = `<img src="/static/images/Trash.png" alt="Delete" class="delete-icon">`;
  deleteButton.onclick = function() {
    attributeGroup.remove();
  };

  // Append input and buttons to the attribute group
  attributeGroup.appendChild(attributeInput);
  attributeGroup.appendChild(addButton);
  attributeGroup.appendChild(deleteButton);

  return attributeGroup;
}

function saveForm() {
  // Simpan data jika diperlukan (misalnya validasi/form handling)
  console.log("Form data saved successfully!");
  
  // Arahkan ke halaman homepage setelah tombol "Save" ditekan
  window.location.href = "/homepage"; // Pastikan URL ini sesuai dengan path di Django urls.py
}

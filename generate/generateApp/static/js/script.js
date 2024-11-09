function addAttribute() {
  // Temukan elemen `attribute-section` sebagai kontainer atribut
  const attributeSection = document.getElementById("attribute-section");

  // Buat elemen baru untuk atribut
  const newAttributeGroup = document.createElement("div");
  newAttributeGroup.classList.add("attribute-group");

  // Input baru untuk Type Attribute
  const newAttributeInput = document.createElement("input");
  newAttributeInput.type = "text";
  newAttributeInput.placeholder = "Type Attribute";
  newAttributeInput.classList.add("attribute-input");

  // Tombol untuk menambah atribut
  const addButton = document.createElement("button");
  addButton.classList.add("add-attribute");
  addButton.innerHTML = `<img src="{% static 'images/Add.png' %}" alt="Add Attribute" class="add-icon">`;
  addButton.onclick = addAttribute;

  // Tombol untuk menghapus atribut
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = `<img src="{% static 'images/Trash.png' %}" alt="Delete" class="delete-icon">`;
  deleteButton.onclick = function() {
      attributeSection.removeChild(newAttributeGroup);
  };

  // Tambahkan input dan tombol ke dalam grup atribut baru
  newAttributeGroup.appendChild(newAttributeInput);
  newAttributeGroup.appendChild(addButton);
  newAttributeGroup.appendChild(deleteButton);

  // Tambahkan grup atribut baru ke dalam `attribute-section`
  attributeSection.appendChild(newAttributeGroup);
}

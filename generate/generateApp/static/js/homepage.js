document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const historyBtn = dropdown.querySelector('.history-btn');
        const dropdownContent = dropdown.querySelector('.dropdown-content');

        historyBtn.addEventListener('click', function(event) {
            event.stopPropagation(); // Mencegah event bubbling

            // Tutup semua dropdown sebelum membuka yang baru
            dropdowns.forEach(otherDropdown => {
                const otherDropdownContent = otherDropdown.querySelector('.dropdown-content');
                if (otherDropdownContent !== dropdownContent) {
                    otherDropdownContent.style.display = 'none';
                }
            });

            // Toggle dropdown yang diklik
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Tutup dropdown ketika mengklik di luar dropdown
    window.addEventListener('click', function() {
        dropdowns.forEach(dropdown => {
            const dropdownContent = dropdown.querySelector('.dropdown-content');
            dropdownContent.style.display = 'none';
        });
    });
});

let attributeCount = 1; // Hitung awal untuk input kolom
const maxAttributes = 10;

function addAttribute() {
    const attributeInput = document.getElementById("attribute-input");
    if (attributeInput.value) {
      alert("Attribute added: " + attributeInput.value);
      attributeInput.value = "";
    } else {
      alert("Please enter an attribute!");
    }
  }
  
  // Function to toggle the visibility of the second attribute input field
function toggleAttributes() {
    const secondAttribute = document.querySelector('.additional-attributes input');
    
    // Check if the second attribute input is hidden
    if (secondAttribute.style.display === 'none' || secondAttribute.style.display === '') {
      secondAttribute.style.display = 'block'; // Show the second input field
    } else {
      secondAttribute.style.display = 'none'; // Hide the second input field
    }
  }
  
  function addAttribute() {
    if (attributeCount < maxAttributes) {
      // Membuat elemen div baru untuk kolom tambahan
      const newDiv = document.createElement("div");
      newDiv.classList.add("attribute-dropdown");

      // Input field baru
      const newInput = document.createElement("input");
      newInput.type = "text";
      newInput.placeholder = "Type Attributes..";
      newInput.id = 'attribute-input-${attributeCount}';

      // Tombol ikon tambah baru
      const addButton = document.createElement("button");
      addButton.classList.add("add-button");
      addButton.onclick = addAttribute;
      const addIcon = document.createElement("img");
      addIcon.src = "images/Plus.png";
      addIcon.alt = "Add";
      addIcon.classList.add("add-icon");
      addButton.appendChild(addIcon);

      // Tombol delete baru
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("delete-button");
      deleteButton.onclick = function() { removeAttribute(newDiv); };
      const deleteIcon = document.createElement("img");
      deleteIcon.src = "images/Trash.png";
      deleteIcon.alt = "Delete";
      deleteIcon.classList.add("delete-icon");
      deleteButton.appendChild(deleteIcon);

      // Menambahkan input dan tombol ke div baru
      newDiv.appendChild(newInput);
      newDiv.appendChild(addButton);
      newDiv.appendChild(deleteButton);

      // Menambahkan div baru ke halaman
      document.body.appendChild(newDiv);
      attributeCount++;
    } else {
      alert("Maksimal 10 kolom.");
    }
  }

  function removeAttribute(element) {
    element.parentElement.remove();
    attributeCount--;
  }
document.addEventListener('DOMContentLoaded', function () {
    // Fungsi untuk mendapatkan semua objek dari kategori input yang ada
    function getObjectOptions() {
        const objects = [];
    
        // Collect objects from various input containers
        document.querySelectorAll(
            '#actor-container input, ' + 
            '#boundary-container input, ' + 
            '#controller-container input, ' + 
            '#entity-container input'
        ).forEach(input => {
            if (input.value.trim()) objects.push(input.value.trim());
        });
    
        return [...new Set(objects)];  // Remove duplicates
    }

    // Fungsi untuk mengisi dropdown dengan opsi objek
    function populateDropdown(dropdownId) {
        const dropdown = document.getElementById(dropdownId);
        if (!dropdown) {
            console.warn(`Dropdown dengan ID ${dropdownId} tidak ditemukan.`);
            return;  // Keluar dari fungsi jika elemen tidak ada
        }

        const objects = getObjectOptions();

        // Kosongkan dropdown sebelumnya
        dropdown.innerHTML = '<option value="">Choose object</option>';

        // Tambahkan opsi baru ke dropdown
        objects.forEach(object => {
            const option = document.createElement('option');
            option.textContent = object;
            option.value = object;
            dropdown.appendChild(option);
        });
    }

    // Fungsi untuk memperbarui semua dropdown saat input berubah
    function updateAllDropdowns() {
        // Ganti ID dropdown sesuai kebutuhan proyek
        const dropdownIds = [
            'object-start-basic-path-1',
            'object-end-basic-path-1',
            'object-start-alternative-path-1',
            'object-end-alternative-path-1',
            'else-object-start-alternative-path-1',
            'else-object-end-alternative-path-1',
        ];
    
        dropdownIds.forEach(id => populateDropdown(id));
    }

    // Pasang event listener untuk setiap input yang ada saat ini
    function attachInputListeners() {
        const inputs = document.querySelectorAll('#actor-container input, #boundary-container input, #controller-container input, #entity-container input');

        inputs.forEach(input => {
            input.addEventListener('input', updateAllDropdowns);
        });
    }

    // Gunakan MutationObserver untuk mendeteksi penambahan elemen baru
    const observerConfig = { childList: true, subtree: true };
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length) {
                // Pasang ulang event listener saat elemen baru ditambahkan
                attachInputListeners();
                updateAllDropdowns();
            }
        });
    });

    // Observasi perubahan pada container input
    const containers = document.querySelectorAll('#actor-container, #boundary-container, #controller-container, #entity-container');
    containers.forEach(container => observer.observe(container, observerConfig));

    // Pasang listener pada input awal dan isi dropdown
    attachInputListeners();
    updateAllDropdowns();

    // Mengirim data form
    const form = document.getElementById('sequence-form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Mencegah pengiriman form secara default

            // Ambil data dari form
            const formData = new FormData(form);

            // Tambahkan input tambahan dari dropdown
            const basicPaths = [];
            const basicPathInputs = document.querySelectorAll('[name="basic_path_input"]');
            basicPathInputs.forEach(input => {
                basicPaths.push(input.value);
            });

            const interactionLabels = [];
            basicPaths.forEach((_, index) => {
                const interactionLabel = document.getElementById(`basic-path-input-${index + 1}`).value;
                interactionLabels.push(interactionLabel);
            });

            // Ambil data alternative paths dan else paths dari form (misalnya menggunakan querySelectorAll)
            const alternativePaths = [];
            const elsePaths = [];

            // Menambahkan alternatif jalur
            const alternativePathInputs = document.querySelectorAll('[name="alternative_path_input"]');
            alternativePathInputs.forEach(input => {
                if (input.value.trim()) {  // Pastikan nilai input tidak kosong
                    alternativePaths.push(input.value);
                }
            });

            // Menambahkan else jalur
            const elsePathInputs = document.querySelectorAll('[name="else_path_input"]');
            elsePathInputs.forEach(input => {
                if (input.value.trim()) {  // Pastikan nilai input tidak kosong
                    elsePaths.push(input.value);
                }
            });

            // Siapkan data yang akan dikirim ke server
            const dataToSend = {
                actor: getObjectOptions(),
                boundary: getObjectOptions(),
                controller: getObjectOptions(),
                entity: getObjectOptions(),
                basic_path: basicPaths,
                basic_path_input: interactionLabels,
                alternative_paths: alternativePaths,  // Menambahkan alternative paths
                else_paths: elsePaths               // Menambahkan else paths
            };

            // Log data yang akan dikirim ke server untuk debugging
            console.log('Data yang akan dikirim:', dataToSend);

            // Kirim data ke server menggunakan Fetch API
            fetch('/generate-sequence-diagram/', {
                method: 'POST',
                body: JSON.stringify(dataToSend),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Tampilkan diagram yang berhasil dibuat
                    const imageUrl = data.image_url;
                    document.getElementById('diagram-image').src = imageUrl;
                    console.log('Diagram generated successfully!');
                } else {
                    console.error('Error generating diagram:', data.error);
                }
            })
            .catch(error => {
                console.error('Request failed:', error);
            });
        });
    } else {
        console.error("Form tidak ditemukan.");
    }
});

// Variabel global untuk menyimpan data alternatif path
let pathsData = [];

// Fungsi untuk menambahkan alternatif path baru
function addAlternativePath() {
    const pathId = `path-${pathsData.length + 1}`;
    const pathContainer = document.getElementById("alternativePathsContainer");

    // Template untuk alternatif path baru
    const pathTemplate = `
        <div id="${pathId}" class="alternative-path">
            <h4>Alternative Path ${pathsData.length + 1}</h4>
            <textarea placeholder="Describe the alternative flow here..."></textarea>
            <button onclick="addElse('${pathId}')">Add Else</button>
            <div class="else-container"></div>
            <button onclick="removePath('${pathId}')">Remove Alternative Path</button>
        </div>
    `;

    pathContainer.insertAdjacentHTML("beforeend", pathTemplate);

    // Simpan data baru
    pathsData.push({ id: pathId, elseBlocks: [] });
}

// Fungsi untuk menambahkan else pada path tertentu
function addElse(pathId) {
    const path = pathsData.find(p => p.id === pathId);
    const elseId = `else-${path.elseBlocks.length + 1}`;
    const pathElement = document.getElementById(pathId);
    const elseContainer = pathElement.querySelector(".else-container");

    // Template untuk else block
    const elseTemplate = `
        <div id="${elseId}" class="else-block">
            <h5>Else Block ${path.elseBlocks.length + 1}</h5>
            <textarea placeholder="Describe the else case..."></textarea>
            <button onclick="removeElse('${pathId}', '${elseId}')">Remove Else</button>
        </div>
    `;

    elseContainer.insertAdjacentHTML("beforeend", elseTemplate);

    // Simpan data else baru
    path.elseBlocks.push({ id: elseId });
}

// Fungsi untuk menghapus alternatif path
function removePath(pathId) {
    // Hapus elemen dari DOM
    const pathElement = document.getElementById(pathId);
    pathElement.remove();

    // Hapus dari data
    pathsData = pathsData.filter(p => p.id !== pathId);
}

// Fungsi untuk menghapus else dari path tertentu
function removeElse(pathId, elseId) {
    const path = pathsData.find(p => p.id === pathId);
    const elseElement = document.getElementById(elseId);

    // Hapus elemen dari DOM
    elseElement.remove();

    // Hapus dari data
    path.elseBlocks = path.elseBlocks.filter(e => e.id !== elseId);
}

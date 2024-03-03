document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const category = document.getElementById("category").value.trim();
    if (category === "") {
        alert("Por favor ingrese una categoría de imágenes.");
        return;
    }
    searchImages(category);
});

let currentPage = 1;
const perPage = 24;

function searchImages(category, page = 1) {
    const apiKey = "42648826-d0c13b88346a573f874b12305"; 
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(category)}&per_page=${perPage}&page=${page}`;
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        displayImages(data.hits);
        currentPage = page;
    })
    .catch(error => {
        console.error('Error al buscar imágenes:', error);
    });
}

function displayImages(images) {
    const thumbnailsContainer = document.getElementById("thumbnails");
    thumbnailsContainer.innerHTML = "";
    images.forEach(image => {
        const thumbnail = document.createElement("div");
        thumbnail.classList.add("thumbnail");
        const img = document.createElement("img");
        img.src = image.previewURL;
        img.alt = image.tags;
        img.addEventListener("click", () => openModal(image.largeImageURL));
        thumbnail.appendChild(img);
        thumbnailsContainer.appendChild(thumbnail);
    });
}

function openModal(imgSrc) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modalImg");
    modal.style.display = "block";
    modalImg.src = imgSrc;
}

document.querySelector(".close").addEventListener("click", () => closeModal());

window.addEventListener("click", (event) => {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        closeModal();
    }
});

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}

document.getElementById("prevBtn").addEventListener("click", () => {
    if (currentPage > 1) {
        searchImages(document.getElementById("category").value, currentPage - 1);
    }
});

document.getElementById("nextBtn").addEventListener("click", () => {
    searchImages(document.getElementById("category").value, currentPage + 1);
});

const apiUrl = 'https://jsonplaceholder.typicode.com/photos';
let page = 1;
const limit = 10; // Number of images to load per scroll

// Function to fetch and display images
async function loadImages() {
    try {
        const response = await fetch(`${apiUrl}?_page=${page}&_limit=${limit}`);
        if (!response.ok) {
            throw new Error('Failed to fetch images');
        }
        const images = await response.json();
        displayImages(images);
        page++;
    } catch (error) {
        console.error(error);
    }
}

// Function to display images on the page
function displayImages(images) {
    const gallery = document.getElementById('gallery');
    images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.thumbnailUrl;
        imgElement.alt = image.title;
        gallery.appendChild(imgElement);
    });
}

// Infinite scrolling: load more images when near the bottom
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadImages();
    }
});

// Load initial images
loadImages();

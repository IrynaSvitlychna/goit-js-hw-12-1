import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import axios from "axios";

const api = axios.create({
  baseURL: "https://pixabay.com/api/",
  params: {
    key: "41942157-8ce243761fb563c2a1b85d8a4",
    language: "en",
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
  },
});

const searchForm = document.getElementById("search-form");
const imageGallery = document.getElementById("image-gallery");
const loadMoreButton = document.getElementById("load-more");
const loadMoreSpinner = document.getElementById("spinner");
let lightbox;
let currentPage = 1;
let pageSize = 40;
let currentQuery = "";
let isLastPage = false;

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = new FormData(event.currentTarget).get("query");
  if (!query) return;

  currentQuery = query;
  currentPage = 1;

  try {
    toggleSpinner(true);
    const data = await fetchImages();
    displayImages(data);
  } catch (error) {
    showError();
  } finally {
    toggleSpinner(false);
  }
});

loadMoreButton.addEventListener("click", async () => {
  currentPage += 1;
  await fetchAndDisplayImages();

  if (isLastPage) {
    loadMoreButton.classList.add('is-hidden');
    theEnd();
  } 
});

async function fetchImages() {
  const response = await api.get("", {
    params: {
      q: currentQuery,
      page: currentPage,
      per_page: pageSize,
    },
  });
  return response.data;
}

async function fetchAndDisplayImages() {
  try {
    toggleSpinner(true);
    const data = await fetchImages();
    appendImages(data.hits);
  } catch (error) {
    showError();
  } finally {
    toggleSpinner(false);
  }
}

function displayImages(data) {
  const images = data.hits;

  if (images.length === 0) {
    showError();
    return;
  }

  isLastPage = (data.totalHits <= currentPage * pageSize);
  loadMoreButton.classList.remove("is-hidden");
  toggleSpinner(false);

  const imageElements = images.map(createImageElement);
  imageGallery.innerHTML = "";
  imageGallery.append(...imageElements);

  initializeLightbox();
}

function appendImages(images) {
  if (images.length === 0) {
    isLastPage = true;
    loadMoreButton.classList.add("is-hidden");
    toggleSpinner(false);
    theEnd();
    return;
  }

  const imageElements = images.map(createImageElement);
  imageGallery.append(...imageElements);
  initializeLightbox();
}

function createImageElement(image) {
  const link = document.createElement("a");
  link.href = image.webformatURL;
  link.setAttribute("data-lightbox", "image-gallery");
  link.innerHTML = `
    <div class="gallery-item">
      <img src="${image.webformatURL}" alt="${image.tags}">
      <div class="image-info">
        <div class="img-info-item">
          <p>Likes:</p>
          <p>${image.likes}</p>
        </div>
        <div class="img-info-item">
          <p>Views: </p>
          <p>${image.views}</p>
        </div>
        <div class="img-info-item">
          <p>Comments: </p>
          <p>${image.comments}</p>
        </div>
        <div class="img-info-item">
          <p>Downloads: </p>
          <p>${image.downloads}</p>
        </div>
      </div>
    </div>
  `;
  return link;
}

function initializeLightbox() {
  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a');
  }
}

function theEnd() {
  iziToast.info({
    title: "Info",
    message: "There are no more images for your request.",
  });
}

function toggleSpinner(show) {
  loadMoreSpinner.classList.toggle("is-hidden", !show);
}

function showError() {
  imageGallery.innerHTML = "";
  iziToast.error({
    title: "Error",
    message: "Sorry, there are no images matching your search query. Please try again!",
  });
}






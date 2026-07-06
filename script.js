/*
  BEGINNER EDIT AREA
  Change model names, prices, descriptions, and photo paths below.
  Add photos by placing image files inside images/model1, images/model2, etc.
  Use these exact filenames for each model folder:
  cover.jpeg, detail-a.jpeg, detail-b.jpeg, detail-c.jpeg
*/
function photo(folder, name) {
  return {
    src: `${folder}/${name}.jpeg`
  };
}

function modelImages(modelNumber) {
  const folder = `images/model${modelNumber}`;
  return {
    cover: photo(folder, "cover"),
    gallery: [
      photo(folder, "cover"),
      photo(folder, "detail-a"),
      photo(folder, "detail-b"),
      photo(folder, "detail-c")
    ]
  };
}

const models = [
  {
    id: "model-1",
    name: "Long Pipe",
    wholesale: "$20",
    msrp: "$40",
    description: "A 6.5-inch pipe with a long stem.",
    ...modelImages(1)
  },
  {
    id: "model-2",
    name: "Maze Pipe",
    wholesale: "$20",
    msrp: "$40",
    description: "A 5.5-inch long geometric pipe often described as looking like the Death Star from Star Wars.",
    ...modelImages(2)
  },
  {
    id: "model-3",
    name: "Skull Pipe",
    wholesale: "$20",
    msrp: "$40",
    description: "A 5.5-inch long scary-looking skull pipe with a skull on the bowl and a skull on the stem.",
    ...modelImages(3)
  },
  {
    id: "model-4",
    name: "Diamond Pipe",
    wholesale: "$15",
    msrp: "$30",
    description: "A 5-inch long diamond-shaped pipe.",
    ...modelImages(4)
  },
  {
    id: "model-5",
    name: "Alien Pipe",
    wholesale: "$15",
    msrp: "$30",
    description: "A 4.5-inch alien smoking pipe with an alien face on the front of the bowl and an alien face on the stem.",
    ...modelImages(5)
  },
  {
    id: "model-6",
    name: "Mini bulbous Pipe",
    wholesale: "$10",
    msrp: "$20",
    description: "A 4-inch long mini pipe with a bulbous shape.",
    ...modelImages(6)
  },
  {
    id: "model-7",
    name: "Mini Diamond Pipe",
    wholesale: "$5",
    msrp: "$10",
    description: "A 3.5-inch long mini diamond-shaped pipe. A mini version of the diamond pipe.",
    ...modelImages(7)
  }
];

const modelCards = document.querySelector("#modelCards");
const modelSections = document.querySelector("#modelSections");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const closeButton = document.querySelector(".lightbox-close");
const prevButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let activeGallery = [];
let activeIndex = 0;

function renderCards() {
  modelCards.innerHTML = models
    .map(
      (model) => `
        <button class="model-card" type="button" data-target="${model.id}">
          <span class="image-wrap">
            <img src="${model.cover.src}" alt="${model.name} ceramic pipe">
          </span>
          <span class="model-card-body">
            <h3>${model.name}</h3>
            <p>Wholesale ${model.wholesale}</p>
          </span>
        </button>
      `
    )
    .join("");
}

function renderModelSections() {
  modelSections.innerHTML = models
    .map(
      (model) => `
        <article id="${model.id}" class="model-section">
          <div class="model-copy">
            <p class="eyebrow">Model ${models.indexOf(model) + 1}</p>
            <h3>${model.name}</h3>
            <p>${model.description}</p>
            <div class="price-row" aria-label="${model.name} pricing">
              <div class="price-box">
                <span>Wholesale</span>
                <strong>${model.wholesale}</strong>
              </div>
              <div class="price-box">
                <span>MSRP</span>
                <strong>${model.msrp}</strong>
              </div>
            </div>
          </div>
          <div class="gallery" aria-label="${model.name} image gallery">
            ${model.gallery
              .map(
                (image, imageIndex) => `
                  <button class="gallery-button" type="button" data-model="${model.id}" data-index="${imageIndex}">
                    <img src="${image.src}" alt="${model.name} gallery image ${imageIndex + 1}">
                    <span class="image-price" aria-label="Wholesale price ${model.wholesale}">${model.wholesale}</span>
                  </button>
                `
              )
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function openLightbox(modelId, index) {
  const model = models.find((item) => item.id === modelId);
  activeGallery = model.gallery;
  activeIndex = Number(index);
  updateLightboxImage();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  document.body.style.overflow = "";
}

function updateLightboxImage() {
  lightboxImage.src = activeGallery[activeIndex].src;
  lightboxImage.alt = `Expanded ceramic model image ${activeIndex + 1}`;
}

function moveLightbox(step) {
  activeIndex = (activeIndex + step + activeGallery.length) % activeGallery.length;
  updateLightboxImage();
}

renderCards();
renderModelSections();

modelCards.addEventListener("click", (event) => {
  const card = event.target.closest(".model-card");
  if (!card) return;
  document.querySelector(`#${card.dataset.target}`).scrollIntoView({ behavior: "smooth" });
});

modelSections.addEventListener("click", (event) => {
  const button = event.target.closest(".gallery-button");
  if (!button) return;
  openLightbox(button.dataset.model, button.dataset.index);
});

closeButton.addEventListener("click", closeLightbox);
prevButton.addEventListener("click", () => moveLightbox(-1));
nextButton.addEventListener("click", () => moveLightbox(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

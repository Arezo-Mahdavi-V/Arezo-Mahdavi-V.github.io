'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables (portfolio - optional)
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select && selectValue && selectItems.length && filterBtn.length && filterItems.length) {
  select.addEventListener("click", function () { elementToggleFunc(this); });

  const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "all" || selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  };

  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }

  let lastClickedBtn = filterBtn[0];
  for (let i = 0; i < filterBtn.length; i++) {
    filterBtn[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterFunc(selectedValue);

      lastClickedBtn.classList.remove("active");
      this.classList.add("active");
      lastClickedBtn = this;
    });
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const target = (this.dataset.target || this.textContent).toLowerCase().trim();

    pages.forEach((page) => {
      page.classList.toggle("active", page.dataset.page === target);
    });

    navigationLinks.forEach((nav) => nav.classList.remove("active"));
    this.classList.add("active");

    window.scrollTo(0, 0);
  });
});


(() => {
  const blogPage = document.querySelector('article.projects');
  if (!blogPage) return;

  const blogItems = blogPage.querySelectorAll('[data-blog-item]');
  const filterBtns = blogPage.querySelectorAll('[data-blog-filter-btn]');
  const selectBtn = blogPage.querySelector('[data-blog-select]');
  const selectValue = blogPage.querySelector('[data-blog-select-value]');
  const selectItems = blogPage.querySelectorAll('[data-blog-select-item]');

  const modalContainer = blogPage.querySelector('[data-blog-modal-container]');
  const modalOverlay = blogPage.querySelector('[data-blog-modal-overlay]');
  const modalCloseBtn = blogPage.querySelector('[data-blog-modal-close-btn]');
  const modalTitle = blogPage.querySelector('[data-blog-modal-title]');
  const modalText = blogPage.querySelector('[data-blog-modal-text]');
  const openLinks = blogPage.querySelectorAll('[data-blog-open]');

  // Filter function
  const applyBlogFilter = (filter) => {
    blogItems.forEach((item) => {
      const match = filter === 'all' || item.dataset.blogCategory === filter;
      item.classList.toggle('active', match);
    });

    filterBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.blogFilter === filter);
    });

    if (selectValue) {
      selectValue.textContent = filter === 'all' ? 'All' :
        filter === 'research' ? 'Energy Material Studies' :
        filter === 'materials' ? 'Molten Salt Electrochemistry' :
        filter === 'electrochemistry' ? 'Energy Harvesting' : filter;
    }
  };

  // Desktop filter buttons
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => applyBlogFilter(btn.dataset.blogFilter));
  });

  // Mobile select dropdown
  if (selectBtn) {
    selectBtn.addEventListener('click', () => selectBtn.classList.toggle('active'));
  }

  selectItems.forEach((itemBtn) => {
    itemBtn.addEventListener('click', () => {
      const filter = itemBtn.dataset.blogFilter;
      applyBlogFilter(filter);
      selectBtn?.classList.remove('active');
    });
  });

  // Modal logic
  const openModal = (title, text) => {
    modalTitle.textContent = title || '';
    modalText.innerHTML = text || '';
    modalContainer.classList.add('active');
  };

  const closeModal = () => modalContainer.classList.remove('active');

  openLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const item = link.closest('[data-blog-item]');
      const title = item?.querySelector('.blog-item-title')?.textContent.trim();
      const full = item?.querySelector('.blog-full-text')?.innerHTML.trim()
        || item?.querySelector('.blog-text')?.innerHTML.trim();
      openModal(title, full);
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Initialize with 'all'
  applyBlogFilter('all');
})();


// Slideshow functionality
(() => {
  const galleryPage = document.querySelector('article.gallery');
  if (!galleryPage) return;

  const slides = [
    { src: './assets/images/gallery-1.jpg', alt: 'About image 1' },
    { src: './assets/images/blog-4.jpg', alt: 'About image 2' },
    { src: './assets/images/blog-5.jpg', alt: 'About image 3' },
    // Add more slides as needed
  ];

  const slideImg = galleryPage.querySelector('[data-slide-img]');
  const prevBtn = galleryPage.querySelector('[data-slide-prev]');
  const nextBtn = galleryPage.querySelector('[data-slide-next]');
  const dotsContainer = galleryPage.querySelector('[data-slide-dots]');

  if (!slideImg || !dotsContainer) return;

  let currentSlide = 0;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = `slide-dot ${i === 0 ? 'active' : ''}`;
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('.slide-dot');

  function updateSlide() {
    slideImg.src = slides[currentSlide].src;
    slideImg.alt = slides[currentSlide].alt;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function goToSlide(n) {
    currentSlide = (n + slides.length) % slides.length;
    updateSlide();
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  prevBtn?.addEventListener('click', prevSlide);
  nextBtn?.addEventListener('click', nextSlide);

  updateSlide();
})();
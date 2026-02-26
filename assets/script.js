document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Universal Active Link Highlight ---
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Match exact path
        if(linkPath === currentPath) {
            link.classList.add('active');
            
            // If it's a dropdown item, also highlight the parent "Explore"
            const parentDropdown = link.closest('.dropdown');
            if(parentDropdown) {
                parentDropdown.querySelector('.dropdown-toggle').classList.add('active');
            }
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const toggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('nav-menu');

    if(toggle) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Change icon from hamburger to X
            if(nav.classList.contains('active')) {
                toggle.textContent = '✕';
            } else {
                toggle.textContent = '☰';
            }
        });
    }

    // --- 3. Mobile Dropdown Toggle ---
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(dt => {
        dt.addEventListener('click', (e) => {
            if (window.getComputedStyle(toggle).display !== 'none') {
                e.preventDefault(); 
                const parent = dt.parentElement;
                parent.classList.toggle('open');
            }
        });
    });

    // --- 4. Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if(href.length > 1 && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if(target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // --- 5. Auto-Update Copyright Year ---
    const yearSpan = document.querySelector('.bbp-bottom');
    if(yearSpan) {
        const currentYear = new Date().getFullYear();
        if(!yearSpan.innerHTML.includes(currentYear)) {
             yearSpan.innerHTML = yearSpan.innerHTML.replace(/\d{4}/, currentYear);
        }
    }

    // --- 6. RENTAL INQUIRY TOGGLE ---
    const inquiryBtns = document.querySelectorAll('.inquiry-toggle');
    
    inquiryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.zigzag-content');
            const form = parent.querySelector('.inquiry-form-wrap');
            
            if(form) {
                if(form.style.display === 'block') {
                    form.style.display = 'none';
                    this.textContent = 'Check Availability ▾';
                } else {
                    form.style.display = 'block';
                    this.textContent = 'Close Form ▴';
                }
            }
        });
    });

    // --- 7. GALLERY LOGIC (SCROLL & LIGHTBOX) ---
    
    // Part A: Gallery Scroll Buttons
    const galleryStrip = document.getElementById('gallery-strip');
    const btnPrev = document.getElementById('gal-prev');
    const btnNext = document.getElementById('gal-next');

    if (galleryStrip && btnPrev && btnNext) {
        btnNext.addEventListener('click', () => {
            galleryStrip.scrollBy({ left: 300, behavior: 'smooth' });
        });

        btnPrev.addEventListener('click', () => {
            galleryStrip.scrollBy({ left: -300, behavior: 'smooth' });
        });
    }

    // Part B: Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('lightbox-close');

    if(lightbox) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightboxImg.src = item.src;
                lightbox.classList.add('active');
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            setTimeout(() => { lightboxImg.src = ''; }, 300); 
        };

        if(closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if(e.target === lightbox) {
                closeLightbox();
            }
        });
    }
});

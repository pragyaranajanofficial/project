document.addEventListener('DOMContentLoaded', function() {
    const projectContainer = document.querySelector('.project-slides');
    const totalImages = 19;
    let autoPlayInterval;

    // Generate project slides dynamically
    for(let i = 1; i <= totalImages; i++) {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project';
        if(i === 1) projectDiv.classList.add('active');
        
        if(i === 14) {
            projectDiv.innerHTML = `
                <video width="100%" controls>
                    <source src="14.mp4" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="project-info">
                    <h2>Project ${i}</h2>
                    <p>Description of project ${i}</p>
                </div>
            `;
        } else {
            projectDiv.innerHTML = `
                <img src="${i}.png" alt="Project ${i}" loading="lazy">
                <div class="project-info">
                    <h2>Project ${i}</h2>
                    <p>Description of project ${i}</p>
                </div>
            `;
        }
        projectContainer.appendChild(projectDiv);
    }

    let currentSlide = 1;
    const totalSlides = document.querySelectorAll('.project').length;
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const counter = document.getElementById('projectCounter');

    function showSlide(n) {
        const slides = document.querySelectorAll('.project');
        
        if (n > totalSlides) currentSlide = 1;
        if (n < 1) currentSlide = totalSlides;

        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.display = 'none';
        });
        
        slides[currentSlide - 1].style.display = 'block';
        setTimeout(() => {
            slides[currentSlide - 1].classList.add('active');
        }, 10);
        
        counter.textContent = `${currentSlide}/${totalSlides}`;

        // Pause video when switching slides
        slides.forEach(slide => {
            const video = slide.querySelector('video');
            if (video) video.pause();
        });
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            showSlide(currentSlide += 1);
        }, 5000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        showSlide(currentSlide -= 1);
    });

    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        showSlide(currentSlide += 1);
    });

    // Show navigation elements
    prevBtn.style.display = 'block';
    nextBtn.style.display = 'block';
    counter.style.display = 'block';

    // Start autoplay
    startAutoPlay();

    // Pause autoplay when hovering over the gallery
    projectContainer.addEventListener('mouseenter', stopAutoPlay);
    projectContainer.addEventListener('mouseleave', startAutoPlay);

    // Initialize the first slide
    showSlide(currentSlide);

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            stopAutoPlay();
            showSlide(currentSlide -= 1);
        } else if (e.key === 'ArrowRight') {
            stopAutoPlay();
            showSlide(currentSlide += 1);
        }
    });
});
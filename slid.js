document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slider-content');
    const pages = document.querySelectorAll('.slider-page');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        pages.forEach((page, i) => {
            page.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    pages.forEach(page => {
        page.addEventListener('click', function () {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            showSlide(slideIndex);
        });
    });

    prevButton.addEventListener('click', function () {
        currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
        showSlide(currentSlide);
    });

    nextButton.addEventListener('click', function () {
        currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
        showSlide(currentSlide);
    });

    // Initial display
    showSlide(currentSlide);
});





function changeTestimonial(index) {
    const testimonials = [
        {
            image: 'images/testi-b1.webp',
            content: '"Studying at HSTU has been a life-changing experience. The supportive faculty and diverse student community have enriched my learning journey."',
            name: 'AYESHA HOQUE',
            position: 'Student, Department of Agriculture'
        },
        {
            image: 'images/testi-b2.webp',
            content: '"HSTU offers the perfect environment for academic and personal growth. I am proud to be a part of this prestigious institution."',
            name: 'MD. RAHIM UDDIN',
            position: 'Graduate, Faculty of Business Studies'
        },
        {
            image: 'images/testi-b3.webp',
            content: '"As a faculty member, I have witnessed the dedication and passion that our students bring to their studies every day. HSTU is truly a hub of knowledge."',
            name: 'DR. FARHANA AKTER',
            position: 'Faculty, Department of Computer Science and Engineering'
        },
        {
            image: 'images/testi-b1.webp',
            content: '"My time at HSTU has been incredibly rewarding. The collaborative environment and cutting-edge facilities have greatly contributed to my academic and personal growth."',
            name: 'Shabnaz Ela',
            position: 'Student, Department of Social Science'
        }
    ];

    const testimonialImage = document.getElementById('testimonial-image');
    const testimonialContent = document.getElementById('testimonial-content');

    testimonialImage.src = testimonials[index - 1].image;
    testimonialContent.innerHTML = `
        <p>${testimonials[index - 1].content}</p>
        <h4>${testimonials[index - 1].name}</h4>
        <p>${testimonials[index - 1].position}</p>
    `;
}

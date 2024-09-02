const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
        this.classList.toggle('active');
        const answer = this.nextElementSibling;
        const icon = this.querySelector('.faq-toggle-icon');

        if (answer.style.display === "block") {
            answer.style.display = "none";
            icon.style.transform = 'rotate(0deg)';
        } else {
            answer.style.display = "block";
            icon.style.transform = 'rotate(180deg)';
        }
    });
});

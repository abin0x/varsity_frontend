document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    const courseDetailsUrl = `https://varsity-s41t.onrender.com/api/courses/${courseId}`;
    const coursesListUrl = 'https://varsity-s41t.onrender.com/api/courses/';
    const enrollUrl = 'https://varsity-s41t.onrender.com/api/enrollments/';
    const enrollButton = document.getElementById('enroll-button');

    // Static Course Metadata
    const staticCourseMeta = {
        lessons: 10,
        time: '9.00 AM - 01.00 PM',
        students: '20+',
        courseFee: '$60',
        originalFee: '$120',
        guarantee: '29-Day Money-Back Guarantee',
        schedule: 'Monday - Friday',
        skillLevel: 'Basic',
        language: 'English',
        enrolled: 100,
        lectures: 80
    };

    // Initialize the page
    initializePage();

    function initializePage() {
        // Set Static Course Metadata
        setStaticCourseMeta();
        // Fetch and display dynamic course details
        fetchCourseDetails(courseId);
        // Fetch and display the list of courses
        fetchAndRenderCourseList();

        // Enroll button click event
        if (enrollButton) {
            enrollButton.addEventListener('click', function () {
                enrollInCourse(courseId);
            });
        }

        // Attach event listener for filter
        document.getElementById('department-filter').addEventListener('change', function () {
            fetchAndRenderCourseList(this.value);
        });
    }

    // Function to set static course metadata in the DOM
    function setStaticCourseMeta() {
        document.querySelector('.course-meta span:nth-child(2)').textContent = `Lesson ${staticCourseMeta.lessons}`;
        document.querySelector('.course-meta span:nth-child(3)').textContent = staticCourseMeta.time;
        document.querySelector('.course-meta span:nth-child(4)').textContent = `Students ${staticCourseMeta.students}`;
        document.querySelector('.course-fee p:nth-child(2)').innerHTML = `<span>${staticCourseMeta.courseFee}</span> <s>${staticCourseMeta.originalFee}</s>`;
        document.querySelector('.course-fee p:nth-child(3)').textContent = staticCourseMeta.guarantee;
        document.querySelector('.course-details p:nth-child(1)').textContent = `Start Date: 4:00 PM - 6:00 PM`; // Static Example
        document.querySelector('.course-details p:nth-child(2)').textContent = `Enrolled: ${staticCourseMeta.enrolled}`;
        document.querySelector('.course-details p:nth-child(3)').textContent = `Lectures: ${staticCourseMeta.lectures}`;
        document.querySelector('.course-details p:nth-child(4)').textContent = `Skill Level: ${staticCourseMeta.skillLevel}`;
        document.querySelector('.course-details p:nth-child(5)').textContent = `Class Day: ${staticCourseMeta.schedule}`;
        document.querySelector('.course-details p:nth-child(6)').textContent = `Language: ${staticCourseMeta.language}`;
    }

    // Function to fetch and display course details dynamically
    function fetchCourseDetails(courseId) {
        fetch(courseDetailsUrl)
            .then(response => response.json())
            .then(data => {
                // Update course details on the page
                document.getElementById('course-title').textContent = data.title;
                document.getElementById('course-description').textContent = data.description;
                document.getElementById('course-rating').textContent = `⭐ ${data.rating || 'N/A'}`;
                const imageUrl = data.image_url ? data.image_url : 'default-image-url';
                document.getElementById('course-img').src = imageUrl;
                document.getElementById('course-img').alt = data.title;
                document.getElementById('sidebar-img').src = imageUrl;
                document.getElementById('sidebar-img').alt = data.title;
            })
            .catch(error => {
                console.error('Error fetching course details:', error);
            });
    }

    // Function to fetch and display a list of courses
    function fetchAndRenderCourseList(filterDepartment = '') {
        let url = coursesListUrl;
        if (filterDepartment) {
            url += `?department=${encodeURIComponent(filterDepartment)}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const courseListContainer = document.getElementById('course-list');
                courseListContainer.innerHTML = '';  // Clear any previous content
                data.forEach(course => {
                    const courseCard = `
                        <div class="course-card">
                            <img src="${course.image_url || 'default-course-image.jpg'}" alt="${course.title}">
                            <div class="course-info">
                                <span>50+ Students</span>
                                <span class="rating">★★★★☆ (20+)</span>
                            </div>
                            <h3>${course.title}</h3>
                            <p>${course.description}</p>
                            <p>${course.department}</p>
                            <p>Created: ${course.created_at}</p>
                            <a href="course_details.html?id=${course.id}" class="enroll-now">Enroll Now</a>
                        </div>
                    `;
                    courseListContainer.insertAdjacentHTML('beforeend', courseCard);
                });
            })
            .catch(error => {
                console.error('Error fetching course list:', error);
            });
    }

    // Function to handle course enrollment
    function enrollInCourse(courseId) {
        const authToken = localStorage.getItem('auth_token');
    
        if (!authToken) {
            showModal('Please log in or sign up to enroll in the course.', 'login.html');
            return;
        }
    
        const csrfToken = getCookie('csrftoken'); // Retrieve CSRF token
    
        fetch(enrollUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken, // Send CSRF token
                'Authorization': `Token ${authToken}` // Send auth token
            },
            body: JSON.stringify({ course: courseId })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData; // Throw error data for proper error handling
                });
            }
            return response.json();
        })
        .then(data => {
            showModal('You have successfully enrolled in the course!');
        })
        .catch(error => {
            console.error('Error enrolling in course:', error);
            const errorMessage = error.detail || 'Failed to enroll. You may have already enrolled in this course.';
            showModal(errorMessage);
        });
    }
    
    // Helper function to get CSRF token from cookies
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    
    // Modal functionality
    const modal = document.getElementById('enrollment-modal');
    const closeBtn = document.querySelector('.modal .close');

    function showModal(message, redirectUrl = null) {
        const modalMessage = document.getElementById('modal-message');
        modalMessage.textContent = message;
        modal.style.display = 'block';

        if (redirectUrl) {
            // Automatically redirect after showing the modal
            setTimeout(() => {
                window.location.href = redirectUrl;
            }, 2000); // Delay before redirecting
        }
    }

    closeBtn.onclick = function () {
        modal.style.display = 'none';
    };

    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});




document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});

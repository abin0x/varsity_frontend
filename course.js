document.addEventListener('DOMContentLoaded', function () {
    const coursesContainer = document.getElementById('course-list');
    const departmentFilter = document.getElementById('department-filter');
    const apiUrl = 'https://varsity-s41t.onrender.com/api/courses/';

    function truncateDescription(description, wordLimit) {
        const words = description.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return description;
    }

    function createCourseCard(course) {
        const description = truncateDescription(course.description, 8);
        const imageUrl = course.image_url || 'path/to/default/image.png';

        return `
            <div class="course-card">
                <div class="badge">${course.department}</div>
                <img src="${imageUrl}" alt="${course.title}">
                <div class="course-content">
                    <div class="course-info">
                        <span>50+ Students</span>
                        <span class="rating">★★★★☆ (20+)</span>
                    </div>
                    <h3>${course.title}</h3>
                    <p>${description}</p>
                    <p>Department: ${course.department}</p>
                    <p>Created: ${course.created_at}</p>
                    <button class="enroll-now" data-id="${course.id}">Enroll Now →</button>
                </div>
            </div>
        `;
    }

    function fetchCourses(department) {
        let url = apiUrl;
        if (department) {
            url += `?department=${encodeURIComponent(department)}`;
        }

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const coursesHtml = data.map(createCourseCard).join('');
                    coursesContainer.innerHTML = coursesHtml;

                    // Add event listeners to each "Enroll Now" button after rendering the courses
                    const enrollButtons = document.querySelectorAll('.enroll-now');
                    enrollButtons.forEach(button => {
                        button.addEventListener('click', function () {
                            const courseId = this.dataset.id;
                            showCourseDetails(courseId);
                        });
                    });
                } else {
                    coursesContainer.innerHTML = '<p>No courses available at the moment.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
                coursesContainer.innerHTML = '<p>Failed to load courses. Please try again later.</p>';
            });
    }

    function showCourseDetails(courseId) {
        const courseDetailsUrl = `${apiUrl}${courseId}/`; // Individual course details API endpoint

        fetch(courseDetailsUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch course details');
                }
                return response.json();
            })
            .then(course => {
                // Handle the course details (display in a modal or redirect to another page)
                // For example, you can redirect to a detailed page like this:
                window.location.href = `course_details.html?id=${course.id}`;
                
                // Alternatively, you could display course details in a modal or another section of the page.
                // Example:
                // showCourseDetailsModal(course);
            })
            .catch(error => {
                console.error('Error fetching course details:', error);
            });
    }

    // Initial load
    fetchCourses(); // Load all courses initially

    // Department filter
    departmentFilter.addEventListener('change', function () {
        const selectedDepartment = this.value;
        fetchCourses(selectedDepartment);
    });
});

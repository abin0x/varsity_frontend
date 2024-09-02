const fetchTeacherDashboardData = () => {
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        console.log('No authentication token found.');
        return;
    }

    fetch('https://varsity-s41t.onrender.com/api/teacher/dashboard/', {
        method: 'GET',
        headers: {
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        const dashboardContainer = document.getElementById('teacher-dashboard');

        const coursesCreated = Array.isArray(data.courses_created) ? data.courses_created : [];
        const assignmentsCreated = Array.isArray(data.assignments_created) ? data.assignments_created : [];
        const notificationsCreated = Array.isArray(data.notifications_created) ? data.notifications_created : [];
        const studentCountPerCourse = data.student_count_per_course || [];
        const assignmentSubmissionCount = data.assignment_submission_count || 0;
        const blogCount = data.blog_count || 0;
        const blogs = Array.isArray(data.blogs) ? data.blogs : [];
        const researchPaperCount = data.research_paper_count || 0;
        const researchPapers = Array.isArray(data.research_papers) ? data.research_papers : [];
        const crNotifications = Array.isArray(data.cr_notifications) ? data.cr_notifications : [];
        

        dashboardContainer.innerHTML = `
            <div class="dashboard-container">
                <!-- First Row: Summary Cards -->
                <div class="dashboard-row">
                    <div class="dashboard-card">
                        <h3>Courses Created</h3>
                        <p>${coursesCreated.length}</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Assignments Created</h3>
                        <p>${assignmentsCreated.length}</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Notifications Created</h3>
                        <p>${notificationsCreated.length}</p>
                    </div>

                    <div class="dashboard-card">
                        <h3>Blogs Created</h3>
                        <p>${blogCount}</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Research Papers</h3>
                        <p>${researchPaperCount}</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>CR Notifications</h3>
                        <p>${crNotifications.length}</p>
                    </div>
                    <div class="dashboard-card">
                <h3>Student Enroll Per Course</h3>
                <ul>
                    ${Object.entries(studentCountPerCourse).map(([course, count]) => `<li>${course}: ${count} students</li>`).join('')}
                </ul>
            </div>
            <div class="dashboard-card">
                <h3>Assignment Submission Count</h3>
                <ul>
                    ${Object.entries(assignmentSubmissionCount).map(([assignment, count]) => `<li>${assignment}: ${count} submissions</li>`).join('')}
                </ul>
            </div>
                    
                </div>

                <!-- Second Row: Tables -->
                <div class="dashboard-row">
                    <!-- Courses Created Table Section -->
                    <div class="dashboard-card" style="flex: 1; margin-right: 10px;">
                        <h3>Courses Created</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Department</th>
                                    <th>Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${coursesCreated.map(course => `
                                    <tr>
                                        <td>${course.title}</td>
                                        <td>${course.description}</td>
                                        <td>${course.department}</td>
                                        <td><img src="${course.image_url}" alt="${course.title}" width="30"></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <!-- Assignments Created Table Section -->
                    <div class="dashboard-card" style="flex: 1;">
                        <h3>Assignments Created</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Due Date</th>
                                    <th>Course</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${assignmentsCreated.map(assignment => `
                                    <tr>
                                        <td>${assignment.title}</td>
                                        <td>${new Date(assignment.due_date).toLocaleDateString()}</td>
                                        <td>${assignment.course.title}</td>
                                        <td>${assignment.description}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                 <!-- CR Notifications Table Section -->
                    <div class="dashboard-card" style="flex: 1;">
                        <h3>CR Notifications</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Course</th>
                                    <th>File</th>
                                    <th>Created At</th>
                                    <th>Created By</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${crNotifications.map(crNotification => `
                                    <tr>
                                        <td>${crNotification.title}</td>
                                        <td>${crNotification.description}</td>
                                        <td>${crNotification.course_title || 'N/A'}</td>
                                        <td>
                                            ${crNotification.file ? `
                                                <a href="${crNotification.file}" target="_blank">View</a> |
                                                <a href="${crNotification.file}" download>Download</a>
                                            ` : 'No File'}
                                        </td>
                                        <td>${new Date(crNotification.created_at).toLocaleString()}</td>
                                        <td>${crNotification.created_by || 'N/A'}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Third Row: Notifications and Blogs -->
                <div class="dashboard-row">
                    <!-- Notifications Created Table Section -->
                    <div class="dashboard-card" style="flex: 1; margin-right: 10px;">
                        <h3>Notifications Created</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Message</th>
                                    <th>Course</th>
                                    
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${notificationsCreated.map(notification => `
                                    <tr>
                                        <td>${notification.title}</td>
                                        <td>${notification.message}</td>
                                        <td>${notification.course_title}</td>
                                        
                                        <td>${new Date(notification.created_at).toLocaleString()}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <!-- Blogs Created Table Section -->
                    <div class="dashboard-row">
                    
                    <div class="dashboard-card" style="flex: 1;">
                        <h3>Blogs Created</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th>Image</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${blogs.map(blog => `
                                    <tr>
                                        <td>${blog.title}</td>
                                        <td>${blog.content.substring(0, 100)}...</td>
                                        <td><img src="${blog.image_url}" alt="${blog.title}" width="50"></td>
                                        <td>${new Date(blog.created_at).toLocaleString()}</td>
                                        <td>${new Date(blog.updated_at).toLocaleString()}</td>
                                        <td>
                                            <button onclick="editBlog(${blog.id})">Edit</button>
                                            <button onclick="deleteBlog(${blog.id})">Delete</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Fourth Row: Research Papers -->
                <div class="dashboard-row">
                    <div class="dashboard-card">
                        <h3>Research Papers</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Created At</th>
                                    <th>Document</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${researchPapers.map(paper => `
                                    <tr>
                                        <td>${paper.title}</td>
                                        <td>${paper.author}</td>
                                        <td>${new Date(paper.created_at).toLocaleDateString()}</td>
                                        <td><a href="${paper.document}" target="_blank">View Document</a></td>
                                        <td><img src="${paper.img_url}" alt="${paper.title}" width="30"></td>
                                        <td>
                                            <button onclick="editPaper(${paper.id})">Edit</button>
                                            <button onclick="deletePaper(${paper.id})">Delete</button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    })
    .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
    });
};

// Edit blog function
const editBlog = (blogId) => {
    window.location.href = `/edit-blog.html?id=${blogId}`;
    // Refresh the page after redirecting
    setTimeout(() => {
        location.reload();
    }, 1000); // Delay added to ensure redirection happens before reload
};

// Edit paper function
const editPaper = (paperId) => {
    window.location.href = `/updatePaper.html?id=${paperId}`;
    // Refresh the page after redirecting
    setTimeout(() => {
        location.reload();
    }, 1000); // Delay added to ensure redirection happens before reload
};

// Delete blog function
const deleteBlog = (blogId) => {
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        console.log('No authentication token found.');
        return;
    }

    if (confirm('Are you sure you want to delete this blog?')) {
        fetch(`https://varsity-s41t.onrender.com/api/blog/${blogId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            alert('Blog deleted successfully!');
            fetchTeacherDashboardData(); // Refresh the dashboard data
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
};

// Delete paper function
const deletePaper = (paperId) => {
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        console.log('No authentication token found.');
        return;
    }

    if (confirm('Are you sure you want to delete this research paper?')) {
        fetch(`https://varsity-s41t.onrender.com/api/papers/${paperId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            alert('Research paper deleted successfully!');
            fetchTeacherDashboardData(); // Refresh the dashboard data
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
};

// Initialize the dashboard data
document.addEventListener('DOMContentLoaded', fetchTeacherDashboardData);


// abin 
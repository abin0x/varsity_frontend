const fetchStudentDashboardData = () => {
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        console.log('No authentication token found.');
        return;
    }

    fetch('https://varsity-s41t.onrender.com/api/student/dashboard/', {
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
        const dashboardContainer = document.getElementById('student-dashboard');

        const enrolledCourses = Array.isArray(data.enrolled_courses) ? data.enrolled_courses : [];
        const submittedAssignments = Array.isArray(data.submitted_assignments) ? data.submitted_assignments : [];
        const pendingAssignments = Array.isArray(data.pending_assignments) ? data.pending_assignments : [];
        const notifications = Array.isArray(data.notifications) ? data.notifications : [];
        const assignments = Array.isArray(data.assignments) ? data.assignments : [];
        const blogCount = data.blog_count || 0;
        const blogs = Array.isArray(data.blogs) ? data.blogs : [];
        const researchPaperCount = data.research_paper_count || 0;
        const researchPapers = Array.isArray(data.research_papers) ? data.research_papers : [];
        const crNotificationsCount = data.crnotifications_count || 0;
        const crNotifications = Array.isArray(data.crnotifications) ? data.crnotifications : [];
        

        dashboardContainer.innerHTML = `
            <div class="dashboard-container">
                <!-- First Row: Summary Cards -->
                <div class="dashboard-row">
                    <div class="dashboard-card">
                        <h3>Courses Enrolled</h3>
                        <p>${enrolledCourses.length}</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Assignments Submitted</h3>
                        <p>${submittedAssignments.length}</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Pending Assignments</h3>
                        <p>${pendingAssignments.length}</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Notifications Received</h3>
                        <p>${notifications.length}</p>
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
                        <h3>CR Notification</h3>
                        <p>${crNotificationsCount}</p>
                    </div>
                </div>

                <!-- Second Row: Tables -->
                <div class="dashboard-row">
                    <!-- Enrolled Courses Table Section -->
                    <div class="dashboard-card" style="flex: 1; margin-right: 10px;">
                        <h3>Enrolled Courses</h3>
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
                                ${enrolledCourses.map(course => `
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
                    
                    <!-- Submitted Assignments Table Section -->
                    <div class="dashboard-card" style="flex: 1;">
                        <h3>Submitted Assignments</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Submitted At</th>
                                    <th>Course</th>
                                    <th>Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${submittedAssignments.map(assignment => `
                                    <tr>
                                        <td>${assignment.assignment.title}</td>
                                        <td>${new Date(assignment.submitted_at).toLocaleString()}</td>
                                        <td>${assignment.assignment.course.title}</td>
                                        <td>${assignment.description}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Third Row: Pending Assignments and Assignments -->
                <div class="dashboard-row">
                    <!-- Pending Assignments Table Section -->
                    <div class="dashboard-card" style="flex: 1; margin-right: 10px;">
                        <h3>Pending Assignments</h3>
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
                                ${pendingAssignments.map(assignment => `
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

                    <!-- Assignments Table Section -->
                    <div class="dashboard-card" style="flex: 1;">
                        <h3>Assignments</h3>
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
                                ${assignments.map(assignment => `
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

                <!-- Fourth Row: Notifications -->
                <div class="dashboard-row">
                    <div class="dashboard-card">
                        <h3>Notifications</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Message</th>
                                    <th>Course</th>
                                    <th>Teacher</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${notifications.map(notification => `
                                    <tr>
                                        <td>${notification.title}</td>
                                        <td>${notification.message}</td>
                                        <td>${notification.course_title}</td>
                                        <td>${notification.teacher_name}</td>
                                        <td>${new Date(notification.created_at).toLocaleString()}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                

                <!-- Fifth Row: CR Notifications -->
                <div class="dashboard-row">
                    <div class="dashboard-card">
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
                                ${crNotifications.map(notification => `
                                    <tr>
                                        <td>${notification.title}</td>
                                        <td>${notification.description}</td>
                                        <td>${notification.course_title}</td>
                                        <td>${notification.file}</td>
                                        <td>${new Date(notification.created_at).toLocaleString()}</td>
                                        <td>${notification.created_by}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Fifth Row: Blogs Created -->
                <div class="dashboard-row">
                    <div class="dashboard-card">
                        <h3>Blogs Created</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Content</th>
                                    <th>Image</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Actions</th> <!-- Add Actions Column -->
                                </tr>
                            </thead>
                            <tbody>
                                ${blogs.map(blog => `
                                    <tr>
                                        <td>${blog.title}</td>
                                        <td>${blog.content.substring(0, 100)}...</td> <!-- Show a preview of content -->
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
                <!-- Sixth Row: Research Papers -->
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
                                            <button onclick="papers(${paper.id})">Edit</button>
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
const papers = (paperId) => {
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
            // Refresh the page to reflect changes
            location.reload();
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

    if (confirm('Are you sure you want to delete this paper?')) {
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
            // Refresh the page to reflect changes
            location.reload();
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
};



// Fetch data when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', fetchStudentDashboardData);

// abin 
// hasan 


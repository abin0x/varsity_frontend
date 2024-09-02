const fetchCRDashboardData = () => {
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        console.log('No authentication token found.');
        return;
    }

    fetch('https://varsity-s41t.onrender.com/api/cr/dashboard/', {
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
        const dashboardContainer = document.getElementById('cr-dashboard');

        // Adjust this based on your API's response structure
        const courseCount = data.total_students || 0;
        const studentCount = data.total_crs || 0;
        const assignmentCount = data.notification_count || 0;
        const notifications = Array.isArray(data.notifications) ? data.notifications : [];

        dashboardContainer.innerHTML = `
            <div class="dashboard-container">
                <div class="dashboard-row">
                    <div class="dashboard-card">
                        <h3>Total Student</h3>
                        <p>${courseCount}</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Total CR</h3>
                        <p>${studentCount}</p>
                    </div>
                    <div class="dashboard-card">
                        <h3>Notifications Count</h3>
                        <p>${assignmentCount}</p>
                    </div>
                </div>

                <div class="dashboard-row">
                    <div class="dashboard-card">
                        <h3>Notifications</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Message</th>
                                    <th>Course</th>
                                    <th>File</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${notifications.map(notification => `
                                    <tr>
                                        <td>${notification.title}</td>
                                        <td>${notification.description}</td>
                                        <td>${notification.course_title} (${notification.course_code})</td>
                                        <td>
                                            ${notification.file ? `
                                                <a href="${notification.file}" target="_blank" class="see-link">See</a>
                                                <a href="${notification.file}" download class="download-link">Download</a>
                                            ` : 'No file available'}
                                        </td>
                                        <td>${new Date(notification.created_at).toLocaleString()}</td>
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
        console.error('There has been a problem with your fetch operation:', error);
    });
};

// Call the function to fetch and display the data
fetchCRDashboardData();

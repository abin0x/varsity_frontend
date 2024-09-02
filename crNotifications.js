document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://varsity-s41t.onrender.com/api/cr'; // API endpoint for fetching notifications
    const notificationContainer = document.getElementById('notification-container');
    const showMoreButton = document.getElementById('show-more-button');

    let notifications = [];
    let displayedCount = 0;
    const initialDisplayCount = 8;

    async function fetchNotifications() {
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${localStorage.getItem('auth_token')}` // Use auth token if required
                }
            });

            if (!response.ok) {
                const errorDetails = await response.text();
                console.error(`HTTP error! Status: ${response.status}, Details: ${errorDetails}`);
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            notifications = data; // Save all notifications
            notifications.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); // Sort by latest
            displayNotifications();
        } catch (error) {
            console.error('Error fetching notifications:', error);
            notificationContainer.innerHTML = '<p>Error fetching notifications. Please try again later.</p>';
        }
    }

    function displayNotifications() {
        const slice = notifications.slice(0, displayedCount + initialDisplayCount);
        notificationContainer.innerHTML = slice.map(notification => `
            <div class="notification-card">
                <h2>Title : ${notification.title}</h2>
                <p>Message : ${notification.description}</p>
                ${notification.course_title ? `<p><strong>Course:</strong> ${notification.course_title}</p>` : ''}
                ${notification.course_code ? `<p><strong>Course Code:</strong> ${notification.course_code}</p>` : ''}
                ${notification.file ? `<p><a href="${notification.file}" target="_blank">View File</a></p>` : ''}
                <small>${new Date(notification.created_at).toLocaleDateString()}</small>
                ${notification.created_by ? `<p><strong>Created By:</strong> ${notification.created_by}</p>` : ''}
            </div>
        `).join('');

        displayedCount += initialDisplayCount;

        // Hide the "Show More" button if all notifications are displayed
        if (displayedCount >= notifications.length) {
            showMoreButton.style.display = 'none';
        }
    }

    showMoreButton.addEventListener('click', () => {
        displayNotifications();
    });

    fetchNotifications();
});

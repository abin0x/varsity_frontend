document.addEventListener('DOMContentLoaded', () => {
    const notificationsTableBody = document.querySelector('#notifications-table tbody');
    const apiUrl = 'https://varsity-s41t.onrender.com/api/notifications/';
    const authToken = localStorage.getItem('auth_token'); // Assuming you store the auth token in local storage

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Authorization': 'Token ' + authToken,  // Send token
        },
    })
    .then(response => response.json())
    .then(notifications => {
        notificationsTableBody.innerHTML = notifications.map(notification => `
            <tr>
                <td>${notification.title}</td>
                <td>${notification.message}</td>
                <td>${notification.course_title}</td>
                <td>${notification.teacher_name}</td>
                <td>${new Date(notification.created_at).toLocaleString()}</td>
            </tr>
        `).join('');
    })
    .catch(err => {
        console.error('Error fetching notifications:', err);
    });
});

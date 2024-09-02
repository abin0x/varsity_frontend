// Fetch notifications from the API and display only those from the last 48 hours
fetch('https://varsity-s41t.onrender.com/api/notifications/')
    .then(response => response.json())
    .then(data => {
        const tickerContent = document.getElementById('notification-content');
        
        // Get the current date and time
        const now = new Date();

        // Function to format date and time
        const formatDateTime = (dateString) => {
            const date = new Date(dateString);
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        };

        // Filter notifications to include only those from the last 48 hours
        const filteredNotifications = data.filter(notification => {
            const notificationDate = new Date(notification.created_at);  // Assuming API provides `created_at` field
            const timeDifference = now - notificationDate;
            const hoursDifference = timeDifference / (1000 * 60 * 60); // Convert time difference to hours

            // Return only notifications from the last 48 hours
            return hoursDifference <= 48;
        });

        if (filteredNotifications.length > 0) {
            // Format notifications
            const formattedNotifications = filteredNotifications.map(notification => {
                return `${notification.title} | ${notification.message} | Thank You (${notification.teacher_name}) | ${formatDateTime(notification.created_at)}`;
            }).join(' | ');

            // Duplicate the content to ensure continuous scrolling
            tickerContent.innerHTML = formattedNotifications + ' | ' + formattedNotifications;
            
            // Ensure the ticker starts scrolling immediately
            const ticker = document.querySelector('.ticker-content');
            ticker.style.animationPlayState = 'running';
        } else {
            tickerContent.innerHTML = 'No recent notifications from the last 48 hours.';
        }
    })
    .catch(error => {
        console.error('Error fetching notifications:', error);
        document.getElementById('notification-content').innerHTML = 'Failed to load notifications.';
    });

// Pause and resume ticker scroll on hover
const tickerWrapper = document.querySelector('.ticker-wrapper');
const ticker = document.querySelector('.ticker-content');

tickerWrapper.addEventListener('mouseenter', () => {
    ticker.style.animationPlayState = 'paused';
});

tickerWrapper.addEventListener('mouseleave', () => {
    ticker.style.animationPlayState = 'running';
});

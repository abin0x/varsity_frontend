document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const blogId = params.get('id');
    const authToken = localStorage.getItem('auth_token');

    if (!blogId || !authToken) {
        console.log('Blog ID or authentication token missing.');
        return;
    }

    // Fetch blog data
    fetch(`https://varsity-s41t.onrender.com/api/blog/${blogId}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('title').value = data.title;
        document.getElementById('content').value = data.content;
        document.getElementById('image_url').value = data.image_url;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    // Handle form submission
    document.getElementById('update-button').addEventListener('click', () => {
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const imageUrl = document.getElementById('image_url').value;

        if (!title || !content) {
            document.getElementById('message').textContent = 'Title and content are required.';
            return;
        }

        fetch(`https://varsity-s41t.onrender.com/api/blog/${blogId}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${authToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                content,
                image_url: imageUrl
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            document.getElementById('message').textContent = 'Blog updated successfully.';
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect after successful update
            }, 1000);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const authToken = localStorage.getItem('auth_token');
    const paperId = new URLSearchParams(window.location.search).get('id');

    if (!authToken || !paperId) {
        console.error('No authentication token or paper ID found.');
        return;
    }

    // Fetch paper details and populate the form
    fetch(`https://varsity-s41t.onrender.com/api/papers/${paperId}/`, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${authToken}`,
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('paper-id').value = data.id;
        document.getElementById('title').value = data.title;
        document.getElementById('content').value = data.content;
        document.getElementById('img_url').value = data.img_url;
    })
    .catch(error => {
        console.error('Error fetching paper details:', error);
    });

    // Handle form submission
    document.getElementById('edit-paper-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', document.getElementById('title').value);
        formData.append('content', document.getElementById('content').value);
        formData.append('img_url', document.getElementById('img_url').value);

        const documentInput = document.getElementById('document');
        if (documentInput.files.length > 0) {
            formData.append('document', documentInput.files[0]);
        }

        fetch(`https://varsity-s41t.onrender.com/api/papers/${paperId}/`, {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${authToken}`,
            },
            body: formData,
        })
        .then(response => {
            return response.json().then(data => ({
                status: response.status,
                body: data
            }));
        })
        .then(responseData => {
            if (responseData.status === 200) {
                window.location.href = '/studentDashboard.html';
            } else {
                console.error('Error updating paper:', responseData.body);
            }
        })
        .catch(error => {
            console.error('Error updating paper:', error);
        });
    });

    // Handle cancel button click
    document.getElementById('cancel-button').addEventListener('click', () => {
        window.location.href = '/studentDashboard.html';
    });
});

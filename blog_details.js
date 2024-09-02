

document.addEventListener('DOMContentLoaded', () => {
    const blogDetailContainer = document.getElementById('blog-detail');
    
    // Function to get query parameters from the URL
    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    // Get the blog ID from the URL
    const blogId = getQueryParam('id'); // Assuming the URL is like blog-details.html?id=18

    if (!blogId) {
        blogDetailContainer.innerHTML = '<p class="error">No blog ID provided in the URL.</p>';
        return;
    }

    console.log('Fetching blog details for ID:', blogId);

    // Fetch the blog details without requiring auth token
    fetch(`https://varsity-s41t.onrender.com/api/blog/${blogId}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        console.log('Response status:', response.status);
        if (!response.ok) {
            return response.text().then(text => { throw new Error(text); }); // Read the error message
        }
        return response.json();
    })
    .then(blog => {
        console.log('Blog data received:', blog);
        blogDetailContainer.innerHTML = `
            <img src="${blog.image_url || 'https://via.placeholder.com/800x400'}" alt="${blog.title}">
            <h1>${blog.title}</h1>
            <p>${blog.content}</p>
            <div class="meta">Published on: ${new Date(blog.created_at).toLocaleDateString()} | Updated on: ${new Date(blog.updated_at).toLocaleDateString()}</div>
        `;
    })
    .catch(error => {
        console.error('Error fetching blog details:', error);
        blogDetailContainer.innerHTML = `<p class="error">Error loading blog details: ${error.message}</p>`;
    });
});

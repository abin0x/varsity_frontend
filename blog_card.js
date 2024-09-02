document.addEventListener('DOMContentLoaded', () => {
    const blogContainer = document.getElementById('blog-container');
    const showMoreBtn = document.getElementById('show-more-btn');
    let visibleCount = 8; // Number of initially visible cards
    let blogsData = []; // To store the fetched blogs

    // Fetch blog posts from API without Authorization Header
    fetch('https://varsity-s41t.onrender.com/api/blog/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error fetching blog posts: ${response.statusText}`);
        }
        return response.json();
    })
    .then(blogs => {
        blogsData = blogs; // Store the blogs in blogsData
        displayBlogs(); // Display initial 8 blogs
    })
    .catch(error => {
        console.error('Error fetching blog posts:', error);
        blogContainer.innerHTML = `<p class="error">Error fetching blog posts: ${error.message}</p>`;
    });

    // Function to display a certain number of blogs
    function displayBlogs() {
        blogContainer.innerHTML = ''; // Clear the container
        const blogsToShow = blogsData.slice(0, visibleCount); // Get the blogs to display

        blogsToShow.forEach(blog => {
            // Fetch the author details using the author ID without Authorization Header
            fetch(`https://varsity-s41t.onrender.com/api/users/${blog.author}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(author => {
                const blogCard = document.createElement('div');
                blogCard.classList.add('blog-card');

                blogCard.innerHTML = `
                    <img src="${blog.image_url || 'https://via.placeholder.com/350x200'}" alt="${blog.title}">
                    <div class="blog-content">
                        <h2 class="blog-title">${blog.title}</h2>
                        <p class="blog-description">${blog.content.substring(0, 100)}...</p>
                        
                        <a href="blog_details.html?id=${blog.id}" class="read-more">Read More</a>
                        <div class="blog-meta">Published by: ${author.username} on ${new Date(blog.created_at).toLocaleDateString()}</div>
                    </div>
                `;

                blogContainer.appendChild(blogCard);
            })
            .catch(error => {
                console.error('Error fetching author details:', error);
            });
        });

        // Hide the show more button if all blogs are displayed
        if (visibleCount >= blogsData.length) {
            showMoreBtn.style.display = 'none';
        }
    }

    // Show more button click event
    showMoreBtn.addEventListener('click', () => {
        visibleCount += 8; // Increase the visible count by 8
        displayBlogs(); // Display the next set of blogs
    });
});

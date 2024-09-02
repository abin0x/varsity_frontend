// document.addEventListener('DOMContentLoaded', function() {
//     const form = document.getElementById('create-blog-form');
//     const responseMessage = document.getElementById('response-message');
//     const apiUrl = 'https://varsity-s41t.onrender.com/api/blog/'; // Update with your API endpoint

//     form.addEventListener('submit', function(event) {
//         event.preventDefault(); // Prevent the default form submission

//         // Collect form data
//         const formData = new FormData(form);
//         const data = {
//             title: formData.get('title'),
//             content: formData.get('content'),
//             image_url: formData.get('image_url') || '' 
//         };

//         // Get the authentication token from localStorage
//         const authToken = localStorage.getItem('auth_token');
//         if (!authToken) {
//             responseMessage.textContent = 'Please log in to create a blog post.';
//             return;
//         }

//         // Send the data to the API
//         fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Token ${authToken}` // Include the auth token
//             },
//             body: JSON.stringify(data)
//         })
//         .then(response => {
//             if (!response.ok) {
//                 return response.json().then(errorData => {
//                     throw errorData;
//                 });
//             }
//             return response.json();
//         })
//         .then(data => {
//             responseMessage.textContent = 'Blog post created successfully!';
//             form.reset(); // Reset the form fields
//         })
//         .catch(error => {
//             console.error('Error creating blog post:', error);
//             responseMessage.textContent = 'Failed to create blog post. Please try again.';
//         });
//     });
// });




document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('create-blog-form');
    const responseMessage = document.getElementById('response-message');
    const apiUrl = 'https://varsity-s41t.onrender.com/api/blog/'; // Update with your API endpoint
    const imgbbApiUrl = 'https://api.imgbb.com/1/upload';
    const imgbbApiKey = '67b5c3db779f78eaa9e1918a2e997101'; // Your ImgBB API Key

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Collect form data
        const formData = new FormData(form);
        const imageFile = formData.get('image'); // Get the selected file from the form

        // Get the authentication token from localStorage
        const authToken = localStorage.getItem('auth_token');
        if (!authToken) {
            responseMessage.textContent = 'Please log in to create a blog post.';
            return;
        }

        // If there's an image file, upload it to ImgBB
        if (imageFile && imageFile.name) {
            const imgData = new FormData();
            imgData.append('image', imageFile);

            fetch(`${imgbbApiUrl}?key=${imgbbApiKey}`, {
                method: 'POST',
                body: imgData
            })
            .then(response => response.json())
            .then(imgbbData => {
                if (imgbbData.success) {
                    // Get the image URL from ImgBB response
                    const imageUrl = imgbbData.data.url;

                    // Create the blog post after image upload
                    createBlogPost(formData, imageUrl, authToken);
                } else {
                    throw new Error('Image upload failed');
                }
            })
            .catch(error => {
                console.error('Image upload error:', error);
                responseMessage.textContent = 'Failed to upload image. Please try again.';
            });
        } else {
            // No image selected, proceed with blog post creation without image
            createBlogPost(formData, '', authToken);
        }
    });

    // Function to create the blog post
    function createBlogPost(formData, imageUrl, authToken) {
        const data = {
            title: formData.get('title'),
            content: formData.get('content'),
            image_url: imageUrl
        };

        // Send the data to the API
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${authToken}` // Include the auth token
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw errorData;
                });
            }
            return response.json();
        })
        .then(data => {
            responseMessage.textContent = 'Blog post created successfully!';
            alert('Blog post created successfully!');
            window.location.href = 'teacherDashboard.html';
            

        })
        .catch(error => {
            console.error('Error creating blog post:', error);
            responseMessage.textContent = 'Failed to create blog post. Please try again.';
        });
    }
});

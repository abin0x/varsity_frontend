// // Function to submit research paper with file upload
// const submitResearchPaper = (event) => {
//     event.preventDefault();

//     const form = document.getElementById('paper-form');
//     const formData = new FormData(form); // Use FormData to handle files and other data

//     const authToken = localStorage.getItem('auth_token');
//     if (!authToken) {
//         alert('You are not logged in. Please log in to submit your paper.');
//         return;
//     }

//     fetch('https://varsity-s41t.onrender.com/api/papers/submit/', {
//         method: 'POST',
//         headers: {
//             'Authorization': 'Token ' + authToken, // Include token in headers
//         },
//         body: formData, // Use FormData to include files in the request
//     })
//     .then((res) => res.json())
//     .then((data) => {
//         if (data.id) {
//             alert('Research paper submitted successfully!');
//             window.location.href = 'index.html'; // Redirect to papers page
//         } else {
//             alert('Submission failed: ' + JSON.stringify(data));
//         }
//     })
//     .catch((err) => console.error('Submission error:', err));
// };

// // Event listeners
// if (document.getElementById('paper-form')) {
//     document.getElementById('paper-form').addEventListener('submit', submitResearchPaper);
// }


// Function to submit research paper with ImgBB image upload and file upload
const submitResearchPaper = (event) => {
    event.preventDefault();

    const form = document.getElementById('paper-form');
    const formData = new FormData(form); // Use FormData to handle files and other data
    const authToken = localStorage.getItem('auth_token');

    if (!authToken) {
        alert('You are not logged in. Please log in to submit your paper.');
        return;
    }

    // Get the image file from the form
    const imageFile = formData.get('img_url');
    if (imageFile && imageFile.name) {
        // Create a FormData object for ImgBB upload
        const imgBBFormData = new FormData();
        imgBBFormData.append('image', imageFile);

        // ImgBB API key and URL
        const imgbbApiUrl = 'https://api.imgbb.com/1/upload';
        const imgbbApiKey = '67b5c3db779f78eaa9e1918a2e997101'; // Your ImgBB API key

        // Upload image to ImgBB
        fetch(`${imgbbApiUrl}?key=${imgbbApiKey}`, {
            method: 'POST',
            body: imgBBFormData
        })
        .then((response) => response.json())
        .then((imgBBData) => {
            if (imgBBData && imgBBData.data && imgBBData.data.url) {
                // Image uploaded successfully, use the URL in the formData
                formData.set('img_url', imgBBData.data.url);
                submitPaperData(formData, authToken); // Proceed to submit paper data after ImgBB upload
            } else {
                throw new Error('Image upload failed');
            }
        })
        .catch((error) => {
            console.error('ImgBB upload error:', error);
            alert('Failed to upload image. Please try again.');
        });
    } else {
        // If no image is uploaded, proceed with submitting the research paper
        submitPaperData(formData, authToken);
    }
};

// Function to submit paper data to the server
const submitPaperData = (formData, authToken) => {
    fetch('https://varsity-s41t.onrender.com/api/papers/submit/', {
        method: 'POST',
        headers: {
            'Authorization': 'Token ' + authToken, // Include token in headers
        },
        body: formData, // Use FormData to include files and data in the request
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.id) {
            alert('Research paper submitted successfully!');
            window.location.href = 'teacherDashboard.html'; // Redirect to papers page
        } else {
            alert('Submission failed: ' + JSON.stringify(data));
        }
    })
    .catch((err) => console.error('Submission error:', err));
};

// Event listener for form submission
if (document.getElementById('paper-form')) {
    document.getElementById('paper-form').addEventListener('submit', submitResearchPaper);
}

// // create-course.js

// // Handle Create Course
// const handleCreateCourse = (event) => {
//     event.preventDefault();
//     const form = document.getElementById('create-course-form');
//     const formData = new FormData(form);
//     const courseData = {};
    
//     formData.forEach((value, key) => {
//         courseData[key] = value;
//     });

//     fetch('https://varsity-s41t.onrender.com/api/courses/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Token ' + localStorage.getItem('auth_token'),
//         },
//         body: JSON.stringify(courseData),
//     })
//     .then((res) => res.json())
//     .then((data) => {
//         if (data.id) {
//             alert('Course created successfully!');
//             window.location.href = 'index.html'; // Redirect to the dashboard or course list
//         } else {
//             alert('Course creation failed: ' + (data.error || 'Please try again.'));
//         }
//     })
//     .catch((err) => console.log('Create course error', err));
// };

// // Event listeners
// if (document.getElementById('create-course-form')) {
//     document.getElementById('create-course-form').addEventListener('submit', handleCreateCourse);
// }


// create-course.js

// ImgBB API Key and URL
const imgbbApiKey = '67b5c3db779f78eaa9e1918a2e997101';
const imgbbApiUrl = 'https://api.imgbb.com/1/upload';

// Handle Image Upload to ImgBB
const uploadImageToImgBB = (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    return fetch(`${imgbbApiUrl}?key=${imgbbApiKey}`, {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            return data.data.url; // Return the image URL from ImgBB
        } else {
            throw new Error('Image upload failed');
        }
    })
    .catch(err => {
        console.error('ImgBB Upload Error:', err);
        return null;
    });
};

// Handle Create Course
const handleCreateCourse = async (event) => {
    event.preventDefault();
    const form = document.getElementById('create-course-form');
    const formData = new FormData(form);
    const courseData = {};
    let imageFile = formData.get('image'); // Assuming the image input field has the name 'image'

    // Remove the image from formData as we will handle it separately
    formData.delete('image');

    formData.forEach((value, key) => {
        courseData[key] = value;
    });

    if (imageFile && imageFile.size > 0) {
        // Upload image to ImgBB
        const imageUrl = await uploadImageToImgBB(imageFile);

        if (imageUrl) {
            courseData.image_url = imageUrl; // Add image URL to course data
        } else {
            alert('Image upload failed. Please try again.');
            return;
        }
    }

    // Send the course data to your API
    fetch('https://varsity-s41t.onrender.com/api/courses/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + localStorage.getItem('auth_token'),
        },
        body: JSON.stringify(courseData),
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.id) {
            alert('Course created successfully!');
            window.location.href = 'index.html'; // Redirect to the dashboard or course list
        } else {
            alert('Course creation failed: ' + (data.error || 'Please try again.'));
        }
    })
    .catch((err) => console.log('Create course error', err));
};

// Event listeners
if (document.getElementById('create-course-form')) {
    document.getElementById('create-course-form').addEventListener('submit', handleCreateCourse);
}

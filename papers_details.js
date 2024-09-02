// document.addEventListener('DOMContentLoaded', () => {
//     const authToken = localStorage.getItem('auth_token');
//     const paperId = new URLSearchParams(window.location.search).get('id') || 1; // Default to 1 if no ID is found

//     if (!authToken || !paperId) {
//         console.error('No authentication token or paper ID found.');
//         return;
//     }

//     // Fetch paper details and populate the page
//     fetch(`https://varsity-s41t.onrender.com/api/papers/${paperId}/`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Token ${authToken}`,
//             'Content-Type': 'application/json',
//         },
//     })
//     .then(response => response.json())
//     .then(data => {
//         const container = document.getElementById('paper-details-container');
//         const documentUrl = data.document.startsWith('http') ? data.document : `https://varsity-s41t.onrender.com${data.document}`;
//         container.innerHTML = `
//             <div class="paper-detail-card">
//                 <img src="${data.img_url}" alt="Research Paper Image" class="paper-image">
//                 <h2 class="paper-title">${data.title}</h2>
//                 <p class="paper-author"><strong>Author:</strong> ${data.author}</p>
//                 <p class="paper-content"><strong>Content:</strong> ${data.content}</p>

//                 <a href="${documentUrl}" target="_blank" class="paper-link">Read Full Document</a>
//             </div>
//         `;
//     })
//     .catch(error => {
//         console.error('Error fetching paper details:', error);
//     });
// });



document.addEventListener('DOMContentLoaded', () => {
    const authToken = localStorage.getItem('auth_token');
    const paperId = new URLSearchParams(window.location.search).get('id') || 1; // Default to 1 if no ID is found

    if (!paperId) {
        console.error('No paper ID found.');
        return;
    }

    // Setup fetch options
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // If the user is logged in, include the Authorization token
    if (authToken) {
        fetchOptions.headers['Authorization'] = `Token ${authToken}`;
    }

    // Fetch paper details and populate the page
    fetch(`https://varsity-s41t.onrender.com/api/papers/${paperId}/`, fetchOptions)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('paper-details-container');
            const documentUrl = data.document.startsWith('http') ? data.document : `https://varsity-s41t.onrender.com${data.document}`;
            container.innerHTML = `
                <div class="paper-detail-card">
                    <img src="${data.img_url}" alt="Research Paper Image" class="paper-image">
                    <h2 class="paper-title">${data.title}</h2>
                    <p class="paper-author"><strong>Author:</strong> ${data.author}</p>
                    <p class="paper-content"><strong>Content:</strong> ${data.content}</p>

                    <a href="${documentUrl}" target="_blank" class="paper-link">Read Full Document</a>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching paper details:', error);
        });
});


document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
});

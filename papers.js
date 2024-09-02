document.addEventListener('DOMContentLoaded', () => {
    const papersContainer = document.getElementById('papers-container');
    const showMoreButton = document.getElementById('show-more');
    let papersData = [];
    let visibleCount = 8; // Initial number of visible cards

    // Fetch all research papers from the API
    fetch('https://varsity-s41t.onrender.com/api/papers/')
        .then(response => response.json())
        .then(data => {
            papersData = data; // Store the fetched papers data
            displayPapers(visibleCount); // Display initial set of papers
        })
        .catch(error => {
            console.error('Error fetching papers:', error);
        });

    function displayPapers(count) {
        papersContainer.innerHTML = ''; // Clear existing cards
        const papersToShow = papersData.slice(0, count); // Get papers to display

        papersToShow.forEach(paper => {
            // Create a card for each research paper
            const card = document.createElement('div');
            card.classList.add('paper-card');

            const image = document.createElement('img');
            image.src = paper.img_url;  // Assuming the img_url is provided
            image.alt = paper.title;
            image.classList.add('paper-image');
            card.appendChild(image);

            const content = document.createElement('div');
            content.classList.add('paper-content');

            const title = document.createElement('h3');
            title.classList.add('paper-title');
            title.textContent = paper.title;
            content.appendChild(title);

            const description = document.createElement('p');
            description.classList.add('paper-description');
            description.textContent = paper.content.substring(0, 100) + '...';  // Shorten the content
            content.appendChild(description);

            const actions = document.createElement('div');
            actions.classList.add('paper-actions');

            const viewButton = document.createElement('a');
            viewButton.href = `papers_details.html?id=${paper.id}`;  // Assuming paper-details.html handles viewing details
            viewButton.textContent = 'View Paper';
            viewButton.classList.add('view-button');
            actions.appendChild(viewButton);

            card.appendChild(content);
            card.appendChild(actions);

            // Append the card to the papers container
            papersContainer.appendChild(card);
        });
    }

    showMoreButton.addEventListener('click', () => {
        visibleCount += 8; // Increase visible count by 8
        displayPapers(visibleCount); // Display more papers
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const assignmentForm = document.getElementById('assignment-form');
    const submitButton = document.getElementById('submit-btn');

    // Fetch assignments and populate the select dropdown
    fetchAssignments();

    assignmentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);

        // Disable the submit button and change text to indicate submission
        submitButton.disabled = true;
        submitButton.innerText = 'Submitting...';

        // Send form data to the API
        fetch('https://varsity-s41t.onrender.com/api/submit-assignment/', {
            method: 'POST',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem('auth_token')  // Include token for authentication
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errData => {
                    throw new Error(errData.detail || 'Submission failed');
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.id) {
                // If submission is successful
                assignmentForm.reset(); 
                alert('Assignment submitted successfully!');
                window.location.reload(); 
            } else {
                // Handle validation errors
                let errorMessage = 'Assignment submitted successfully!';
                if (data.detail) {
                    errorMessage = data.detail;
                } else if (data.non_field_errors) {
                    errorMessage = data.non_field_errors.join(', ');
                }
                alert(errorMessage);
            }
        })
        .catch(err => {
            console.error('Error:', err);
            alert('Error submitting assignment: ' + err.message); // Display error message
        })
        .finally(() => {
            // Re-enable the submit button and reset text
            submitButton.disabled = false;
            submitButton.innerText = 'Submit Assignment';
        });
    });
});

// Fetch assignments from API and populate the select dropdown
function fetchAssignments() {
    fetch('https://varsity-s41t.onrender.com/api/assignments/', {
        method: 'GET',
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('auth_token')  // Include token for authentication
        }
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errData => {
                throw new Error(errData.detail || 'Failed to fetch assignments');
            });
        }
        return response.json();
    })
    .then(assignments => {
        const assignmentSelect = document.getElementById('assignment');
        // Clear existing options
        assignmentSelect.innerHTML = '';
        assignments.forEach(assignment => {
            const option = document.createElement('option');
            option.value = assignment.id;
            option.text = assignment.title; // Adjust according to the API response
            assignmentSelect.appendChild(option);
        });
    })
    .catch(err => {
        console.error('Error fetching assignments:', err);
        alert('Error fetching assignments: ' + err.message); // Display error message
    });
}

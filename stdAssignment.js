document.addEventListener('DOMContentLoaded', () => {
    const assignmentsTableBody = document.getElementById('assignments-body');
    
    fetch('https://varsity-s41t.onrender.com/api/assignments/')
        .then(response => response.json())
        .then(assignments => {
            // Populate the table with assignments
            assignmentsTableBody.innerHTML = assignments.map(assignment => `
                <tr>
                    <td>${assignment.title}</td>
                    <td>${assignment.description}</td>
                    <td>${new Date(assignment.due_date).toLocaleString()}</td>
                    <td>${assignment.course.title}</td>
                    <td>${new Date(assignment.course.created_at).toLocaleString()}</td>
                </tr>
            `).join('');
        })
        .catch(error => {
            console.error('Error fetching assignments:', error);
            assignmentsTableBody.innerHTML = '<tr><td colspan="5">Failed to load assignments</td></tr>';
        });
});

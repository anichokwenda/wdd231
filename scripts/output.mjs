
export function outputSections(sections) {
    const tableBody = document.getElementById('sections-table');
    tableBody.innerHTML = ''; // Clear existing rows
    sections.forEach(section => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${section.id}</td>
            <td>${section.enrolled}</td>
            <td>${section.instructor}</td>
        `;
        tableBody.appendChild(row);
    });
}

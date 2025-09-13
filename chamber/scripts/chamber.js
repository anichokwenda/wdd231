async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

// Display members in grid or list view
function displayMembers(members) {
    const membersContainer = document.getElementById('members-container');
    membersContainer.innerHTML = '';
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');
        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name} logo" style="width: 50px; height: 50px; object-fit: contain;">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p><a href="${member.website}">${member.website}</a></p>
        `;
        membersContainer.appendChild(memberCard);
    });
}

// Toggle between grid and list views
    document.getElementById('grid-view').addEventListener('click', () => {
        document.getElementById('members-container').classList.remove('list-view');
        document.getElementById('members-container').classList.add('grid-view');
    });

    document.getElementById('list-view').addEventListener('click', () => {
        document.getElementById('members-container').classList.remove('grid-view');
        document.getElementById('members-container').classList.add('list-view');
    });

// Display last modified date and copyright year
document.getElementById('last-modified').textContent = document.lastModified;
document.getElementById('copyright-year').textContent = new Date().getFullYear();

// Call fetchMembers function when the page loads
document.addEventListener('DOMContentLoaded', fetchMembers);



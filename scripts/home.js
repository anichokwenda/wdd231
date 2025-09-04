document.addEventListener('DOMContentLoaded', function() {
    // Responsive navigation
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    hamburger.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'block' ? 'none' : 'block';
    });

    // Dynamically display current year
    const currentYear = document.getElementById('currentyear');
    currentYear.textContent = new Date().getFullYear();

    // Dynamically display last modified date
    const lastModified = document.getElementById('lastModified');
    lastModified.textContent = `Last Modified: ${document.lastModified}`;

    // Course list array
    const courses = [
        { name: 'WDD 130', credits: 3, completed: true },
        { name: 'WDD 131', credits: 3, completed: false },
        { name: 'CSE 110', credits: 3, completed: true },
        // Add more courses here...
    ];

    // Function to display courses
    function displayCourses(courseList) {
        const courseListElement = document.getElementById('course-list');
        courseListElement.innerHTML = '';
        courseList.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');
            if (course.completed) {
                courseCard.classList.add('completed');
            }
            courseCard.innerHTML = `
                <h3>${course.name}</h3>
                <p>Credits: ${course.credits}</p>
            `;
            courseListElement.appendChild(courseCard);
        });
        updateTotalCredits(courseList);
    }

    // Function to update total credits
    function updateTotalCredits(courseList) {
        const totalCreditsElement = document.getElementById('total-credits');
        const totalCredits = courseList.reduce((acc, course) => acc + course.credits, 0);
        totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
    }

    // Display all courses initially
    displayCourses(courses);

    // Button event listeners
    document.getElementById('show-all').addEventListener('click', function() {
        displayCourses(courses);
    });

    document.getElementById('show-wdd').addEventListener('click', function() {
        const wddCourses = courses.filter(course => course.name.startsWith('WDD'));
        displayCourses(wddCourses);
    });

    document.getElementById('show-cse').addEventListener('click', function() {
        const cseCourses = courses.filter(course => course.name.startsWith('CSE'));
        displayCourses(cseCourses);
    });
});



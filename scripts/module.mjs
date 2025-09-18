import { courseData } from './course.mjs';
import { outputSections } from './output.mjs';

document.addEventListener('DOMContentLoaded', () => {
    outputSections(courseData.sections);
});

// Basic button interactions (no actual enroll/drop functionality implemented)
document.getElementById('enroll-btn').addEventListener('click', () => {
    console.log('Enroll clicked for section:', document.getElementById('section-select').value);
});

document.getElementById('drop-btn').addEventListener('click', () => {
    console.log('Drop clicked for section:', document.getElementById('section-select').value);
});

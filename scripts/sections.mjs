export function setSectionSelection(course, sectionId) {
  const section = course.sections.find(s => s.id == sectionId);
  if (section) {
    console.log(`Selected section ${section.id} with ${section.enrolled} students enrolled, taught by ${section.instructor}.`);
    // Additional logic for handling section selection could go here
  } else {
    console.log('Section not found.');
  }
}

export function updateSectionEnrollment(course, sectionId, change) {
  const section = course.sections.find(s => s.id == sectionId);
  if (section) {
    section.enrolled += change;
    console.log(`Updated enrollment for section ${section.id}: ${section.enrolled} students now enrolled.`);
    // Logic to update the UI or further handle enrollment changes could go here
  } else {
    console.log('Section not found for enrollment update.');
  }
}


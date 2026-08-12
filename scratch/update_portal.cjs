const fs = require('fs');

let portalCode = fs.readFileSync('pages/StudentPortal.tsx', 'utf8');
const newLessonsCode = fs.readFileSync('scratch/lessons_code.ts', 'utf8');

// Target chunk in StudentPortal.tsx to replace:
// From "const REVIT_LESSONS: Lesson[] = [" to "const COURSES_PORTAL_DATA: CourseItem[] = ["
const startMarker = 'const REVIT_LESSONS: Lesson[] = [';
const endMarker = 'const COURSES_PORTAL_DATA: CourseItem[] = [';

const startIndex = portalCode.indexOf(startMarker);
const endIndex = portalCode.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  portalCode = portalCode.substring(0, startIndex) + newLessonsCode + '\n\n' + portalCode.substring(endIndex);
  
  // Update Course 5, 6, 7 badges and totalLessons count
  portalCode = portalCode.replace("badge: '1 Module • 1 Folder',\n    totalLessons: 1,", "badge: '1 Module • 29 Videos',\n    totalLessons: 29,");
  portalCode = portalCode.replace("name: 'Revit Complete Course (1 Folder)',", "name: 'Revit Complete Course (29 Videos)',");

  portalCode = portalCode.replace("badge: '1 Module • 1 Folder',\n    totalLessons: 1,", "badge: '1 Module • 4 Videos',\n    totalLessons: 4,");
  portalCode = portalCode.replace("name: 'Enscape Complete Course (1 Folder)',", "name: 'Enscape Complete Course (4 Videos)',");

  portalCode = portalCode.replace("badge: '1 Module • 1 Folder',\n    totalLessons: 1,", "badge: '1 Module • 13 Videos',\n    totalLessons: 13,");
  portalCode = portalCode.replace("name: '3ds Max + V-Ray Complete Course (1 Folder)',", "name: '3ds Max + V-Ray Complete Course (13 Videos)',");

  fs.writeFileSync('pages/StudentPortal.tsx', portalCode);
  console.log('Successfully updated StudentPortal.tsx with 46 individual video lessons!');
} else {
  console.error('Could not find markers in StudentPortal.tsx');
}

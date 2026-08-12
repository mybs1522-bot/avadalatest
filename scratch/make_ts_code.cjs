const fs = require('fs');

const { revitLessons, enscapeLessons, maxLessons } = JSON.parse(fs.readFileSync('scratch/formatted_lessons.json', 'utf8'));

function toTsCode(varName, lessons) {
  return `const ${varName}: Lesson[] = ${JSON.stringify(lessons, null, 2)};`;
}

const code = `${toTsCode('REVIT_LESSONS', revitLessons)}

${toTsCode('ENSCAPE_LESSONS', enscapeLessons)}

${toTsCode('TDSMAX_VRAY_LESSONS', maxLessons)}`;

fs.writeFileSync('scratch/lessons_code.ts', code);
console.log('Generated lessons_code.ts successfully!');

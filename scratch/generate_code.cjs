const fs = require('fs');

const data = JSON.parse(fs.readFileSync('scratch/all_extracted_videos.json', 'utf8'));

function formatLesson(item, prefix, idx) {
  const cleanId = item.id.replace(/-0$/, '');
  const cleanTitle = item.title.replace(/\.pdf\s+PDF\.mp4$/i, '').replace(/\.mp4$/i, '').trim();
  const isPdf = item.title.toLowerCase().includes('.pdf');
  
  return {
    id: `${prefix}-${idx + 1}`,
    title: cleanTitle,
    duration: isPdf ? 'PDF Notes' : '20-30 min',
    videoUrl: `https://drive.google.com/file/d/${cleanId}/preview`,
    description: isPdf 
      ? `Reference documentation & PDF guide for ${cleanTitle}`
      : `Video tutorial covering ${cleanTitle}`
  };
}

const revitLessons = data.Revit
  .filter(v => !v.title.toLowerCase().includes('.pdf'))
  .map((v, i) => formatLesson(v, 'rev', i));

const enscapeLessons = data.Enscape
  .map((v, i) => formatLesson(v, 'ens', i));

const maxLessons = data.TdsMax
  .map((v, i) => formatLesson(v, 'max', i));

console.log(`Revit video lessons: ${revitLessons.length}`);
console.log(`Enscape video lessons: ${enscapeLessons.length}`);
console.log(`3ds Max video lessons: ${maxLessons.length}`);

fs.writeFileSync('scratch/formatted_lessons.json', JSON.stringify({
  revitLessons,
  enscapeLessons,
  maxLessons
}, null, 2));

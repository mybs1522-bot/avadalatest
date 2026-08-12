const fs = require('fs');

function parseFolder(name) {
  const html = fs.readFileSync(`scratch/${name}.html`, 'utf8');
  console.log(`\n=================== ${name} ===================`);
  
  // Search pattern in Drive initial payload
  // Drive initial data has JSON arrays containing ["FILE_ID", ["FILENAME.mp4", ...]]
  const matches = [];
  const regex = /\["([a-zA-Z0-9_-]{28,35})",\["([^"]+\.(?:mp4|mkv|avi|mov|MP4|MKV))"/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    matches.push({ id: match[1], title: match[2].replace(/^x22/, '') });
  }

  // Deduplicate by filename
  const unique = [];
  const seen = new Set();
  for (const m of matches) {
    if (!seen.has(m.title)) {
      seen.add(m.title);
      unique.push(m);
    }
  }

  console.log(`Extracted ${unique.length} unique videos:`);
  unique.forEach((v, idx) => {
    console.log(`${idx + 1}. ${v.title} -> https://drive.google.com/file/d/${v.id}/preview`);
  });
  return unique;
}

const revitVideos = parseFolder('Revit');
const enscapeVideos = parseFolder('Enscape');
const maxVideos = parseFolder('TdsMax');

fs.writeFileSync('scratch/extracted_videos.json', JSON.stringify({
  Revit: revitVideos,
  Enscape: enscapeVideos,
  TdsMax: maxVideos
}, null, 2));

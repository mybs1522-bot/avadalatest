const fs = require('fs');

function extractVideos(folderName) {
  const html = fs.readFileSync(`scratch/${folderName}.html`, 'utf8');
  
  // Pattern in Google Drive DOM:
  // aria-label="FILENAME.mp4 Video..." ... ssk='5:auSv138:FILE_ID
  // OR aria-label="FILENAME Video..." ... ssk='...:FILE_ID
  const regex = /aria-label="([^"]+?)(?:\s+Video|\s+File|\s+Shared)?"[^>]*?ssk='[^']*?:(1[a-zA-Z0-9_-]{27,34})/g;
  
  const results = [];
  const seen = new Set();
  
  let match;
  while ((match = regex.exec(html)) !== null) {
    let rawTitle = match[1].trim();
    const id = match[2];
    
    // Clean up title
    rawTitle = rawTitle.replace(/\s+(Video|Shared|File)$/i, '').trim();
    if (!rawTitle.endsWith('.mp4') && !rawTitle.endsWith('.MP4')) {
      rawTitle += '.mp4';
    }
    
    if (!seen.has(id)) {
      seen.add(id);
      results.push({ id, title: rawTitle });
    }
  }
  
  console.log(`\n=================== ${folderName} (${results.length} videos) ===================`);
  results.forEach((r, idx) => {
    console.log(`${idx + 1}. ${r.title} -> ${r.id}`);
  });
  return results;
}

const revit = extractVideos('Revit');
const enscape = extractVideos('Enscape');
const max = extractVideos('TdsMax');

fs.writeFileSync('scratch/all_extracted_videos.json', JSON.stringify({
  Revit: revit,
  Enscape: enscape,
  TdsMax: max
}, null, 2));

const fs = require('fs');

const html = fs.readFileSync('scratch/Revit.html', 'utf8');

const target = '1. Introduction.mp4';
const idx = html.indexOf(target);
if (idx !== -1) {
  console.log('Snippet around 1. Introduction.mp4:');
  console.log(html.substring(idx - 200, idx + 100));
} else {
  console.log('Target not found in Revit.html directly');
}

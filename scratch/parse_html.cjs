const fs = require('fs');

const html = fs.readFileSync('scratch/Revit.html', 'utf8');

// Find all strings like "1..." of length 28-35
const ids = html.match(/1[a-zA-Z0-9_-]{27,34}/g) || [];
const uniqueIds = Array.from(new Set(ids));

console.log('Unique Drive IDs found in Revit.html:', uniqueIds.length);
console.log(uniqueIds.slice(0, 30));

// Find filenames (looking for .mp4, .mkv, .avi, etc.)
const filenames = html.match(/[a-zA-Z0-9_\-\s\.\(\)]+\.(mp4|mkv|avi|mov|MP4|MKV)/gi) || [];
console.log('Filenames found:', Array.from(new Set(filenames)));

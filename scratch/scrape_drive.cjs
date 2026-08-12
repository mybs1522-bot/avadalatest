const https = require('https');
const fs = require('fs');

const folders = {
  Revit: '1s_9yXkU_gdoi9gF_IZLf3gQerPbeuu7u',
  Enscape: '1tKMwCLUTQtXhhAbXi6rMufhwil2DBBdr',
  TdsMax: '1C7n0_MyIeh-cHVzu2W4RVbxulNJB3B87'
};

function fetchFolder(name, id) {
  const url = `https://drive.google.com/drive/folders/${id}`;
  https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log(`\n=================== ${name} (${data.length} bytes) ===================`);
      fs.writeFileSync(`scratch/${name}.html`, data);

      // Search for Drive file IDs and titles pattern in script tags
      // Drive embeds JSON structures containing ["FILE_ID", ["TITLE", ...]]
      const idPattern = /\["([a-zA-Z0-9_-]{28,35})",\["([^"]+)"/g;
      let match;
      const found = [];
      while ((match = idPattern.exec(data)) !== null) {
        if (match[2].includes('.') || match[2].toLowerCase().includes('video') || match[2].toLowerCase().includes('lesson') || match[2].toLowerCase().includes('part') || match[2].toLowerCase().includes('revit') || match[2].toLowerCase().includes('enscape') || match[2].toLowerCase().includes('max')) {
          found.push({ id: match[1], name: match[2] });
        }
      }
      console.log(`Found ${found.length} matches:`);
      found.forEach(f => console.log(`- ${f.name} (ID: ${f.id})`));
    });
  });
}

for (const [name, id] of Object.entries(folders)) {
  fetchFolder(name, id);
}

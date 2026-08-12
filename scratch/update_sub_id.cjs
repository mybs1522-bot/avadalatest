const fs = require('fs');

const filesToUpdate = [
  '.env',
  'lib/razorpay.ts',
  'pages/StudentPortal.tsx',
  'pages/LandingPage.tsx',
  'scratch/new999/pages/LandingPage.tsx'
];

const oldSubId = 'sub_TOx4ouvDuHpWat';
const newSubId = 'sub_TOzqlrIULqdtIB';

for (const filePath of filesToUpdate) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(oldSubId)) {
      content = content.replaceAll(oldSubId, newSubId);
      fs.writeFileSync(filePath, content);
      console.log(`Updated subscription ID in ${filePath}`);
    }
  }
}

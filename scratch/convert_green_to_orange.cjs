const fs = require('fs');

const filesToUpdate = [
  'pages/LandingPage.tsx',
  'pages/LandingHelpers.tsx',
  'pages/StudentPortal.tsx',
  'pages/CheckoutPage.tsx',
  'lib/razorpay.ts',
  'lib/data.ts'
];

const replacements = [
  // Tailwind emerald color classes to orange
  { from: /emerald-50\b/g, to: 'orange-50' },
  { from: /emerald-100\b/g, to: 'orange-100' },
  { from: /emerald-200\b/g, to: 'orange-200' },
  { from: /emerald-300\b/g, to: 'orange-300' },
  { from: /emerald-400\b/g, to: 'orange-400' },
  { from: /emerald-500\b/g, to: 'orange-500' },
  { from: /emerald-600\b/g, to: 'orange-600' },
  { from: /emerald-700\b/g, to: 'orange-700' },
  { from: /emerald-800\b/g, to: 'orange-800' },
  { from: /emerald-900\b/g, to: 'orange-900' },
  // Hex colors
  { from: /#059669/g, to: '#f97316' },
  { from: /#10b981/g, to: '#f97316' },
  { from: /#047857/g, to: '#ea580c' },
];

for (const filePath of filesToUpdate) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let count = 0;
    for (const r of replacements) {
      const matches = content.match(r.from);
      if (matches) {
        count += matches.length;
        content = content.replace(r.from, r.to);
      }
    }
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath} (${count} replacements)`);
  }
}

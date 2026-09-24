const fs = require('fs');
const content = fs.readFileSync('components/interative-software-simulator/src/edit.js', 'utf8');
const lines = content.split('\n');
lines.forEach((l, i) => {
  if (l.includes('el.type') || l.includes('type ===') || l.includes('type !==')) {
    console.log((i+1) + ': ' + l.trim());
  }
});

const fs = require('fs');
const path = require('path');

// Resolve files relative to this script to avoid cwd issues
const inputPath = path.join(__dirname, 'naman.txt');
const outputPath = path.join(__dirname, 'output.txt');

// Step 1: Read the file
fs.readFile(inputPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Failed to read file:', err.message);
    process.exit(1);
  }

  // Step 2: Count words (handle empty file)
  const trimmed = data.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;

  // Step 3: Write result to new file
  fs.writeFile(outputPath, `Word count: ${wordCount}`, (err) => {
    if (err) {
      console.error('Failed to write output:', err.message);
      process.exit(1);
    }
    console.log('Word count written to', outputPath);
  });
});
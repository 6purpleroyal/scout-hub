const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const OUTPUT_DIR = 'public';
const FILES_TO_COPY = [
  'index.html',
  'logo-bush.jpg',
  'logo foundation.pdf'
];
const DIRS_TO_COPY = [
  'styles',
  'scripts',
  'data'
];

console.log('🚀 Starting build process...');

// 1. Run update_data.js to ensure data.js is up to date
try {
  console.log('📦 Updating data...');
  execSync('node update_data.js', { stdio: 'inherit' });
} catch (error) {
  console.error('❌ Failed to update data:', error);
  process.exit(1);
}

// 2. Prepare output directory
const outputParams = path.join(__dirname, OUTPUT_DIR);

if (fs.existsSync(outputParams)) {
  console.log('🧹 Cleaning existing public directory...');
  fs.rmSync(outputParams, { recursive: true, force: true });
}

fs.mkdirSync(outputParams);

// 3. Copy files
console.log('📂 Copying files...');

// Copy individual files
FILES_TO_COPY.forEach(file => {
  const src = path.join(__dirname, file);
  const dest = path.join(outputParams, file);
  
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`  ✓ Copied ${file}`);
  } else {
    console.warn(`  ⚠️ Warning: ${file} not found`);
  }
});

// Copy directories recursively
function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

DIRS_TO_COPY.forEach(dir => {
  const src = path.join(__dirname, dir);
  const dest = path.join(outputParams, dir);
  
  if (fs.existsSync(src)) {
    copyDir(src, dest);
    console.log(`  ✓ Copied ${dir}/`);
  } else {
    console.warn(`  ⚠️ Warning: Directory ${dir} not found`);
  }
});

console.log('✅ Build completed successfully!');
console.log(`✨ Output generated in /${OUTPUT_DIR}`);

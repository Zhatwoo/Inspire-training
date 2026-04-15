import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const NAS_DIR = "/volume1/TRAINING";

// Recursively find all .mp4 files in a directory
function findMp4Files(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.resolve(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      // Ignore hidden or recycle folders
      if (!file.startsWith('.') && !file.startsWith('#')) {
          results = results.concat(findMp4Files(fullPath));
      }
    } else if (fullPath.toLowerCase().endsWith(".mp4") && !fullPath.toLowerCase().endsWith("_web.mp4")) {
      results.push(fullPath);
    }
  }
  return results;
}

function runFfmpeg(inputFile: string, outputFile: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const args = [
      "-y", 
      "-i", inputFile, 
      "-c:v", "libx264", 
      "-preset", "fast", 
      "-crf", "23", 
      "-c:a", "aac", 
      "-movflags", "+faststart", 
      outputFile
    ];
    
    // Spawn inherits stdio so you see the native FFmpeg progress bar in your terminal!
    const ffmpegProcess = spawn("ffmpeg", args, { stdio: "inherit" });

    ffmpegProcess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`FFmpeg exited with code ${code}`));
      }
    });
    
    ffmpegProcess.on("error", (err) => {
      reject(err);
    });
  });
}

async function convertVideos() {
  console.log(`Scanning for .mp4 files in ${NAS_DIR}...`);
  if (!fs.existsSync(NAS_DIR)) {
      console.log(`Directory ${NAS_DIR} does not exist! Have you mounted the NAS?`);
      return;
  }
  
  const files = findMp4Files(NAS_DIR);
  
  if (files.length === 0) {
    console.log("No .mp4 files found to convert.");
    return;
  }

  console.log(`Found ${files.length} videos to convert.`);

  for (const file of files) {
    console.log(`\n========================================`);
    console.log(`Converting: ${file}`);
    
    // Output into a temporary file
    const tempFile = file.replace(/\.mp4$/i, "_web.mp4");
    
    try {
      await runFfmpeg(file, tempFile);
      console.log(`✅ Successfully converted: ${file}`);
      
      // Overwrite the original file with the new web-safe one
      // This means you do NOT need to update any 'data.ts' URLs!
      fs.renameSync(tempFile, file);
      console.log(`Replaced original file successfully. URLs remain the same!`);
      
    } catch (error: any) {
      console.error(`❌ Failed to convert ${file}`);
      console.error(error.message);
      // Clean up temp file if it crashed
      if (fs.existsSync(tempFile)) {
         fs.unlinkSync(tempFile);
      }
    }
  }
  console.log(`\n🎉 All conversions complete!`);
}

convertVideos().catch(console.error);

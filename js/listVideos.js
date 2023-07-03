const fs = require('fs');

const sep = "\\";// "/";//

const currentDir = __dirname;//"E:/Expos/KERMESSE/DEV/Zoltar/html/";
const videoDir = sep+".."+sep+"video"+sep+"reponses"+sep;

console.log(currentDir + videoDir);

let videos = {};

subDirs = fs.readdirSync(currentDir + videoDir, { withFileTypes: true }).filter(dirent => dirent.isDirectory());
  
subDirs.forEach(file => {
	let curDir = currentDir + videoDir + file.name;
	let files = fs.readdirSync(curDir, { withFileTypes: true })
	let array = [];
	files.forEach(file => {
		//console.log(file.name);
		array.push(file.name);
	});
	videos[file.name] = array;
});

let output = JSON.stringify(videos);

fs.writeFileSync(currentDir + sep + "videos.js", "let videoFiles = " + output + ";");


console.log("Voilà c'est fait...");
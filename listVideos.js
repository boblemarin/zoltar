const fs = require('fs');



const projectDir = __dirname;//"E:/Expos/KERMESSE/DEV/Zoltar/html/";
const videoDir = "\\video\\reponses\\";

console.log(projectDir + videoDir);

let videos = {};

subDirs = fs.readdirSync(projectDir + videoDir, { withFileTypes: true }).filter(dirent => dirent.isDirectory());
  
subDirs.forEach(file => {
	let curDir = projectDir + videoDir + file.name;
	let files = fs.readdirSync(curDir, { withFileTypes: true })
	let array = [];
	files.forEach(file => {
		//console.log(file.name);
		array.push(file.name);
	});
	videos[file.name] = array;
});

let output = JSON.stringify(videos);

fs.writeFileSync(projectDir + "\\videos.js", "let videoFiles = " + output + ";");


console.log("done...");
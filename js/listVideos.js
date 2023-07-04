const fs = require('fs');
const sep = "\\";// "/";//
const currentDir = __dirname;//"E:/Expos/KERMESSE/DEV/Zoltar/html/";



// LIST REPONSES
const reponsesDir = sep+".."+sep+"video"+sep+"reponses"+sep;
let reponses = {};
let subDirs = fs.readdirSync(currentDir + reponsesDir, { withFileTypes: true }).filter(dirent => dirent.isDirectory());
subDirs.forEach(file => {
	let curDir = currentDir + reponsesDir + file.name;
	let files = fs.readdirSync(curDir, { withFileTypes: true })
	let array = [];
	files.forEach(file => {
		//console.log(file.name);
		array.push(file.name);
	});
	reponses[file.name] = array;
});

// LIST INTROS
const introsDir = sep+".."+sep+"video"+sep+"intros"+sep;
let intros  = [];
let introsFiles = fs.readdirSync(currentDir + introsDir, { withFileTypes: true });
introsFiles.forEach(file => {
	intros.push(file.name);
});


fs.writeFileSync(currentDir + sep + "videos.js", 'let introFiles = ["' + intros.join('","') + '"];\nlet videoFiles = ' + JSON.stringify(reponses) + ";");


console.log("Voilà c'est fait...");
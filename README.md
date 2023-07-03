# Zoltar
## Installation
1. Installer [Node.js](https://nodejs.org/dist/v18.16.1/node-v18.16.1-x64.msi) si ce n'est déjà fait.

2. Télécharger [les fichiers de ce projet](https://github.com/boblemarin/zoltar/archive/refs/heads/main.zip)

3. Décompresser le zip quelque part où c'est bien pour travailler

## Préparation
Il faut mettre des fichiers vidéos dans le dossier `video` en respectant une certaine structure. Quand tu modifies le contenu de ce dossier, il faut appliquer la procédure de "Content Update" décrite plus bas.

### Structure de fichiers
Dans le dossier `video`, il faut :
1. Une vidéo `intro.mp4` qui sera lue en boucle pendant la phase d'attente
2. Un dossier `reponses` qui va contenir, dans des sous-dossiers distincts, les morceaux de vidéos où piocher aléatoirement les réponses. L'ordre alphabétique des sous-dossiers permet de contrôler l'ordre de lecture. 

### Content update
Lorsque le contenu du dossier `video` est modifié, il faut lancer le script qui va mettre à jour la liste des vidéos. Pour cela, il faut double-cliquer le fichier `update-video-list.bat`. Le processus ne dure qu'une fraction de seconde. Il ré-écrit le contenu du fichier `js/video.js` qui est utilisé par l'appli.

## Exécution
Pour lancer le projet, une fois la préparation complète, il suffit d'ouvrir la page `index.html`.
Pour une expérience complète (fullscreen, autoplay et tout), il faut avoir quitté Brave complètement afin de le lancer en mode Kiosque, mais ça on en reparle juste après.

@ECHO OFF
if not exist "video\reponses" mkdir video\reponses
node js/listVideos.js
TIMEOUT 2
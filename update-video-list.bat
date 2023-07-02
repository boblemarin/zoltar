@ECHO OFF
if not exist "video\reponses" mkdir video\reponses
node listVideos.js
pause
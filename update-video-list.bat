@ECHO OFF
(echo let videoFiles = `) > videos.js
dir "video/reponses/" /b /a-d >> videos.js
(echo `;) >> videos.js
pause
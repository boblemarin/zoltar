// GAMEPAD CONTROL
/*
joypad.on('connect', (e) => {
  const { id } = e.gamepad;

  console.log(`${id} connected!`);
});
*/
joypad.on('button_press', (e) => {
  const { buttonName } = e.detail;
  switch(buttonName) {
    case 'button_0':
      onButtonPressed(0);
      break;
    case 'button_1':
      onButtonPressed(1);
      break;
    case 'button_2':
      onButtonPressed(2);
      break;
    default:
      console.log(`Unused : ${buttonName}`);
  }
  
});

// KEYBOARD CONTROL (for debugging)
window.addEventListener('keydown', onKeyDown);

function onKeyDown(event) {
  //console.log(event.keyCode);
  switch(event.keyCode) {
    case 37:
        onButtonPressed(0);
        break;
    case 40:
        onButtonPressed(1);
        break;
    case 39:
        onButtonPressed(2);
        break;
  }
}

// ELEMENTS & INITIALISATION
let introContainer = document.querySelector('.container-intro');
let choiceContainer = document.querySelector('.container-choice');
let predictionContainer = document.querySelector('.container-prediction');
let printContainer = document.querySelector('.container-print');

let pvp = document.querySelector('#prediction-video');

let playList = [];

let questions = questionSrc.split('\n');
questions = questions.filter(n => n); // remove empty elements


gsap.to([choiceContainer, predictionContainer, printContainer], {
  autoAlpha: 0,
  duration: 0
});
gsap.from(introContainer, {
  autoAlpha: 0,
  duration: 2,
  onComplete: function() { 
    buttonFunction = introButtonPressed;
    rewindVideoPlayer(document.querySelector('#intro-video'));
  }
});



// APP LOGIC
let buttonFunction;

function onButtonPressed(id) {
  console.log(`Button pressed : ${id}`);
  if (buttonFunction) buttonFunction(id);
}

function getRandomQuestions() {
  let q = [];
  let i  =[];
  while(q.length < 3) {
    let ni = Math.random() * questions.length >> 0;
    if (i.indexOf(ni) == -1) {
      q.push(questions[ni]);
      i.push(ni);
    }
  }
  return q;
}

function introButtonPressed(id) {
  buttonFunction = null;

  // display random questions
  let q = getRandomQuestions();
  question1.innerText = "A) " + q[0];
  question2.innerText = "B) " + q[1];
  question3.innerText = "C) " + q[2];

  gsap.to(introContainer, {
    duration: 1, 
    autoAlpha: 0, 
    onComplete: stopVideoPlayer,
    onCompleteParams: [document.querySelector('#intro-video')]
  });

  gsap.fromTo(document.querySelector('.choice-question-1'), {autoAlpha: 0}, {
    autoAlpha: 1,
    duration: 1,
    delay: 1
  });
  gsap.fromTo(document.querySelector('.choice-question-2'), {autoAlpha: 0}, {
    autoAlpha: 1,
    duration: 1,
    delay: 1.5
  });
  gsap.fromTo(document.querySelector('.choice-question-3'), {autoAlpha: 0}, {
    autoAlpha: 1,
    duration: 1,
    delay: 2,
    onComplete: function() { buttonFunction = choiceButtonPressed }
  });
  gsap.to(choiceContainer, {
    duration: 1,
    autoAlpha: 1
  });
}

function choiceButtonPressed(id) {
  buttonFunction = null;
  populatePlaylist();
  //answersToPlay = 3;
  gsap.to(document.querySelector('.choice-question-1'), {
    autoAlpha: (id == 0)?1:0,
    duration: 0.2
  });
  gsap.to(document.querySelector('.choice-question-2'), {
    autoAlpha: (id == 1)?1:0,
    duration: 0.2
  });
  gsap.to(document.querySelector('.choice-question-3'), {
    autoAlpha: (id == 2)?1:0,
    duration: 0.2
  });
  gsap.fromTo(document.querySelector('.choice-question-'+(id+1)), {
    autoAlpha: 0
  }, {
    autoAlpha: 1,
    duration: 0.4,
    ease: "power2.out",
    delay: 0.4,
    repeat: 6,
    repeatDelay: 0.1,
    onComplete: function() {
      gsap.to(choiceContainer, {
        duration: 0.5,
        autoAlpha: 0
      });
      //playRandomPrediction();
      playNextPrediction();
      gsap.to(predictionContainer, {
        duration: 1,
        autoAlpha: 1
      });
    }
  });
}

function printButtonPressed(id) {
  buttonFunction = null;
  
  // TODO: print if red buttons is pushed

  gsap.to(printContainer, {
    duration: 1,
    autoAlpha: 0
  });
  //rewindVideoPlayer(document.querySelector('#intro-video'));
  playRandomIntroVideo();
  gsap.to(introContainer, {
    duration: 3,
    autoAlpha: 1,
    onComplete: function() { buttonFunction = introButtonPressed }
  });
}

pvp.addEventListener('ended', onPredictionVideoEnded);

function onPredictionVideoEnded(event) {
  if (playList.length > 0) {
      //playRandomPrediction();
      playNextPrediction();
  } else {
  gsap.to(predictionContainer, {
    duration: 1,
    autoAlpha: 0
  });
  gsap.to(printContainer, {
    duration: 1,
    autoAlpha: 1,
    onComplete: function() { buttonFunction = printButtonPressed }
  });
  }
}


// UTILITY FUNCTIONS

function populatePlaylist() {
  let chapters = Object.getOwnPropertyNames(videoFiles).sort();
  playList.length = 0;
  for (let index in chapters) {
    let a = videoFiles[chapters[index]];
    playList.push('video/reponses/'+chapters[index]+'/'+a[Math.random() * a.length >> 0])
  }
  console.log(playList);
}

function playNextPrediction() {
  let vps = document.querySelector('#prediction-video-source');
  vps.setAttribute('src',playList.shift());
  let vp = document.querySelector('#prediction-video');
  vp.load();
  rewindVideoPlayer(vp);
}

function playRandomPrediction() {


  let vps = document.querySelector('#prediction-video-source');
  vps.setAttribute('src','video/reponses/'+ videoAnswers[Math.random() * videoAnswers.length >> 0]);

  let vp = document.querySelector('#prediction-video');
  vp.load();
  rewindVideoPlayer(vp);
}

function stopVideoPlayer(vp) {
  vp.pause();
}

function playRandomIntroVideo() {
  let vps = document.querySelector('#intro-video-source');
  vps.setAttribute('src','video/intros/'+ introFiles[Math.random() * introFiles.length >> 0]);

  let vp = document.querySelector('#intro-video');
  vp.load();
  rewindVideoPlayer(vp);
}

function rewindVideoPlayer(vp) {
  vp.currentTime = 0;
  vp.play();
}
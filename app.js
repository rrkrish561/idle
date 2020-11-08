//const { stat } = require("fs");

var webCamElement = document.getElementById("video");


window.onload = function() {
    initiateCamera();
};


function initiateCamera() {
    let videoElement = document.getElementById('video');
    let canvas = document.getElementById('canvas');
    const webcam = new Webcam(videoElement, 'user', canvas);

    videoElement.visibility = "hidden";

    webcam.start()
        .then(result =>{
        console.log("Video On");
    })
        .catch(err => {
        console.log(err);
    });

    setInterval(function(){processImage(webcam, canvas)}, 5000);

    document.getElementById('button').addEventListener("click", window.close());
} 

function processImage(webcam, canvas) {
    let ctx = canvas.getContext('2d');
    let png = webcam.snap();

    let imageObj = new Image();
    imageObj.src = png;

    ctx.drawImage(imageObj, 0, 0);

    let uri = canvas.toDataURL('image/png'),
    b64 = uri.replace(/^data:image.+;base64,/, '');

    const image = {base64: b64};

    let url = 'https://us-central1-micro-access-294918.cloudfunctions.net/detectFace';

    fetch(url, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, method: "POST", body: JSON.stringify(image)})
        .then(response => response.json())
        .then(data => analyze(data));
}

function analyze(data) {
    const CONFID_LEVEL = 0.96;

    console.log(data)

    let state = {};

    let faceData = data.faceAnnotations;
    let stressData = data.stressLevel.payload;

    if (faceData.length > 0) {
        state.anger = faceData[0].angerLikelihood;;
        state.sorrow = faceData[0].sorrowLikelihood;
        state.joy = faceData[0].joyLikelihood;
        state.tilt = faceData[0].tiltAngle;
    }

    if (stressData.length > 0 && stressData[0].classification.score > CONFID_LEVEL) {
        state.stress = stressData[0].displayName;
        state.postureThreshold = -10;
    }

    idleSays(state);
}

function idleSays(state) {
    let stateIs = new Set();
    stateIs.add("POSSIBLE");
    stateIs.add("LIKELY");
    stateIs.add("VERY_LIKELY");

    let stressComments = ["You seem a little stressed, how about you take a quick break!", 
        "Are you staying hydrated? Try taking a quick water break", "I suggest a cup of coffee to destress!"];

    let joyComments = ["You're doing good, keep it up!", "Looking good!", "Nice work keeping calm!"];

    let postureComments = ["Your neck posture may be off, I suggest sitting up straight", 
        "It's important to keep a strong posture when working"];

    let textBox = document.getElementById('message');
    let dashedLine = document.getElementById('dashed-line');
    let postureBox = document.getElementById('message-posture');

    if ((state.anger !== undefined && stateIs.has(state.anger)) || state.stress !== undefined && state.stress === "Stressed") {
        textBox.textContent = stressComments[Math.floor(Math.random() * stressComments.length)];
    } else if (state.joy !== undefined && stateIs.has(state.joy)) {
        textBox.textContent = joyComments[Math.floor(Math.random() * joyComments.length)];
    }

    if (state.tilt != undefined && state.tilt < state.postureThreshold) {
        dashedLine.textContent ="________________________________________";
        postureBox.textContent = postureComments[Math.floor(Math.random() * postureComments.length)] + "\n\n\n";
    } else {
        postureBox.textContent = "";
    }
}

function stopCamera(webcam) {
    webcam.stop();
}


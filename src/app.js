
window.onload = function() {
    initiateCamera();
};


function initiateCamera() {
    let videoElement = document.getElementById('video');
    let canvas = document.getElementById('canvas');
    const webcam = new Webcam(videoElement, 'user', canvas);

    webcam.start()
        .then(result =>{
        console.log("Video On");
    })
        .catch(err => {
        console.log(err);
    });

    setTimeout(function(){processImage(webcam, canvas)}, 3000);
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

    let url = 'https://cors-anywhere.herokuapp.com/https://us-central1-micro-access-294918.cloudfunctions.net/detectFace';

    fetch(url, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, method: "POST", body: JSON.stringify(image)})
        .then(response => response.json())
        .then(data => analyze(data));
}

function analyze(data) {
    console.log(data)

    let emotionAnger = "";
    let emotionSorrow = "";
    let emotionJoy = "";
    let rollAngle = "";

    let faceData = data.faceAnnotations;

    if (faceData.length > 0) {
        emotionAnger = faceData[0].angerLikelihood;
        emotionSorrow = faceData[0].sorrowLikelihood;
        emotionJoy = faceData[0].joyLikelihood;
        rollAngle = faceData[0].tiltAngle;
    }
}

function stopCamera(webcam) {
    webcam.stop();
}


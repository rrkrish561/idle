

window.onload = function() {
    startCamera();
  };

function startCamera() {
    let videoElement = document.getElementById('video');
    let canvasElement = document.getElementById('canvas');
    const webcam = new Webcam(videoElement, 'user', canvasElement);

    webcam.start()
        .then(result =>{
        console.log("Video On");
    })
        .catch(err => {
        console.log(err);
    });
}


function captureImage(webcam) {
    return webcam.snap();   
}  

function stopCamera(webcam) {
    webcam.stop();
}

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

    setInterval(function(){return webcamp.snap();}, 30000, webcam);
} 

function stopCamera(webcam) {
    webcam.stop();
}


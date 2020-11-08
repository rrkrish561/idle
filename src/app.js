
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

    setTimeout(function(){processImage(webcam)}, 3000);
} 

function processImage(webcam) {
    let base64Image = webcam.snap();
    
    const image = {base64: base64Image};
    console.log(image)
    let url = 'https://cors-anywhere.herokuapp.com/https://us-central1-micro-access-294918.cloudfunctions.net/detectFace';

    fetch(url, {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}, method: "POST", body: JSON.stringify(image)})
        .then(response => response.json())
        .then(data => console.log(data));
}

function stopCamera(webcam) {
    webcam.stop();
}


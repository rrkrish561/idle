require('dotenv').config();

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');


exports.detectFace = (req, res) => {
    let message = req.query.message || req.body.message || 'Hello World!'
    res.status(200).send(message);
};
  


async function detect() {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();
    const fileName = './images/39843138-sad-man.jpg';

    const [result] = await client.faceDetection(fileName);

    console.log(result)

    const faces = result.faceAnnotations;
    console.log('Faces:');
    faces.forEach((face, i) => {
        console.log(`  Face #${i + 1}:`);
        console.log(`    Joy: ${face.joyLikelihood}`);
        console.log(`    Anger: ${face.angerLikelihood}`);
        console.log(`    Sorrow: ${face.sorrowLikelihood}`);
        console.log(`    Surprise: ${face.surpriseLikelihood}`);
    });
}

//detect()
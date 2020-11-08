require('dotenv').config();

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');


exports.detectFace = (req, res) => {
    console.log("req received")

    res.set('Access-Control-Allow-Origin', "*")

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        console.log("cors bs")
        
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {

        console.log(req.body)
        const body = req.body

        // res.status(200).send(req.body)
        detect(body).then((result) => {
            res.status(200).send(result);
        })   
    } 
};

async function detect(img) {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    const [result] = await client.faceDetection(img);

    return result

    // console.log(result)

    // const faces = result.faceAnnotations;
    // console.log('Faces:');
    // faces.forEach((face, i) => {
    //     console.log(`  Face #${i + 1}:`);
    //     console.log(`    Joy: ${face.joyLikelihood}`);
    //     console.log(`    Anger: ${face.angerLikelihood}`);
    //     console.log(`    Sorrow: ${face.sorrowLikelihood}`);
    //     console.log(`    Surprise: ${face.surpriseLikelihood}`);
    // });
}
require('dotenv').config();

// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');


exports.detectFace = (req, res) => {
    console.log("req received")

    res.set('Access-Control-Allow-Origin', "*")

    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
    } else {

        console.log(req.body)

        // res.status(200).send(req.body)
        detect(req.body.base64).then((result) => {
            res.status(200).send(JSON.stringify(result));
        }).catch((err) => {
            console.log(err)
            res.status(400).send(JSON.stringify(err))
        })
    } 
};

async function detect(base64Img) {
    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    //const img = fs.readFileSync(base64Img)
    //console.log(img)

    //var encoded = Buffer.from(img).toString('base64');
    //console.log(encoded)

    const request = {
        image: {
            content: base64Img
        },
        features: [
            {
                type: 'FACE_DETECTION'
            }
        ]
    }
    const [result] = await client.annotateImage(request);

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

//detect('./images/hi.jpeg').then((result) => { console.log(result) }).catch((err) => { console.log(err) })
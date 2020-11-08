# idle
WHACK 2020


Welcome to IDLE, a Google Cloud driven health AI meant to monitor your stress, posture and more!

IDLE is a web app that monitors various metrics regarding your stress levels, happiness, and posture.
IDLE makes use of a variety of Google Cloud services in order to evaluate these metrics based on the features of your face, and the roll angle of your head.

IDLE ensures that the user is maintaining proper posture as they work on their computer while also using face detection to ensure that they are not getting too stressed while working.

Google Cloud Vision API

The Google Cloud Vision API provides us with various face detection features, letting us know if there is a face in the frame, and also gives us info on
the likelihood that the user is experiencing a particular emotion and the roll, tilt, and pan angles of the user's head.

Google Cloud AutoML Vision API

While Cloud Vision API gives us a lot of information regarding the features of a user's face, we still needed something a little more tailored for our own purposes
in order to determine the user's stress. This is where Google Cloud's AutoML comes in. Using AutoML, we were able to create our own machine learning model trained with hundreds
of pictures of both stressed and unstressed faces. As a result, we were able to make a call to our model to also tell if the user is stressed given a threshold confidence level.

Google Functions

To top off the Google Cloud stack, we make use of the scalability and flexibility of Cloud Functions to deploy our backend where API calls are being made.

Frontend

On the frontend, we use standard HTML, JavaScript, and CSS to capture the user's picture at a set interval and make an API request to our backend Cloud Function.

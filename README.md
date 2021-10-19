# AWS S3 SigV4 
## Introduction 
- This repo contain basic example on how to create Signature V4 for **S3**.
- Use this signature to connect to S3 using HTTPS request.
- Feel free to explore the code at your own risk. :stuck_out_tongue_winking_eye:

## Tech
This repo uses open source projects to work properly:
- [node.js] - used for the backend
- [AWS CLI] - used for enviroment

## Installation
- Requires latest [Node.js][node.js] to run.
- Requires latest [AWS CLI][AWS CLI] to run.

Fill up `REGION`,`SECRET_KEY`,`ACCESS_KEY`,`METHOD` and `END_POINT` in config.js

- Install the dependencies and devDependencies.
```sh
cd AWS_S3_Signature_V4
npm install
```

- Run test.js to execute lambda function in index.js
```sh
node test.js
```

- Copy the result as `QUERY_PARAMETER` and change `END_POINT` as in the config.js.
- Ex: Test http request below by using postman for `GET`,`PUT` and `DELETE` methods.
```sh
https://<END_POINT>/example.png?<QUERY_PARAMETER>
```

## License
MIT

**Free Software, Syukran Alhamdulillah Thank to Allah!**
    
   [awssdk]: <https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Rekognition.html>
   [node.js]: <http://nodejs.org>
   [SAM CLI]: <https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html>
   [AWS CLI]: <https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html>

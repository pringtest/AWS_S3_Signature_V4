// NPM Library
const AWS = require("aws-sdk");
const moment = require('moment');

// parameter configuration
const { 
    SERVICE_NAME, 
    REGION, 
    SECRET_KEY, 
    ACCESS_KEY, 
    METHOD, 
    API_PATH, 
    END_POINT, 
    EXPIRED 
} = require('./config.js');


// Create Signature 4
exports.CreateSig4 = async (event, callback) => {
    try {
        var time = moment.utc();
        var dateStamp = time.format('YYYYMMDD');
        var amzdate = `${dateStamp}T${time.format('HHmmss')}Z`;
        var service = SERVICE_NAME;
        var region = REGION;
        var secretKey = SECRET_KEY;
        var accessKey = ACCESS_KEY;
        var algorithm = 'AWS4-HMAC-SHA256';
        var method = METHOD;
        var canonicalUri = API_PATH;
        var host = END_POINT; // IoT Core end point
        var expired = EXPIRED; // Ex: 86400

        var credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
        var canonicalQuerystring = `X-Amz-Algorithm=${algorithm}`;
        canonicalQuerystring += `&X-Amz-Credential=${encodeURIComponent(accessKey + '/' + credentialScope)}`;
        canonicalQuerystring += `&X-Amz-Date=${amzdate}`;
        canonicalQuerystring += `&X-Amz-Expires=${expired}`;
        canonicalQuerystring += `&X-Amz-SignedHeaders=host`;
    
        var canonicalHeaders = `host:${host}\n`;
        var payloadHash = SigV4Utils_sha256('');
        var canonicalRequest = `${method}\n${canonicalUri}\n${canonicalQuerystring}\n${canonicalHeaders}\nhost\n${payloadHash}`;

        var stringToSign = algorithm + '\n' +  amzdate + '\n' +  credentialScope + '\n' +  SigV4Utils_sha256(canonicalRequest);
        var signingKey = SigV4Utils_getSignatureKey(secretKey, dateStamp, region, service);
        var signature = SigV4Utils_sign(signingKey, stringToSign);

        canonicalQuerystring += '&X-Amz-Signature=' + signature;
        console.log('canonicalQuerystring : ', canonicalQuerystring)

        callback(null, "Create signature success")
    }
    catch (err) {
       callbackerror(err.statusCode, err.message, callback)
    }
 }

function SigV4Utils_sign (key, msg) {
    return AWS.util.crypto.hmac(key, msg, 'hex');
}

function SigV4Utils_getSignatureKey (key, dateStamp, regionName, serviceName) {
    var kDate = AWS.util.crypto.hmac('AWS4' + key, dateStamp, 'buffer');
    var kRegion = AWS.util.crypto.hmac(kDate, regionName, 'buffer');
    var kService = AWS.util.crypto.hmac(kRegion, serviceName, 'buffer');
    var kCredentials = AWS.util.crypto.hmac(kService, 'aws4_request', 'buffer');    
    return kCredentials;
};

function SigV4Utils_sha256 (msg) {
    return AWS.util.crypto.sha256(msg, 'hex');
};

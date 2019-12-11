import * as AWS from 'aws-sdk';
import * as lodash from 'lodash';

const indexOfEnd = (fullstring, stringURL) => {
  const io = fullstring.indexOf(stringURL);
  return io === -1 ? -1 : io + stringURL.length;
};

const UploadBinaryToUri = async values => {
  const endpoint = process.env.SCALEWAY_ENDPOINT;
  const region = process.env.SCALEWAY_REGION;
  const accessKey = process.env.SCALEWAY_ACESS_KEY;
  const secretKey = process.env.SCALEWAY_SECRET_KEY;
  const bucketName = process.env.SCALEWAY_BUCKET_NAME;

  const client = new AWS.S3({
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
    region,
    endpoint,
  });
  if (!lodash.isNull(values.mediaBlob) && !lodash.isUndefined(values.mediaBlob)) {
  // eslint-disable-next-line new-cap
  const mediaBlob: Buffer = Buffer.from(
    values.mediaBlob.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );

  const params = {
    Bucket: `${bucketName}`,
    Key: `postApi/${values.userUuid}.${Date.now()}.${values.mediaType}`,
    Body: mediaBlob,
    ACL: 'public-read',
  };
  
    const stringLocation = endpoint.substring(indexOfEnd(endpoint, 'https://'));
    client.upload(params, (err: any) => {
      if (err) {
        throw err;
      }
    });
    return `https://${bucketName}.${stringLocation}${params.Key}`;
  }
  return values.mediaUrl;
};

export { UploadBinaryToUri };

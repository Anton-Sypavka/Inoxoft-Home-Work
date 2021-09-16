const S3 = require('aws-sdk/clients/s3');
const path = require('path');
const uuid = require('uuid').v1;

const {
    AWS_S3_NAME,
    AWS_S3_REGION,
    AWS_ACCESS_KEY,
    AWS_PRIVAT_KEY
} = require('../configs/config');

const bucket = new S3({
    region: AWS_S3_REGION,
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_PRIVAT_KEY
});

module.exports = {
    upload: (file, itemType, itemId) => {
        const uploadPath = _fileNameBuilder(file.name, itemType, itemId);

        return bucket.upload({
            Bucket: AWS_S3_NAME,
            Body: file.data,
            Key: uploadPath,
            ContentType: file.mimetype
        })
            .promise();
    }
};

function _fileNameBuilder(fileName, itemType, itemId) {
    const fileExt = fileName.split('.').pop();

    return `${itemType}/${itemId.toString()}/${uuid()}.${fileExt}`;
}

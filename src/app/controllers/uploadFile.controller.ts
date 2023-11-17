import {
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Request, Response } from 'express';
import fs from 'fs';
import multiparty from 'multiparty';

import {
    BUCKET_NAME,
    EXPIRE_TIME,
    FOLDER_NAME,
    MAX_FILE_SIZE,
} from '@/config/constants';
import { envOrFail } from '@/utils/env';

const s3client = new S3Client({
    credentials: {
        accessKeyId: envOrFail('AWS_ACCESS_KEY_ID'),
        secretAccessKey: envOrFail('AWS_SECRET_ACCESS_KEY'),
    },
    region: envOrFail('AWS_REGION'),
});

async function uploadFile(req: Request, res: Response) {
    try {
        const form = new multiparty.Form();
        form.parse(req, async (error, fields, files) => {
            try {
                if (error) throw error;
                // console.log(files);

                if (files.file[0].size > MAX_FILE_SIZE)
                    throw new Error('File size too large');

                const buffer = fs.readFileSync(files.file[0].path);
                const date = new Date();
                const fileName =
                    date.toISOString() + '_' + files.file[0].originalFilename;
                const command = new PutObjectCommand({
                    Bucket: BUCKET_NAME,
                    Key: FOLDER_NAME + '/' + fileName,
                    Body: buffer,
                });
                const response = await s3client.send(command);

                return res.status(200).send({ ...response, fileName });
            } catch (error) {
                // console.log(error);
                return res.status(500).send({
                    error: 'Could not upload. Please make sure that file is less than 4MB',
                });
            }
        });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'Form parsing error.' });
    }
}

async function getFile(req: Request, res: Response) {
    try {
        const key = req.params.key;
        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: FOLDER_NAME + '/' + key,
        });
        const url = await getSignedUrl(s3client, command, {
            expiresIn: EXPIRE_TIME,
        });

        return res.status(200).send({ url, expiresIn: EXPIRE_TIME });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'Could not get url.' });
    }
}

export { getFile, uploadFile };

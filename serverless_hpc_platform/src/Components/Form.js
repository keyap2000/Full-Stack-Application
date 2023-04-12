import AWS from 'aws-sdk';
import { useState } from 'react';

import axios from 'axios'

const { nanoid } = require('nanoid');

AWS.config.update({
    accessKeyId: 'ACCESSKEY',
    secretAccessKey: 'SECRETACCESSKEY',
    region: 'ap-southeast-2',
    signatureVersion: 'v4',
});

export const Form = () => {
    const s3 = new AWS.S3();
    const [file, setFile] = useState(null);
    const [text, setText] = useState('')

    const handleFileSelect = (e) => {
        setFile(e.target.files[0]);
    }

    const handleText = (event) => {
        setText(event.target.value);
    }

    const uploadToS3 = async () => {
        if (!file) {
            return;
        }
        const params = {
            Bucket: 'fovus-serverless-project',
            Key: file.name,
            Body: file
        };
        const { Location } = await s3.upload(params).promise();
        console.log('uploading to s3', Location);

        var data = {
            id: nanoid(),
            input_file_path: "fovus-serverless-project/" + file.name,
            input_text: text
        };

        var config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: 'https://1gfpdch7c5.execute-api.us-east-2.amazonaws.com/items',
            headers: {
                'Content-Type': 'text/plain'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div style={{ marginTop: '150px' }}>

            <div>
                <label >Text input: </label>

                <input type="text" onChange={(e) => { handleText(e) }} />

            </div>
            <br></br>

            <div>
                <label >File input: </label>
                <input type="file" onChange={handleFileSelect} />
            </div>


            <div style={{ marginTop: '10px' }}>
                <button onClick={uploadToS3}>Submit</button>
            </div>


        </div>
    );
}

import AWS from 'aws-sdk';
import { useState } from 'react';

AWS.config.update({
    accessKeyId: 'AKIAVHCA2VB7D7NLU5CX',
    secretAccessKey: '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',
    region: 'ap-southeast-2',
    signatureVersion: 'v4',
});

export const Form = () => {
    const s3 = new AWS.S3();
    // const [imageUrl, setImageUrl] = useState(null);
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
            Key: `${Date.now()}.${file.name}`,
            Body: file
        };
        const { Location } = await s3.upload(params).promise();
        // setImageUrl(Location);
        console.log('uploading to s3', Location);
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
            
            {/* {imageUrl && (
                <div style={{ marginTop: '10px' }}>
                    <img src={imageUrl} alt="uploaded" />
                </div>
            )} */}
        </div>
    );
}

import React, { useState } from 'react';

const AdminUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
            setUploadStatus('');
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setError('Please select a file to upload.');
            return;
        }

        setUploadStatus('Uploading...');
        setError(null);

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            // Replace with the actual API endpoint in your GiftBackend for file upload
            const response = await fetch('YOUR_GIFT_BACKEND_URL/admin/upload-users', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setUploadStatus(`Upload successful. Response: ${data.message || 'File processed.'}`);
            } else {
                setError(`Upload failed. Status: ${response.status}. Message: ${data.error || 'Something went wrong.'}`);
            }
        } catch (e: any) {
            setError(`Upload failed. Network error: ${e.message}`);
        }
    };

    return (
        <div>
            <h1>Admin Page - Upload User List for Gift Cards</h1>
            <div>
                <input type="file" onChange={handleFileChange} />
            </div>
            <button onClick={handleUpload} disabled={!selectedFile || uploadStatus === 'Uploading...'}>
                {uploadStatus === 'Uploading...' ? 'Uploading...' : 'Upload File'}
            </button>
            {uploadStatus && <p>{uploadStatus}</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default AdminUpload;
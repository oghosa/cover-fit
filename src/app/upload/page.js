"use client";

import { useState } from 'react';

export default function UploadCSV() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-csv', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (response.ok) {
        setMessage(result.message);
        setError('');
      } else {
        setError(result.error || 'An error occurred');
        setMessage('');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError(`Failed to upload file: ${error.message}`);
      setMessage('');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Upload CSV</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-2 block"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
      </form>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">CSV Format Instructions</h2>
        <p className="mb-2">Please ensure your CSV file has the following columns:</p>
        <ul className="list-disc list-inside">
          <li>Plan_id</li>
          <li>HMO_id</li>
          <li>HMO_Name</li>
          <li>Plan_Category</li>
          <li>Plan_Name</li>
          <li>Plan_Details_Highlights</li>
          <li>Plan_Cost_USD</li>
          <li>Plan_Annual_Cost_Naira</li>
          <li>Plan_Link</li>
          <li>Plan_Detailed_Additional_Information</li>
          <li>Plan_Last_Updated</li>
          <li>Plan_Price_Range</li>
          <li>Plan_Type</li>
          <li>Plan_Name_Full</li>
        </ul>
      </div>
    </div>
  );
}
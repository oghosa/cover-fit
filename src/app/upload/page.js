"use client";

import { useState } from 'react';

export default function UploadCSV() {
  const [planFile, setPlanFile] = useState(null);
  const [hmoFile, setHmoFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const file = type === 'plan' ? planFile : hmoFile;
    if (!file) {
      setError(`Please select a ${type} file`);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(type === 'plan' ? '/api/upload-csv' : '/api/upload-hmo-csv', {
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
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Upload Plans CSV</h2>
        <form onSubmit={(e) => handleSubmit(e, 'plan')} className="mb-4">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setPlanFile(e.target.files[0])}
            className="mb-2 block"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload Plans</button>
        </form>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Upload HMOs CSV</h2>
        <form onSubmit={(e) => handleSubmit(e, 'hmo')} className="mb-4">
          <input
            type="file"
            accept=".csv"
            onChange={(e) => setHmoFile(e.target.files[0])}
            className="mb-2 block"
          />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Upload HMOs</button>
        </form>
      </div>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">CSV Format Instructions</h2>
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Plans CSV Columns:</h3>
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
            <li>Is_CoverFit_Best</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">HMOs CSV Columns:</h3>
          <ul className="list-disc list-inside">
            <li>HMO_id</li>
            <li>HMO_Name</li>
            <li>HMO_Category</li>
            <li>HMO_Website</li>
            <li>HMO_Email</li>
            <li>HMO_Phone_Number</li>
            <li>HMO_Address</li>
            <li>HMO_Providers_link</li>
            <li>HMO_Provider_Count_Estimate</li>
            <li>HMO_Last_Updated</li>
            <li>HMO_Number_of_Plans</li>
            <li>HMO_Min_Plan_Cost</li>
            <li>HMO_Average_Plan_Cost</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
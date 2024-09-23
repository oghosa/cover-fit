"use client";

import React, { useState } from 'react';

const SeedDatabase = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSeed = async () => {
    try {
      const response = await fetch('/api/seed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.message) {
        setMessage(data.message);
        setError('');
      } else if (data.error) {
        setError(data.error);
        setMessage('');
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setError(`Failed to seed database: ${error.message}`);
      setMessage('');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Seed Database</h1>
      <button 
        onClick={handleSeed}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Seed Database
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default SeedDatabase;

// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [message, setMessage] = useState('');

  const handlePrint = async () => {
    try {
      const response = await axios.post('http://localhost:5000/print', { text });
      setMessage(response.data);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="App">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Escribe el texto a imprimir"
      />
      <button onClick={handlePrint}>Print</button>
      <p>{message}</p>
    </div>
  );
}

export default App;


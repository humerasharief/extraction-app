import React, { useRef, useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const fileRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [resFileName, setResFileName] = useState('Initial File name');
  const [keywords, setKeywords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    
    fetchFilename();
  }, [fileName])

  async function fetchFilename() {
      try{
        const response = await fetch("/filename");
        if(!response.ok) throw new Error("Invalid response");
        else {
          const data = await response.json();
          console.log(data)
          setResFileName(data.name);
        }
      } catch {
        return setError("Invalid URL");
      }
    }


  const handleFileChange = () => {
    const file = fileRef.current.files[0];
    if (file) setFileName(file.name);
  };

  const fileHandler = async () => {
    setError('');
    setKeywords([]);
    const file = fileRef.current.files[0];
    if (!file) return setError('Please select a file first');

    const formdata = new FormData();
    formdata.append('file', file);

    setLoading(true);
    try {
      const resp = await fetch('/keyword', {
        method: 'POST',
        body: formdata,
      });
      if (!resp.ok) throw new Error('Network response was not ok: ' + resp.status);
      const data = await resp.json();
      setKeywords(data.keywords || []);
      await fetchFilename();
    } catch (err) {
      setError(err.message || 'Failed to fetch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {resFileName} File Name from GET
      <h2>Keyword Extraction</h2>
      
      <input type="file" ref={fileRef} onChange={handleFileChange} />
      {fileName && <p>📄 Selected file: <strong>{fileName}</strong></p>}
      <button onClick={fileHandler} disabled={loading}>Extract Keywords</button>

      {loading && <p>Loading…</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}

      {keywords.length > 0 && (
        <div>
          <h3>Extracted Keywords updated code 29 October 2025</h3>
          <ul>
            {keywords.map((kw,i) => <li key={i}>{kw}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

import { useState } from 'react';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('Loading...');

    try {
      const encodedPrompt = encodeURIComponent(prompt);

      // Example endpoint
      // Change this according to your Spring Boot API
      const res = await fetch(
        `http://localhost:8080/api/ollama/${encodedPrompt}`
      );

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.text();
      setResponse(data);
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Ollama Chat</h1>

      <div className="prompt-container">
        <textarea
          placeholder="Ask something..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !prompt.trim()}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      <div className="response-box">
        <h3>Response</h3>

        {response ? (
          <div className="response-text">{response}</div>
        ) : (
          <div className="placeholder-text">
            Response will appear here
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
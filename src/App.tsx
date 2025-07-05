import React, { useState } from 'react';
import Header from './components/Header';
import RequestBuilder from './components/RequestBuilder';
import ResponseViewer from './components/ResponseViewer';
import History from './components/History';
import { RequestData, ResponseData } from './types';
import { makeRequest } from './utils/api';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useLocalStorage<RequestData[]>('api-tester-history', []);

  const handleSendRequest = async (request: RequestData) => {
    setIsLoading(true);
    setResponse(null);

    try {
      const result = await makeRequest(
        request.method,
        request.url,
        request.headers,
        request.body
      );

      setResponse(result);
      
      // Add to history
      const updatedRequests = [request, ...requests.slice(0, 49)]; // Keep last 50 requests
      setRequests(updatedRequests);
    } catch (error) {
      setResponse(error as ResponseData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectRequest = (request: RequestData) => {
    // This would typically populate the request builder with the selected request
    console.log('Selected request:', request);
  };

  const handleClearHistory = () => {
    setRequests([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <History 
          requests={requests} 
          onSelectRequest={handleSelectRequest}
          onClearHistory={handleClearHistory}
        />
        <RequestBuilder 
          onSendRequest={handleSendRequest}
          isLoading={isLoading}
        />
        <ResponseViewer 
          response={response}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;
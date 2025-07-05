import React, { useState } from 'react';
import { Send, Plus, X, Copy, Code } from 'lucide-react';
import { RequestData } from '../types';

interface RequestBuilderProps {
  onSendRequest: (request: RequestData) => void;
  isLoading: boolean;
}

const HTTP_METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

export default function RequestBuilder({ onSendRequest, isLoading }: RequestBuilderProps) {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [headers, setHeaders] = useState<Record<string, string>>({
    'Content-Type': 'application/json'
  });
  const [body, setBody] = useState('');
  const [activeTab, setActiveTab] = useState('headers');

  const handleAddHeader = () => {
    const newKey = `Header-${Object.keys(headers).length + 1}`;
    setHeaders({ ...headers, [newKey]: '' });
  };

  const handleUpdateHeader = (oldKey: string, newKey: string, value: string) => {
    const updatedHeaders = { ...headers };
    delete updatedHeaders[oldKey];
    updatedHeaders[newKey] = value;
    setHeaders(updatedHeaders);
  };

  const handleDeleteHeader = (key: string) => {
    const updatedHeaders = { ...headers };
    delete updatedHeaders[key];
    setHeaders(updatedHeaders);
  };

  const handleSend = () => {
    const request: RequestData = {
      id: Date.now().toString(),
      method,
      url,
      headers,
      body,
      timestamp: Date.now()
    };
    onSendRequest(request);
  };

  const formatBody = () => {
    try {
      const parsed = JSON.parse(body);
      setBody(JSON.stringify(parsed, null, 2));
    } catch (e) {
      // Invalid JSON, keep as is
    }
  };

  return (
    <div className="flex-1 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-medium"
          >
            {HTTP_METHODS.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter request URL"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !url}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>{isLoading ? 'Sending...' : 'Send'}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('headers')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'headers'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Headers
            </button>
            {['POST', 'PUT', 'PATCH'].includes(method) && (
              <button
                onClick={() => setActiveTab('body')}
                className={`px-6 py-3 font-medium ${
                  activeTab === 'body'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Body
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 p-6">
          {activeTab === 'headers' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Headers</h3>
                <button
                  onClick={handleAddHeader}
                  className="flex items-center space-x-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Header</span>
                </button>
              </div>
              <div className="space-y-2">
                {Object.entries(headers).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={key}
                      onChange={(e) => handleUpdateHeader(key, e.target.value, value)}
                      placeholder="Header name"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleUpdateHeader(key, key, e.target.value)}
                      placeholder="Header value"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleDeleteHeader(key)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'body' && ['POST', 'PUT', 'PATCH'].includes(method) && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Request Body</h3>
                <button
                  onClick={formatBody}
                  className="flex items-center space-x-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Code className="w-4 h-4" />
                  <span>Format JSON</span>
                </button>
              </div>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter request body (JSON, XML, etc.)"
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
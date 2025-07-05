import React, { useState } from 'react';
import { Copy, Download, Clock, Database } from 'lucide-react';
import { ResponseData } from '../types';
import AdSpace from './AdSpace';

interface ResponseViewerProps {
  response: ResponseData | null;
  isLoading: boolean;
}

export default function ResponseViewer({ response, isLoading }: ResponseViewerProps) {
  const [activeTab, setActiveTab] = useState('body');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600 bg-green-50';
    if (status >= 300 && status < 400) return 'text-yellow-600 bg-yellow-50';
    if (status >= 400 && status < 500) return 'text-orange-600 bg-orange-50';
    if (status >= 500) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  if (isLoading) {
    return (
      <div className="flex-1 bg-gray-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Sending request...</p>
          </div>
        </div>
        
        {/* Loading state ad */}
        <div className="p-6 border-t border-gray-200">
          <AdSpace 
            slot="4567890123"
            format="horizontal"
            style={{ minHeight: '90px' }}
          />
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="flex-1 bg-gray-50 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600">No response yet</p>
            <p className="text-sm text-gray-500 mt-2">Send a request to see the response</p>
          </div>
        </div>
        
        {/* Empty state ad */}
        <div className="p-6 border-t border-gray-200">
          <AdSpace 
            slot="5678901234"
            format="rectangle"
            style={{ minHeight: '250px' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(response.status)}`}>
              {response.status} {response.statusText}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{response.time}ms</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Database className="w-4 h-4" />
              <span>{formatBytes(response.size)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => copyToClipboard(JSON.stringify(response.data, null, 2))}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>
            <button
              onClick={() => {
                const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'response.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="flex items-center space-x-2 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('body')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'body'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Response Body
          </button>
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
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 overflow-auto">
          {activeTab === 'body' && (
            <div className="space-y-3">
              <pre className="bg-gray-50 p-4 rounded-lg overflow-auto text-sm font-mono border">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            </div>
          )}

          {activeTab === 'headers' && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900">Response Headers</h3>
              <div className="space-y-2">
                {Object.entries(response.headers).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-900 min-w-0 flex-1">{key}:</span>
                    <span className="text-gray-600 min-w-0 flex-2">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom response ad */}
        <div className="p-6 border-t border-gray-100">
          <AdSpace 
            slot="6789012345"
            format="horizontal"
            style={{ minHeight: '90px' }}
          />
        </div>
      </div>
    </div>
  );
}
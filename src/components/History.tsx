import React from 'react';
import { History as HistoryIcon, Clock, Trash2 } from 'lucide-react';
import { RequestData } from '../types';
import AdSpace from './AdSpace';

interface HistoryProps {
  requests: RequestData[];
  onSelectRequest: (request: RequestData) => void;
  onClearHistory: () => void;
}

export default function History({ requests, onSelectRequest, onClearHistory }: HistoryProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'text-green-600 bg-green-50';
      case 'POST': return 'text-blue-600 bg-blue-50';
      case 'PUT': return 'text-yellow-600 bg-yellow-50';
      case 'DELETE': return 'text-red-600 bg-red-50';
      case 'PATCH': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HistoryIcon className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">History</h2>
          </div>
          {requests.length > 0 && (
            <button
              onClick={onClearHistory}
              className="flex items-center space-x-1 px-2 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Sidebar Ad Space */}
      <div className="p-4 border-b border-gray-100">
        <AdSpace 
          slot="2345678901"
          format="rectangle"
          style={{ minWidth: '250px', minHeight: '250px' }}
        />
      </div>

      <div className="flex-1 overflow-auto">
        {requests.length === 0 ? (
          <div className="p-6 text-center">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No requests yet</p>
            <p className="text-sm text-gray-400 mt-2">Your request history will appear here</p>
          </div>
        ) : (
          <div className="space-y-1 p-4">
            {requests.map((request, index) => (
              <React.Fragment key={request.id}>
                <div
                  onClick={() => onSelectRequest(request)}
                  className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getMethodColor(request.method)}`}>
                      {request.method}
                    </span>
                    <span className="text-xs text-gray-500">{formatTime(request.timestamp)}</span>
                  </div>
                  <p className="text-sm text-gray-900 truncate group-hover:text-blue-600">
                    {request.url}
                  </p>
                </div>
                
                {/* Insert ad after every 5 requests */}
                {(index + 1) % 5 === 0 && index < requests.length - 1 && (
                  <div className="py-2">
                    <AdSpace 
                      slot="3456789012"
                      format="auto"
                      style={{ minHeight: '100px' }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
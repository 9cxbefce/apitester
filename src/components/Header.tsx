import React from 'react';
import { Zap } from 'lucide-react';
import AdSpace from './AdSpace';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">API Tester</h1>
                <p className="text-sm text-gray-500">Professional API testing tool</p>
              </div>
            </div>
          </div>
          
          {/* Header Ad Space */}
          <div className="hidden lg:block">
            <AdSpace 
              slot="1234567890"
              format="horizontal"
              className="max-w-md"
              style={{ minWidth: '320px', minHeight: '50px' }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
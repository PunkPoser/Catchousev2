import React from 'react';
import Card from '../components/ui/Card';

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-6 space-y-6">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">General Settings</h2>
          <p className="text-sm text-gray-600 mb-4">
            Manage your notifications, saved filters, and privacy controls. These are placeholders for future functionality.
          </p>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex items-center justify-between">
              <span>Push notifications</span>
              <span className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">Coming soon</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Share saved filters across devices</span>
              <span className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">Coming soon</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Privacy preferences</span>
              <span className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">Coming soon</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Settings;


import React, { useState } from 'react';
import { XMarkIcon, CheckIcon } from './icons';

interface ClientKeyInputProps {
  onSave: (key: string) => void;
  onClose: () => void;
}

const ClientKeyInput: React.FC<ClientKeyInputProps> = ({ onSave, onClose }) => {
  const [key, setKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verifiedData, setVerifiedData] = useState<{ tier: string; remaining: number } | null>(null);

  const handleVerifyAndSave = async () => {
    if (!key.trim()) return;
    
    setIsVerifying(true);
    setError(null);

    try {
      const res = await fetch('/api/user/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientKey: key.trim() })
      });
      
      const data = await res.json();

      if (res.ok && data.valid) {
        setVerifiedData({ tier: data.tier, remaining: data.remaining });
        // Slight delay to show success state before closing
        setTimeout(() => {
            onSave(key.trim());
        }, 1000);
      } else {
        setError(data.error || 'Invalid Access Key');
        setVerifiedData(null);
      }
    } catch (err) {
      setError('Connection failed. Please check internet.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Enter Access Key</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm">
          To use the Nano Banana Pro AI features, please enter the Client Access Key provided by the administrator.
        </p>
        
        <input
          type="text"
          value={key}
          onChange={(e) => {
              setKey(e.target.value);
              setError(null);
              setVerifiedData(null);
          }}
          placeholder="e.g. CLIENT-12345"
          className={`w-full border rounded-md px-3 py-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
          onKeyDown={(e) => e.key === 'Enter' && handleVerifyAndSave()}
        />

        {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        {verifiedData && (
            <div className="bg-green-50 border border-green-200 rounded-md p-3 mb-4 flex items-center">
                <div className="bg-green-100 p-1 rounded-full mr-3">
                    <CheckIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                    <p className="text-green-800 font-semibold text-sm">Key Verified!</p>
                    <p className="text-green-700 text-xs">Plan: <span className="uppercase">{verifiedData.tier}</span> • Remaining Today: {verifiedData.remaining}</p>
                </div>
            </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md text-sm">
            Cancel
          </button>
          <button 
            onClick={handleVerifyAndSave} 
            disabled={!key.trim() || isVerifying || !!verifiedData}
            className={`px-4 py-2 text-white rounded-md text-sm font-semibold flex items-center space-x-2 ${verifiedData ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} disabled:bg-gray-400`}
          >
            {isVerifying ? (
                <span>Verifying...</span>
            ) : verifiedData ? (
                <span>Success</span>
            ) : (
                <span>Verify & Save</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientKeyInput;

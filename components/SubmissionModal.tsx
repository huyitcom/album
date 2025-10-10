

import React, { useState } from 'react';
import { XMarkIcon, PaperAirplaneIcon } from './icons';
import { useI18n } from './i18n';
import { SpreadData, AlbumSize } from '../types';

declare global {
    interface Window {
        html2canvas: any;
    }
}

interface SubmissionModalProps {
  projectName: string | null;
  albumSize: AlbumSize;
  spreads: SpreadData[];
  libraryImages: any[]; // Not used in submission anymore, but kept for prop consistency
  onClose: () => void;
  onSaveProject: (projectName: string) => Promise<boolean>;
}

type SubmissionStatus = 'idle' | 'preparing' | 'uploading' | 'success' | 'error';

// Helper function to determine the canvas scale factor for print resolution
const getScaleForSize = (size: AlbumSize): number => {
  switch (size) {
    // Target: 3543px wide
    case '15x15': return 3.2;
    // Target: 4724px wide
    case '20x20': return 4.27;
    // Target: 4961px wide (for 21x15 which is a 42cm spread)
    case '21x15': return 4.48;
    // Target: 5906px wide
    case '25x35': return 5.34;
    // Target: 7087px wide
    case '30x30': return 6.4;
    // Target: 7087px wide
    case '30x20': return 6.4;
    // Fallback for any unknown sizes
    default: return 6.4;
  }
};

const SubmissionModal: React.FC<SubmissionModalProps> = ({ projectName, albumSize, spreads, onClose, onSaveProject }) => {
  const { t } = useI18n();
  const [status, setStatus] = useState<SubmissionStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Form state
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [validationErrors, setValidationErrors] = useState<{ fullName?: string; phone?: string }>({});

  const validateForm = () => {
    const errors: { fullName?: string; phone?: string } = {};
    if (!fullName.trim()) {
      errors.fullName = t('validationFullNameRequired');
    }
    if (!phone.trim()) {
      errors.phone = t('validationPhoneRequired');
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    let finalProjectName = projectName;

    // Auto-save if project is unsaved
    if (!finalProjectName) {
      setStatus('preparing'); // Show a status while saving
      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const autoProjectName = `Album ${day}${month}${year}`;
      
      const saveSuccess = await onSaveProject(autoProjectName);
      if (saveSuccess) {
        finalProjectName = autoProjectName;
      } else {
        setStatus('error');
        setErrorMessage(t('submissionErrorAutoSaveFailed'));
        return;
      }
    }

    setStatus('preparing');
    setErrorMessage('');

    // Add a temporary style to hide UI elements during capture
    const style = document.createElement('style');
    style.innerHTML = `[data-hide-on-capture="true"] { display: none !important; }`;
    document.head.appendChild(style);

    const backendApiUrl = 'https://yourstudiovn.com/api/submit-project.php';

    try {
      const formData = new FormData();
      
      const spreadElements = document.querySelectorAll('[data-spread-capture-target="true"]');
      if (spreadElements.length !== spreads.length) {
          throw new Error("Could not find all spread elements to capture.");
      }
      
      const exportScale = getScaleForSize(albumSize);

      // Generate a rendered image for each spread
      for (let i = 0; i < spreadElements.length; i++) {
        const element = spreadElements[i] as HTMLElement;
        const spreadInfo = spreads[i];
        
        const canvas = await window.html2canvas(element, {
            scale: exportScale, 
            useCORS: true, // Needed for external images like stickers
            backgroundColor: '#ffffff', // Ensure a solid background
        });

        // Export as high-quality JPEG for smaller file size
        const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/jpeg', 1.0));
        
        if (blob) {
            const filename = `spread_${String(spreadInfo.pages[0]).padStart(2, '0')}-${String(spreadInfo.pages[1]).padStart(2, '0')}.jpg`;
            formData.append('spreads[]', blob, filename);
        } else {
            throw new Error(`Failed to generate image for spread ${i + 1}.`);
        }
      }

      // Create a simple project data file with customer details
      const projectData = {
        projectName: finalProjectName || `Untitled Project ${new Date().toISOString()}`,
        albumSize,
        customerDetails: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          address: address.trim(),
        },
        pageCount: spreads.length * 2,
      };

      formData.append('projectData', JSON.stringify(projectData, null, 2));

      setStatus('uploading');
      
      const response = await fetch(backendApiUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
        const responseText = await response.text();
        let serverMessage = '';
        try {
            const responseJson = JSON.parse(responseText);
            serverMessage = responseJson.message || '';
        } catch (e) {
            serverMessage = responseText;
        }
        
        let detailedErrorMessage = `Status: ${response.status}\nServer message: ${serverMessage}`.trim();

        if (serverMessage.includes('Missing projectData or spread image files')) {
            detailedErrorMessage += `\n\nThis error usually means the total upload size of your project is too large for the server's configuration. Please ask your hosting provider to increase the "post_max_size" and "upload_max_filesize" values in your PHP settings.`;
        }
        
        setErrorMessage(detailedErrorMessage);
      }
    } catch (err: any) {
      console.error("Error during submission:", err);
      setStatus('error');
      setErrorMessage(err.message || 'An unknown client-side error occurred.');
    } finally {
      // Clean up the temporary style
      document.head.removeChild(style);
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'idle':
        return (
          <>
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <PaperAirplaneIcon className="w-8 h-8 text-blue-500" />
                <h3 className="text-xl font-semibold text-gray-800">{t('submissionFormTitle')}</h3>
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                {t('submissionOrderDetailsMessage')}
              </p>
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">{t('fullNameLabel')}</label>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${validationErrors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {validationErrors.fullName && <p className="mt-1 text-xs text-red-600">{validationErrors.fullName}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('phoneLabel')}</label>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${validationErrors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {validationErrors.phone && <p className="mt-1 text-xs text-red-600">{validationErrors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('emailLabel')}</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">{t('addressLabel')}</label>
                  <textarea
                    id="address"
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
            <footer className="p-4 bg-gray-50 flex justify-end">
              <button
                onClick={handleSubmit}
                className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-md shadow hover:bg-blue-700 transition-colors"
              >
                {t('submissionButton')}
              </button>
            </footer>
          </>
        );
      case 'preparing':
      case 'uploading':
        return (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg font-semibold text-gray-700">
              {status === 'preparing' ? t('submissionPreparing') : t('submissionUploading')}
            </p>
             <p className="mt-2 text-gray-500 text-sm">
              {t('submissionWaitMessage')}
             </p>
          </div>
        );
      case 'success':
        return (
          <div className="p-8 text-center">
            <div className="w-16 h-16 p-2 mx-auto text-white bg-green-500 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">{t('submissionSuccessTitle')}</h3>
            <p className="mt-2 text-gray-600">{t('submissionSuccessMessage')}</p>

            <button onClick={onClose} className="mt-6 px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300">
              {t('close')}
            </button>
          </div>
        );
      case 'error':
        return (
          <div className="p-6 text-center">
            <div className="w-16 h-16 p-2 mx-auto text-white bg-red-500 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h3 className="mt-4 text-xl font-semibold text-gray-800">{t('submissionErrorTitle')}</h3>
            <div className="mt-2 text-gray-600 whitespace-pre-wrap text-left bg-gray-100 p-3 rounded-md text-sm font-mono overflow-y-auto max-h-48">
              {errorMessage || t('submissionErrorMessage')}
            </div>
            <div className="mt-6 flex justify-center space-x-4">
               <button onClick={onClose} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300">
                {t('close')}
               </button>
               <button onClick={handleSubmit} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
                {t('retry')}
               </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md flex flex-col" onClick={(e) => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">{t('submissionTitle')}</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        {renderContent()}
      </div>
    </div>
  );
};

export default SubmissionModal;
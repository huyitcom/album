

import React, { useState, useEffect } from 'react';
import { XMarkIcon } from './icons';
import { useI18n } from './i18n';

interface ProjectManagerProps {
  currentProjectName: string | null;
  onSave: (projectName: string) => Promise<boolean>;
  onLoad: (projectName:string) => Promise<void>;
  onDelete: (projectName: string) => Promise<void>;
  onNewProject: () => void;
  onClose: () => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ currentProjectName, onSave, onLoad, onDelete, onNewProject, onClose }) => {
  const [newProjectName, setNewProjectName] = useState('');
  const [savedProjects, setSavedProjects] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isOverwriting, setIsOverwriting] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [isConfirmingNewProject, setIsConfirmingNewProject] = useState(false);
  const { t } = useI18n();

  useEffect(() => {
    const projects = Object.keys(localStorage)
      .filter(key => key.startsWith('photobook_project_'))
      .map(key => key.replace('photobook_project_', ''));
    setSavedProjects(projects);
  }, []);

  const handleSaveAs = async () => {
    if (!newProjectName.trim()) return;
    setIsSaving(true);
    const success = await onSave(newProjectName.trim());
    if (success) {
      setSavedProjects(prev => [...new Set([...prev, newProjectName.trim()])].sort());
      setNewProjectName('');
    }
    setIsSaving(false);
  };
  
  const handleOverwrite = async () => {
    if (!currentProjectName) return;
    setIsOverwriting(true);
    await onSave(currentProjectName);
    setIsOverwriting(false);
  };

  const handleDeleteClick = (name: string) => {
    setProjectToDelete(name);
  };

  const handleConfirmDelete = async (name: string) => {
    await onDelete(name);
    setSavedProjects(prev => prev.filter(p => p !== name));
    setProjectToDelete(null);
  };
  
  const handleCancelDelete = () => {
    setProjectToDelete(null);
  };

  const handleNewProjectClick = () => {
    setIsConfirmingNewProject(true);
  };

  const handleConfirmNewProject = () => {
    onNewProject();
    setIsConfirmingNewProject(false);
  };

  const handleCancelNewProject = () => {
    setIsConfirmingNewProject(false);
  };


  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
             <h2 className="text-lg font-semibold">{t('projectManagerTitle')}</h2>
             {isConfirmingNewProject ? (
                <>
                  <p className="text-sm text-red-700 font-semibold">{t('confirmDelete')}</p>
                  <button onClick={handleCancelNewProject} className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">{t('cancel')}</button>
                  <button onClick={handleConfirmNewProject} className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">{t('newProject')}</button>
                </>
             ) : (
                <button
                    onClick={handleNewProjectClick}
                    className="px-4 py-1.5 text-sm bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors shadow-sm"
                >
                    {t('newProject')}
                </button>
             )}
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </header>
        
        <div className="p-6 overflow-y-auto">
          {currentProjectName && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-gray-800 text-sm mb-2">{t('currentProject')}</h3>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg text-blue-900">{currentProjectName}</span>
                    <button 
                        onClick={handleOverwrite} 
                        disabled={isOverwriting || isSaving}
                        className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isOverwriting ? `${t('saving')}...` : t('save')}
                    </button>
                </div>
            </div>
          )}

          {savedProjects.length > 0 ? (
            <ul className="space-y-3">
              {savedProjects.map(name => (
                <li key={name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200">
                  <span className="font-medium text-gray-800">{name}</span>
                  <div className="flex items-center space-x-2">
                    {projectToDelete === name ? (
                        <>
                            <p className="text-sm text-red-700 font-semibold">{t('confirmDelete')}</p>
                            <button onClick={handleCancelDelete} className="px-3 py-1 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">{t('cancel')}</button>
                            <button onClick={() => handleConfirmDelete(name)} className="px-3 py-1 text-sm bg-red-600 text-white rounded-md hover:bg-red-700">{t('delete')}</button>
                        </>
                    ) : (
                        <>
                            <button onClick={() => onLoad(name)} className="px-4 py-1.5 text-sm bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors shadow-sm">{t('load')}</button>
                            <button onClick={() => handleDeleteClick(name)} className="px-4 py-1.5 text-sm bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors shadow-sm">{t('delete')}</button>
                        </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 py-4">{t('noSavedProjects')}</p>
          )}
        </div>

        <footer className="p-4 border-t bg-gray-50">
          <h3 className="font-semibold mb-2">{t('saveAsNewProject')}</h3>
          <div className="flex space-x-2">
            <input 
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder={t('projectNamePlaceholder')}
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSaveAs}
              disabled={!newProjectName.trim() || isSaving || isOverwriting}
              className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md shadow hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSaving ? `${t('saving')}...` : t('save')}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ProjectManager;
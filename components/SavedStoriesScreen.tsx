import React, { useState, useEffect } from 'react';
import { getSavedStories, deleteStory, updateStory } from '../services/storageService';
import type { SavedStory } from '../types';
import Button from './Button';
import { useLanguage } from '../contexts/LanguageContext';

interface SavedStoriesScreenProps {
  onViewStory: (story: SavedStory) => void;
  onBack: () => void;
}

const SavedStoriesScreen: React.FC<SavedStoriesScreenProps> = ({ onViewStory, onBack }) => {
  const [stories, setStories] = useState<SavedStory[]>([]);
  const [editingStory, setEditingStory] = useState<SavedStory | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    setStories(getSavedStories());
  }, []);

  const handleDelete = (storyId: string) => {
    if (confirm(t('confirm_delete'))) {
      deleteStory(storyId);
      setStories(getSavedStories()); // Refresh the list
    }
  };

  const handleEdit = (story: SavedStory) => {
    setEditingStory({ ...story }); // Create a copy to edit
  };

  const handleSaveChanges = () => {
    if (editingStory) {
      updateStory(editingStory);
      setStories(getSavedStories());
      setEditingStory(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingStory(null);
  };

  if (editingStory) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6 md:p-8 animate-fadeIn bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">{t('edit_story_title')}</h1>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-semibold">
              {t('form_label_title')}
            </label>
            <input
              type="text"
              value={editingStory.title}
              onChange={(e) => setEditingStory({ ...editingStory, title: e.target.value })}
              className="block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-semibold">
              {t('form_label_content')}
            </label>
            <textarea
              rows={15}
              value={editingStory.content}
              onChange={(e) => setEditingStory({ ...editingStory, content: e.target.value })}
              className="block w-full bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleSaveChanges}>{t('save_changes')}</Button>
          <Button onClick={handleCancelEdit}>{t('cancel')}</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 animate-fadeIn bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">{t('saved_stories_title')}</h1>
      <div className="space-y-4">
        {stories.length > 0 ? (
          stories.map(story => (
            <div key={story.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center shadow-sm">
              <p className="font-semibold text-lg text-gray-800 dark:text-gray-200 truncate pr-4">{story.title}</p>
              <div className="flex gap-4 flex-shrink-0">
                <button onClick={() => onViewStory(story)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors">{t('view_button')}</button>
                <button onClick={() => handleEdit(story)} className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 font-medium transition-colors">{t('edit_button')}</button>
                <button onClick={() => handleDelete(story.id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors">{t('delete_button')}</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">{t('no_saved_stories')}</p>
        )}
      </div>
      <div className="mt-8 text-center">
        <Button onClick={onBack}>
          {t('back_to_home')}
        </Button>
      </div>
    </div>
  );
};

export default SavedStoriesScreen;
import React from 'react';
import Button from './Button';
import { saveStory } from '../services/storageService';
import { useLanguage } from '../contexts/LanguageContext';

interface StoryDisplayProps {
  story: string;
  onReset: () => void;
  isSaved: boolean;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, onReset, isSaved }) => {
  const { t } = useLanguage();
    
  const formattedStory = story.replace(/\*\*(.*?)\*\*/g, '<strong class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">$1</strong>');

  const handleSave = () => {
    const title = prompt(t('prompt_story_title'));
    if (title && title.trim() !== '') {
      saveStory(title.trim(), story);
      alert(t('alert_story_saved_successfully', { title: title.trim() }));
    } else if (title !== null) {
      alert(t('alert_title_cannot_be_empty'));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 animate-fadeIn">
      <div 
        className="max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap font-roboto space-y-4"
        dangerouslySetInnerHTML={{ __html: formattedStory }}
      />
      <div className="mt-8 text-center flex flex-col sm:flex-row gap-4 justify-center">
        {!isSaved && (
          <Button onClick={handleSave}>
            {t('save_story')}
          </Button>
        )}
        <Button onClick={onReset}>
          {t('write_another_story')}
        </Button>
      </div>
    </div>
  );
};

export default StoryDisplay;
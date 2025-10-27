import React, { useState } from 'react';
import type { StoryInputs } from '../types';
import FormInput from './FormInput';
import Button from './Button';
import { useLanguage } from '../contexts/LanguageContext';

interface HomeScreenProps {
  onGenerate: (inputs: StoryInputs) => void;
  error: string | null;
  onViewSaved: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onGenerate, error, onViewSaved }) => {
  const { t } = useLanguage();
  const [inputs, setInputs] = useState<StoryInputs>({
    genre: '',
    characters: '',
    setting: '',
    plot: '',
    perspective: '',
    tone: '',
    length: '800-1000 words',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(inputs);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 md:p-8 animate-fadeIn bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-8">
        <img src="https://i.ibb.co/chq1VrHH/Black-White-Modern_Letter-AG-Logo-removebg-preview.png" alt="Aetherion Logo" className="w-24 h-24 mx-auto mb-4"/>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
          {t('home_title')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          {t('home_tagline')}
        </p>
        <div className="mt-6">
          <Button onClick={onViewSaved} type="button">
            {t('view_saved_stories')}
          </Button>
        </div>
      </div>

      {error && <p className="text-center text-red-600 dark:text-red-400 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput label={t('genre')} name="genre" value={inputs.genre} onChange={handleInputChange} placeholder={t('placeholder_genre')} />
          <FormInput label={t('main_characters')} name="characters" value={inputs.characters} onChange={handleInputChange} placeholder={t('placeholder_main_characters')} />
          <FormInput label={t('setting')} name="setting" value={inputs.setting} onChange={handleInputChange} placeholder={t('placeholder_setting')} />
          <FormInput label={t('plot_outline')} name="plot" value={inputs.plot} onChange={handleInputChange} placeholder={t('placeholder_plot_outline')} />
          <FormInput label={t('perspective')} name="perspective" value={inputs.perspective} onChange={handleInputChange} placeholder={t('placeholder_perspective')} />
          <FormInput label={t('tone')} name="tone" value={inputs.tone} onChange={handleInputChange} placeholder={t('placeholder_tone')} />
        </div>
        <FormInput label={t('story_length')} name="length" value={inputs.length} onChange={handleInputChange} />
        
        <div className="pt-4">
          <Button type="submit">
            {t('generate_story')}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HomeScreen;
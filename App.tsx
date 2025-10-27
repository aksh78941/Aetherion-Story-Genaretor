import React, { useState, useEffect, useCallback } from 'react';
import IntroScreen from './components/IntroScreen';
import HomeScreen from './components/HomeScreen';
import LoadingScreen from './components/LoadingScreen';
import StoryDisplay from './components/StoryDisplay';
import ThemeToggle from './components/ThemeToggle';
import LanguageToggle from './components/LanguageToggle';
import SavedStoriesScreen from './components/SavedStoriesScreen';
import { generateStory } from './services/geminiService';
import { useLanguage } from './contexts/LanguageContext';
import type { StoryInputs, SavedStory } from './types';

type AppState = 'intro' | 'home' | 'loading' | 'story' | 'savedStories';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>('intro');
  const [theme, setTheme] = useState<Theme>('light');
  const [generatedStory, setGeneratedStory] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isViewingSaved, setIsViewingSaved] = useState<boolean>(false);
  const { language, t } = useLanguage();

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAppState('home');
    }, 3000); // Intro animation duration

    return () => clearTimeout(timer);
  }, []);

  const handleGenerate = useCallback(async (inputs: StoryInputs) => {
    setIsViewingSaved(false);
    setAppState('loading');
    setError(null);
    try {
      const story = await generateStory(inputs, language);
      setGeneratedStory(story);
      setAppState('story');
    } catch (err) {
      console.error(err);
      setError(t('error_generating_story'));
      setAppState('home');
    }
  }, [language, t]);
  
  const handleReset = useCallback(() => {
    setGeneratedStory('');
    setError(null);
    setIsViewingSaved(false);
    setAppState('home');
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const handleViewSaved = useCallback(() => {
    setAppState('savedStories');
  }, []);

  const handleViewStory = useCallback((story: SavedStory) => {
    setGeneratedStory(story.content);
    setIsViewingSaved(true);
    setAppState('story');
  }, []);


  const renderContent = () => {
    switch (appState) {
      case 'intro':
        return <IntroScreen />;
      case 'home':
        // FIX: Removed the unused `isLoading` prop to fix the comparison error. The app uses a separate LoadingScreen.
        return <HomeScreen onGenerate={handleGenerate} error={error} onViewSaved={handleViewSaved} />;
      case 'loading':
        return <LoadingScreen />;
      case 'story':
        return <StoryDisplay story={generatedStory} onReset={handleReset} isSaved={isViewingSaved} />;
      case 'savedStories':
        return <SavedStoriesScreen onViewStory={handleViewStory} onBack={handleReset} />;
      default:
        // FIX: Removed the unused `isLoading` prop to fix the comparison error.
        return <HomeScreen onGenerate={handleGenerate} error={error} onViewSaved={handleViewSaved} />;
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 font-roboto flex flex-col transition-colors duration-300">
      <header className="w-full flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <span className="text-gray-500 dark:text-gray-400 text-sm">
            {t('made_by')}
          </span>
          <LanguageToggle />
        </div>
        {appState !== 'intro' && (
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        )}
      </header>
      <main className="flex-grow w-full flex items-center justify-center p-4">
        {renderContent()}
      </main>
      <footer className="w-full text-center text-gray-500 dark:text-gray-400 text-sm p-4 border-t border-gray-200 dark:border-gray-700">
        {t('made_by')}
      </footer>
    </div>
  );
};

export default App;
import type { SavedStory } from '../types';

const STORAGE_KEY = 'aetherion_saved_stories';

export const getSavedStories = (): SavedStory[] => {
  try {
    const storiesJson = localStorage.getItem(STORAGE_KEY);
    return storiesJson ? JSON.parse(storiesJson) : [];
  } catch (error) {
    console.error("Failed to retrieve stories from localStorage", error);
    return [];
  }
};

export const saveStory = (title: string, content: string): void => {
  try {
    const stories = getSavedStories();
    const newStory: SavedStory = {
      id: Date.now().toString(),
      title,
      content,
    };
    const updatedStories = [newStory, ...stories];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStories));
  } catch (error) {
    console.error("Failed to save story to localStorage", error);
    alert("There was an error saving your story.");
  }
};

export const updateStory = (updatedStory: SavedStory): void => {
  try {
    const stories = getSavedStories();
    const updatedStories = stories.map(story =>
      story.id === updatedStory.id ? updatedStory : story
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStories));
  } catch (error) {
    console.error("Failed to update story in localStorage", error);
    alert("There was an error updating the story.");
  }
};

export const deleteStory = (storyId: string): void => {
  try {
    const stories = getSavedStories();
    const updatedStories = stories.filter(story => story.id !== storyId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStories));
  } catch (error) {
    console.error("Failed to delete story from localStorage", error);
    alert("There was an error deleting the story.");
  }
};
// FIX: Import React to make its types available for JSX element declarations.
import React from 'react';

// FIX: Add a global TypeScript declaration for the 'dotlottie-wc' custom element. This resolves errors where the JSX parser doesn't recognize the web component.
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'dotlottie-wc': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        autoplay?: boolean;
        loop?: boolean;
        style?: React.CSSProperties;
      }, HTMLElement>;
    }
  }
}

export interface StoryInputs {
  genre: string;
  characters: string;
  setting: string;
  plot: string;
  perspective: string;
  tone: string;
  length: string;
}

export interface SavedStory {
  id: string;
  title: string;
  content: string;
}
import { createContext, useContext } from 'react';

// t: copy for the current language. openFilm(index) opens the viewer.
// overlayOpen is true while the viewer is open, so background previews can pause.
// pickService(key) preselects a project type in the contact form.
export const UIContext = createContext({
  t: null, lang: 'en', overlayOpen: false,
  openFilm: () => {}, pickService: () => {}
});
export const useUI = () => useContext(UIContext);

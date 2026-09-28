import { createContext, useContext } from 'react';

// openFilm(index) opens the film viewer; openForm() opens the inquiry dialog.
// overlayOpen is true while either is open, so background previews can pause.
export const UIContext = createContext({ overlayOpen: false, openFilm: () => {}, openForm: () => {} });
export const useUI = () => useContext(UIContext);

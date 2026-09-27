import { createContext, useContext } from 'react';

// openFilm(index) opens the film viewer; openForm() opens the inquiry dialog.
export const UIContext = createContext({ openFilm: () => {}, openForm: () => {} });
export const useUI = () => useContext(UIContext);

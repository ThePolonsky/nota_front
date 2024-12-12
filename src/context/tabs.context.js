import { createContext } from 'react';

export const TabsContext = createContext({
    tabs: [],
    selectedTabIndex: null
});
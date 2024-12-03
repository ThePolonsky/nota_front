import { createContext } from 'react';

export const PopoverContext = createContext({
    popoverType: 'none',
    popoverContent: null,
    popoverData: {},
    popoverPosition: null
});
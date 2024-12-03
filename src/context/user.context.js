import { createContext, useState } from 'react';

export const UserContext = createContext({
    userId: null,
    userName: null
});


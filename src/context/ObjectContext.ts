import { createContext, useContext, useState } from 'react';

interface ContextState {
  name: string;
  age: number;
  address: string;
}

export const ObjectContext = createContext<object | undefined>(undefined);

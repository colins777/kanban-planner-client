//useContext docs
//https://refine.dev/blog/usecontext-and-react-context/#what-is-react-context-api

import React, {createContext, useContext} from 'react';

export const GlobalStateContext = createContext(null);

export default GlobalStateContext


import { createContext } from "react";

export const MovieContext = createContext();

const MovieContextProvider = ({ children }) => {
  return <MovieContext.Provider value={null}>{children}</MovieContext.Provider>;
};
export default MovieContextProvider;

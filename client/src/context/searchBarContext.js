import React, { useState, createContext } from "react";

const SearchBarContext = createContext({
  searchBar: "",
  setSearchBar: () => {},
});

function SearchBarProvider(props) {
  const [searchBar, setSearchBar] = useState("");

  return (
    <SearchBarContext.Provider value={{ searchBar, setSearchBar }} {...props} />
  );
}

export { SearchBarContext, SearchBarProvider };

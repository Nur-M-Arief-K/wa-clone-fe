import { useState } from "react";
// Components
import { Header } from "./header";
import { Notifications } from "./notifications";
import { Search, SearchResults } from "./search";
import { Conversations } from "./conversations";

const Sidebar = () => {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <div className="flex0030 max-w-[40%] h-full select-none">
      <Header />
      <Notifications />
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      />
      {searchResults.length > 0 ? (
        <>
          <SearchResults
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </>
      ) : (
        <Conversations />
      )}
    </div>
  );
};

export default Sidebar;

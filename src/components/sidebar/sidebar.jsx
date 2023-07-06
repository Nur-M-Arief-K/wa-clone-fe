import React from "react";
import { SidebarHeader } from "./sidebar-header";
import { Notifications } from "./notifications";
import { Search, SearchResults } from "./search";
import { Conversations } from "./conversations";

const Sidebar = () => {
  const [searchResults, setSearchResults] = React.useState([]);

  return (
    <div className="w-[40%] h-full select-none">
      <SidebarHeader />
      <Notifications />
      <Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      />
      {searchResults.length > 0 ? (
        <>
          <SearchResults searchResults={searchResults} />
        </>
      ) : (
        <Conversations />
      )}
    </div>
  );
};

export default Sidebar;

import React from "react";
import Contact from "./contact";

const SearchResults = ({ searchResults }) => {
  return (
    <div className="w-full conversations scrollbar">
      <div>
        {/* Heading */}
        <div className="px-8 pt-8 flex flex-col">
          <h1 className="font-extralight text-md text-green_2">Contacts</h1>
          <span className="w-full mt-4 ml-10 border-b dark:border-b-dark_border_1"></span>
        </div>
        {/* Results */}
        <ul>
          {searchResults &&
            searchResults.map((user) => {
              return <Contact contact={user} key={user._id} />;
            })}
        </ul>
      </div>
    </div>
  );
};

export default SearchResults;

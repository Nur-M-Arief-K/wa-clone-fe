import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FilterIcon, ReturnIcon, SearchIcon } from "../../../svg";

const { REACT_APP_API_ENDPOINT } = process.env;

const Search = ({ searchLength, setSearchResults }) => {
  const {
    user: { token },
  } = useSelector((state) => state.user);
  const [show, setShow] = React.useState(false);

  const handleSearch = async (e) => {
    if (e.target.value && e.key === "Enter") {
      try {
        const { data } = await axios.get(
          `${REACT_APP_API_ENDPOINT}/user?search=${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSearchResults(data);
      } catch (error) {
        setSearchResults([]);
      }
    }
  };

  return (
    <div className="h-[40px] py-1.5">
      <div className="px-[10px]">
        <div className="gap-x-2 flex items-center">
          <div className="w-full pl-2 rounded-lg flex dark:bg-dark_bg_2">
            {show || searchLength > 0 ? (
              <span className="w-8 flex items-center justify-center rotateAnimation">
                <ReturnIcon className="w-5 fill-green_1" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center">
                <SearchIcon className="w-5 dark:fill-dark_svg_2" />
              </span>
            )}
            <input
              type="text"
              placeholder="Search or start a new chat"
              className="input"
              onFocus={() => setShow(true)}
              onBlur={() => searchLength === 0 && setShow(false)}
              onKeyDown={handleSearch}
            />
          </div>
          <button className="btn">
            <FilterIcon className="dark:fill-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;

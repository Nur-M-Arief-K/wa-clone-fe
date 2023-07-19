import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createGroupConversation } from "../../../../features/chat-slice";
import { Input } from "./input";
import { MultipleSelect } from "./multiple-select";
import ClipLoader from "react-spinners/ClipLoader";
import { ReturnIcon, ValidIcon } from "../../../../svg";

const { REACT_APP_API_ENDPOINT } = process.env;

const CreateGroup = ({ setShowCreateGroup }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = user;
  const { status } = useSelector((state) => state.chat);
  const [groupName, setGroupName] = useState("");
  const [searchUsersForGroupResult, setSearchUsersForGroupResult] =
    useState([]);
  const [selectedUsersForGroup, setSelectedUsersForGroup] = useState([]);

  const searchUsersForGroupHandler = async (e) => {
    // Run when e.target.value !== "" + enter AND e.target.value == "" + enter
    if (e.target.value && e.key === "Enter") {
      setSearchUsersForGroupResult([]);
      try {
        const { data } = await axios.get(
          `${REACT_APP_API_ENDPOINT}/user?search=${e.target.value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (data.length > 0) {
          let tempArray = [];
          data.forEach((user) => {
            // for fit the data for react-select
            let temp = {
              value: user._id,
              label: user.name,
              picture: user.picture,
            };
            tempArray.push(temp);
          });
          setSearchUsersForGroupResult(tempArray);
        } else {
          setSearchUsersForGroupResult([]);
        }
      } catch (error) {
        setSearchUsersForGroupResult([]);
      }
    } else if (e.target.value === "" && e.key === "Enter") {
      setSearchUsersForGroupResult([]);
    }
  };

  const showCreateGroupHandler = (e) => setShowCreateGroup(false);

  const createGroupHandler = async (e) => {
    if (status !== "loading") {
      let users = [];
      selectedUsersForGroup.forEach((user) => {
        users.push(user.value);
      });
      const values = {
        name: groupName,
        users,
        token: user.token,
      };
      const newConversation = await dispatch(createGroupConversation(values));
      setShowCreateGroup(false);
    }
  };

  return (
    <div className="h-full createGroupAnimation relative flex0030 z-40">
      <div className="mt-5">
        {/* Display return button */}
        <button className="btn w-6 h-6 border" onClick={showCreateGroupHandler}>
          <ReturnIcon className="fill-white" />
        </button>
        {/* Display input group name bar */}
        <Input
          groupName={groupName}
          setGroupName={setGroupName}
        />
        {/* Display search bar and multiple select */}
        <MultipleSelect
          selectedUsersForGroup={selectedUsersForGroup}
          setSelectedUsersForGroup={setSelectedUsersForGroup}
          searchUsersForGroupResult={searchUsersForGroupResult}
          searchUsersForGroupHandler={searchUsersForGroupHandler}
        />
        {/* Display create btn group */}
        <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2">
          <button
            className="btn bg-green_1 scale-150 hover:bg-green-500"
            onClick={createGroupHandler}
          >
            {status === "loading" ? (
              <ClipLoader color="#E9EDEF" size={25} />
            ) : (
              <ValidIcon className="fill-white mt-2 h-full" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;

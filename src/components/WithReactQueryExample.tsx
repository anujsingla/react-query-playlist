import axios from "axios";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useQuery } from "react-query";
import { IGithubUserDetails } from "../models/apiModel";

const fetchGithubUserDetails = async (
  username: string
): Promise<IGithubUserDetails> => {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

export function WithReactQueryExample() {
  const [username, setUsername] = useState("");

  const {
    isLoading,
    error,
    data: userData,
  } = useQuery(
    ["githubuserdetails", username],
    () => fetchGithubUserDetails(username),
    {
      enabled: username ? true : false,
      staleTime: 1000 * 60,
    }
  );

  return (
    <div>
      <div> With react query data fetch from github</div>
      {isLoading && "Loading data"}
      {!isEmpty(error) && "Error in fetching data"}
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <div>{userData && <div>{userData.name}</div>}</div>
    </div>
  );
}

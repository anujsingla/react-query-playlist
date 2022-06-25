import axios from "axios";
import { isEmpty } from "lodash";
import { useState } from "react";
import { useQuery } from "react-query";
import { IGithubUserDetails } from "../models/apiModel";

// const fetchGithubUserDetails = async (
//   username: string
// ): Promise<IGithubUserDetails> => {
//   const response = await axios.get(`https://api.github.com/users/${username}`);
//   return response.data;
// };

const fetchGithubUserDetailsWithQueryKey = async ({
  queryKey,
}: any): Promise<IGithubUserDetails> => {
  // console.log("queryKey", queryKey);
  const [, username] = queryKey;
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

export function WithReactQueryKeyExample() {
  const [username, setUsername] = useState("");

  const {
    isLoading,
    error,
    data: userData,
  } = useQuery(
    ["githubuserdetails", username, "key1", "key2"],
    fetchGithubUserDetailsWithQueryKey,
    {
      enabled: username ? true : false,
    }
  );

  return (
    <div>
      <div> With react query data fetch from github and use of queryKey</div>
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

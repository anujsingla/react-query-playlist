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

const fetchGithubUserDetailsWithQueryKey = async ({
  queryKey,
}: any): Promise<IGithubUserDetails> => {
  // console.log("queryKey", queryKey);
  const [, username] = queryKey;
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return response.data;
};

const fetchMockTodos = async (): Promise<any> => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/todos`
  );
  return response.data;
};

export function ParallelQueries() {
  const [username, setUsername] = useState("");

  const {
    isLoading,
    error,
    data: userData,
  } = useQuery(
    ["githubuserdetails", username],
    fetchGithubUserDetailsWithQueryKey,
    {
      enabled: username ? true : false,
    }
  );

  const result = useQuery(
    ["githubuserdetails-secondquery", username],
    () => fetchGithubUserDetails(username),
    {
      enabled: username ? true : false,
    }
  );

  const mockResult = useQuery(["mocktododata"], () => fetchMockTodos(), {
    // refetchInterval: 7000,
    refetchOnWindowFocus: false,
  });

  console.log("result", result);
  console.log("mockResult", mockResult);

  return (
    <div>
      <div> Parallel Queries</div>
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

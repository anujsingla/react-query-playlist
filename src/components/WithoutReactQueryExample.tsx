import axios from "axios";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { IGithubUserDetails } from "../models/apiModel";

const fetchGithubUserDetails = async (username: string) => {
  return await axios.get(`https://api.github.com/users/${username}`);
};

export function WithoutReactQueryExample() {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState<IGithubUserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserDetails = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetchGithubUserDetails(username);
      setUserData(response.data);
    } catch (err) {
      setError(err as Error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isEmpty(username)) {
      return;
    }
    fetchUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div>
      <div>Without react query data fetch from github</div>
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

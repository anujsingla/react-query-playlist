/*
Strict mode in Javascript
https://www.linkedin.com/feed/update/urn:li:activity:6937064685842112512?utm_source=linkedin_share&utm_medium=member_desktop_web
*/

/*
React query Course
https://react-query.tanstack.com/overview

1st Video - 
What is React query and why we use it?
React query helps to fetch the data from the server. It makes fetching,
caching, synchronizing and updating server state in the application.
It works well out of the box, with zero configuration and can be customized
as per requirement.
Server state can update by multiple authorized client and it makes client
state out of date so we need to always sync with server. We should treat it
with care.
To make the client and server state in sync, we fetch the data after some
interval like after every 2 minutes we fetch the data. 

Client and server state:

Client state store in the browser. We can store it using useState or useReducer
or third party library like redux or mobx or many more.
It is not stored permantly and goes away after browser close.
It is synchronous and instantly available.
It is maintain by client and only single client can modify it.

Server state:
It persistented in the server and we can fetch the data with API call.
It stores like user profile, comments, post, many more.
We can store anything which need to be persisted between browsers.
Multiple client can fetch the data from the server.
It store remotely and authorzied client can change it.
It is asynchronous and takes a bit of time to come to the client from sever.
Authorized client can change the state by API call.


Advantages:
Remove complicated code from the app like isfetching, isloading, iserror state
or many more
Easy to maintain the server side state.
Increase performance by caching the data.

Lets take an example.
Difference between Normal API call and with react query api call

What is the difference between client and server data?
Client data can be access by single user and server data is available to
many authorized user.
Client data is synchronous and server data is asynchronous.
Client data can be changed by single user and server data can be changed
by many users.


2nd Video -
Query keys and query functions:

Query keys to identify the query. React query uses key to maintain the
cache. It map data with query in the cache. If we try to make multiple request of the same query then
react query provide data from the cache. It avoids duplicate requests.
It is most powerful feature of the library.
It accept query keys in the array same like useEffect dependency array.
If any value change from the array, it refetch the data from the backend.
As per below example, it refetch the data if username value change in the key
array.
useQuery(['userdetails', username], fetchUserDetails);


const cacheQuery = {};
if (cacheQuery['key']) {
  cacheQuery['key'] = data;
  return data;
}
return cacheQuery['key'];


useQuery(["metadata"], fetchMetadata);

If you know, some query data will not change then we can provide simple
string in the key and it will not refetch this data frequently.

How to stop removing duplicate key?
useQuery([userProfileId], fetchUserProfile);
useQuery([blogId], fetchBlog);

We should not use key like this because it may cause problem and provide
wrong data because userProfileId, blogId can be same. 
We should always add string in the starting to avoid duplicate key.

useQuery(['userprofile', userProfileId], fetchUserProfile);
useQuery(['blog', blogId], fetchBlog);

const result = useQuery(
    ["githubuserdetails", username],
    () => fetchUserDetails(username)
  );

Query function to make the API call and fetch the data from the backend.
We can use third party libraries to make API call like Axios, graphql-request,
fetch call or many more. We can pass parameters to the function.

How can we pass params to the function:

Arrow function:
const result = useQuery(
    ["githubuserdetails", username],
    () => fetchUserDetails(username)
  );

Query key values:

const fetchUserDetailsWithQueryKey = async ({ queryKey }: any) => {
  const [, username] = queryKey;
  const resonse = await axios.get(`https://api.github.com/users/${username}`, {
    headers: {
      Authorization: `token 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`,
    },
  });
  return resonse.data;
};

const result = useQuery<IUserDetails>(
    ["githubuserdetailsWithQueryKey", username],
    fetchUserDetailsWithQueryKey
  );

It is useful when we need to pass multiple parameters in the function.
Whatever we will pass in the query array it will pass in the function api
call.


3rd Video:
Parallel and dependent queries:
Parallel query means make multiple call at a same time.
Sometime we need to make multiple call at the same time like fetch metadata
or comments, user information at the same time.
We can do it easily.
There are different way to do it:
- Make api call with multiple useQuery same like we make single useQuery call

const result1 = useQuery<IUserDetails>(
    ["key1"], fetchUserDetailsWithQueryKey
  );
const result2 = useQuery<IUserDetails>(
    ["key2"], fetchUserDetailsWithQueryKey
  );

- Combine multiple API call into a single query with Promise.all helper.

function getData() {
  return Promise.all([
    fetch(`url1`)
      .then((res) => res.json()),
    fetch(`url2`)
      .then((res) => res.json())
  ]);
}

const result = useQuery(
    ["key1"], () => getData());

const [data1, data2] = result.data;

- useQueries hook to make API call. It accept an array of query options
 and returns an array of query results.

https://react-query.tanstack.com/reference/useQueries


Dependent Queries:
Dependent query means one query is dependent on another query result.
Example: blog comment is dependent on blog details.
We will first fetch blog details and then fetch blog comments. one query
is dependent on another query.
We can control this with the help of "enabled" configuration.
React query accept multiple configuration and it will help us to control
the query.
https://react-query.tanstack.com/reference/useQuery

Reference:
https://react-query.tanstack.com/overview
https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api

*/

export {};

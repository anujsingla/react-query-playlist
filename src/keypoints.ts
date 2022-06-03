/*
React query Course
https://react-query.tanstack.com/overview

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
It is not stored permantly and goes away after browser close / refresh.
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

Query keys and query functions:

Query keys to identify the query. React query uses key to maintain the
cache. It map data with query in the cache. If we try to make multiple request of the same query then
react query provide data from the cache. It avoids duplicate requests.
It is most powerful feature of the library.
It accept query keys in the array same like useEffect dependency array.
If any value change from the array, it refetch the data from the backend.
As per below example, it refetch the data if username value change in the key
array.

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

How you can use react-query in your app and use it at multiple places. 


Reference:
https://react-query.tanstack.com/overview
https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api

*/

export {};

import React from "react";
import "./App.css";
import { WithoutReactQueryExample } from "./components/WithoutReactQueryExample";
import { QueryClient, QueryClientProvider } from "react-query";
import { WithReactQueryExample } from "./components/WithReactQueryExample";
import { WithReactQueryKeyExample } from "./components/WithReactQueryKeyExample";
import { ParallelQueries } from "./components/ParallelQueries";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <WithoutReactQueryExample />
        <WithReactQueryExample />
        <WithReactQueryKeyExample />
        <ParallelQueries />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

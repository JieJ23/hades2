import React, { createContext, useContext, useState, useEffect } from "react";
// Create a context to hold the fetched data
const DataContextSrc = createContext();
// Create a custom hook to consume the context
export const useSrcData = () => useContext(DataContextSrc);

// Create a provider component to wrap your application and provide the data
export const DataProviderSrc = ({ children }) => {
  const [postSrc, setPostSrc] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const cached = localStorage.getItem("speedrunUW");
        const cacheTimestamp = localStorage.getItem("speedrun_timestampUW");
        const oneDayInMs = 2 * 30 * 60 * 1000; // 30 minutes in milliseconds > 1 hours

        if (cached && cacheTimestamp) {
          const age = Date.now() - parseInt(cacheTimestamp);
          if (age < oneDayInMs) {
            setPostSrc(JSON.parse(cached));
            setLoader(false);
            return; // Use cached data
          }
        }
        const response = await fetch(
          `https://www.speedrun.com/api/v1/leaderboards/3dxy5vv6/category/wk6yjved?var-789vdvqn=qznpgg8q&var-68k17yzl=qyz4vnd1&embed=players`,
        );
        const posts = await response.json();
        setPostSrc(posts);
        // Save with timestamp
        localStorage.setItem("speedrunUW", JSON.stringify(posts));
        localStorage.setItem("speedrun_timestampUW", Date.now().toString());

        setLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false);
      }
    }

    load();
  }, []);
  return <DataContextSrc.Provider value={{ postSrc, loader }}>{children}</DataContextSrc.Provider>;
};

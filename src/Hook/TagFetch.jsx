import React, { createContext, useContext, useState, useEffect } from "react";
// Create a context to hold the fetched data
const TagContext = createContext();
// Create a custom hook to consume the context
export const useTag = () => useContext(TagContext);

// Create a provider component to wrap your application and provide the data
export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [tagloader, setTagLoader] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const cached = localStorage.getItem("tag");
        const cacheTimestamp = localStorage.getItem("tag_timestamp");
        const oneDayInMs = 60 * 60 * 1000; // 60 minutes in milliseconds

        if (cached && cacheTimestamp) {
          const age = Date.now() - parseInt(cacheTimestamp);
          if (age < oneDayInMs) {
            setTags(JSON.parse(cached));
            setTagLoader(false);
            return; // Use cached data
          }
        }
        const response = await fetch(
          `https://script.google.com/macros/s/AKfycbwJMrvwACOuvd2_CP1GkTTifX24ewMkBuhDhs-h_n1FAHmW1i9CJ-GXMl_qv_KAihU8/exec`,
        );
        const posts = await response.json();
        setTags(posts);
        // Save with timestamp
        localStorage.setItem("tag", JSON.stringify(posts));
        localStorage.setItem("tag_timestamp", Date.now().toString());

        setTagLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setTagLoader(false);
      }
    }

    load();
  }, []);

  return <TagContext.Provider value={{ tags, tagloader }}>{children}</TagContext.Provider>;
};

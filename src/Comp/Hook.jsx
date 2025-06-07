import { createContext, useContext, useState, useEffect } from "react";
import { constantDate } from "../Data/Misc";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          `https://script.google.com/macros/s/AKfycbzQAB6A-8xRavK-m8NtVhwfTYviABk-VtdZYA5HaBxbcU9pO489PeFW_3Hp__paIyEV/exec`
        );

        const puredata = await response.json();
        const posts = puredata.map((element) => ({
          ...element,
          d: constantDate(element.d),
        }));

        setPosts(posts);
        setLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false);
      }
    }

    load();
  }, []);

  return <DataContext.Provider value={{ posts, loader }}>{children}</DataContext.Provider>;
};

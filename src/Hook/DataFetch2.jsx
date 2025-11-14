import { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const useData2 = () => useContext(DataContext);

export const DataProvider2 = ({ children }) => {
  const [posts2, setPosts] = useState([]);
  const [loader2, setLoader] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(
          `https://script.google.com/macros/s/AKfycbzedKfMhWQu9CpJw6Z4b9PM5xiLg7C2bC2reyA4CUeqe3QKk6ZE3rayQe9NDJN-K3nz/exec`
        );
        const posts = await response.json();
        setPosts(posts);

        setLoader(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoader(false);
      }
    }

    load();
  }, []);

  return <DataContext.Provider value={{ posts2, loader2 }}>{children}</DataContext.Provider>;
};

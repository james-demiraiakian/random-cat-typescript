import React, { useEffect, useState } from 'react';
import { fetchCat } from '../services/fetchCat';
import './Display.css';
import data from '../names/MOCK_DATA.json';
import CatCard from './CatCard';

export default function Display() {
  const [loading, setLoading] = useState(true);
  // nameIndex is used to generate a random name for each cat from a json file. Name file generated randomly from https://www.mockaroo.com/
  const [nameIndex, setNameIndex] = useState(0);
  // State for props to be sent to CatCard component, used to make the sending of props look cleaner
  const [catProps, setCatProps] = useState({
    url: '',
    name: '',
  });
  // Default url value given to avoid not having a cat image on page load.
  const [cat, setCat] = useState<{
    id: string;
    url: string;
    height: number;
    width: number;
  }>({
    id: '',
    url: 'https://cdn2.thecatapi.com/images/e04.jpg',
    height: 0,
    width: 0,
  });

  useEffect((): void => {
    // used to prevent useEffect from running more than once after state update
    if (!loading) return;

    // Random name generation for each cat
    const catNameIndex: number = Math.floor(Math.random() * 1000);

    // Standard fetch function
    const fetchData = async (): Promise<void> => {
      const resp = await fetchCat();
      setCat(resp);

      // Timeout used to add a delay on loading state. Easier on the eyes, in my opinion
      setTimeout(() => {
        setLoading(false);
      }, 500);
    };

    // Call the fetch function, set the randomly generated name, then set props to be passed to CatCard component
    fetchData();
    setNameIndex(catNameIndex);
    setCatProps({ url: cat.url, name: data[nameIndex].name });

    // I hate having to use these lint disabling comments, but my linter was upset about not having "cat.url" and "data[nameIndex].name" in the dependency array, but adding them into the array would cause a race condition. The app still works in that case, but it's bad practice to let that happen, regardless of UX
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  // To cause component rerender, rather than building out complex logic to fetch the next cat on button click, I simply toggle the loading state, and have the useEffect above run on loading state toggle.
  const handleClick = () => {
    setLoading(true);
  };

  if (loading) return <h1 className="loading">LOADING</h1>;

  return (
    <div className="cat-div">
      <CatCard {...catProps} />
      <button onClick={handleClick}>Next</button>
    </div>
  );
}

import { useEffect, useState } from 'react';
import Link from 'next/link';

import Styles from './SearchBar.module.css';

export default function SearchBar(props) {
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  //should render after every key stroke
  async function onSearchChange(e) {
    setSearchVal(e.currentTarget.value);
  }

  useEffect(() => {
    console.log(searchVal);
    if (searchVal.length < 3) return;
    fetch('/api/user/users?searchVal=' + searchVal)
      .then((resp) => resp.json())
      .then((data) => setSearchResults(data.results));
  }, [searchVal]);

  return (
    <div className={Styles['search-bar-parent']}>
      <input type="search" onChange={onSearchChange} value={searchVal} />
      <div>
        {searchResults.map((result) => {
          return (
            <Link href={`/dashboard/${result.id}`} key={result.id}>
              {result.firstName + ' ' + result.lastName}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

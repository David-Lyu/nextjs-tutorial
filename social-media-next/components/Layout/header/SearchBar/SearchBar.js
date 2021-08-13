import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Styles from './SearchBar.module.css';

export default function SearchBar(props) {
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

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
      <input
        className={Styles['search-input']}
        type="search"
        onChange={onSearchChange}
        value={searchVal}
        onBlur={() => {
          setSearchVal('');
        }}
      />
      <div className={Styles['search-results']}>
        <ul>
          {searchResults.map((result) => {
            return (
              <li
                key={result.id}
                onClick={() =>
                  onClickSearched(router, result.id, setSearchResults)
                }>
                {helpSetName(result)}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

//`/dashboard/${result.id}`
function helpSetName(result) {
  if (result.firstName && result.lastName) {
    return result.firstName + ' ' + result.lastName;
  }

  if (result.firstName && !result.lastName) {
    return result.firstName;
  }

  if (result.username) {
    return result.username;
  }

  if (result.email) {
    return result.email;
  }
}

function onClickSearched(router, id, setSearchResults) {
  router.push(`/dashboard/${id}`);
  setSearchResults([]);
}

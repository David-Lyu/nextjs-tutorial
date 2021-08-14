import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Styles from './SearchBar.module.css';

export default function SearchBar(props) {
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const router = useRouter();

  async function onSearchChange(e) {
    setSearchVal(e.currentTarget.value);
  }

  useEffect(() => {
    if (searchVal.length > 0) setIsSearchClicked(true);
    if (!searchVal) setIsSearchClicked(false);
    if (searchVal.length < 3) return;
    //should only be sending 5 if anymore might make a page to redirect the search
    fetch('/api/user/users?searchVal=' + searchVal)
      .then((resp) => resp.json())
      .then((data) => {
        setSearchResults(data.results);
      });
  }, [searchVal]);

  return (
    <>
      <div className={Styles['search-bar-parent']}>
        <input
          className={Styles['search-input']}
          type="search"
          onChange={onSearchChange}
          value={searchVal}
        />
        <div className={Styles['search-results']}>
          <ul className={Styles['search-ul']}>
            {searchResults.map((result) => {
              return (
                <li
                  key={result.id}
                  onClick={(e) => {
                    onClickSearched(router, result.id, setSearchResults);
                    setIsSearchClicked(false);
                    setSearchVal('');
                  }}>
                  {helpSetName(result)}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {isSearchClicked && (
        <div
          className={Styles.overlay}
          onClick={() => {
            setSearchResults([]);
            setSearchVal('');
            setIsSearchClicked(false);
          }}
        />
      )}
    </>
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
  setSearchResults([]);
  router.push(`/dashboard/${id}`);
}

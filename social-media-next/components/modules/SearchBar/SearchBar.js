import { useState } from 'react';

export default function SearchBar(props) {
  const [searchVal, setSearchVal] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  //should render after every key stroke
  function onSearchChange(e) {
    setSearchVal(e.currentTarget.value);
    if (e.currentTarget.value.length < 3) return;
    console.log(searchVal);
  }
  return (
    <div>
      <input type="search" onChange={onSearchChange} value={searchVal} />
      <div>
        {searchResults.map((result) => {
          return <p key="search.user.id">{search}</p>;
        })}
      </div>
    </div>
  );
}

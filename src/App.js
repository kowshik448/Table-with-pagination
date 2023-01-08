import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import TableComponent from './components/TeamList';
import {appConstants} from "../src/constants"

function App() {
  const [query,setQuery] = useState('');
  const [teamData , setTeamData] = useState([]);
  const [filteredData , setFilteredData] = useState([]);
  const [page, setPage] = useState(1);

  // filtereing the data on user query
  const search = (data)=>{
    return data.filter((item)=>{
      return appConstants.HEADER_KEYS.some((key)=> item[key].toLowerCase().includes(query))
    })
  }

  useEffect(()=>{
    const data = search(teamData);
    setFilteredData(data);
  },[query])

  //fetching teamList by making an API call
  const fetchData = async ()=>{
    const response = await axios.get('https://www.balldontlie.io/api/v1/teams')
    setTeamData(response.data.data);
    setFilteredData(response.data.data);
  }

  // pagination change
  const selectPageHandler = (selectedPage) => {
    if (selectedPage >= 1 && selectedPage <= Math.ceil(teamData.length / 6) && selectedPage !== page) {
      setPage(selectedPage)
    }
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className="App">
      <TableComponent 
      setQuery={setQuery} 
      selectPageHandler={selectPageHandler}
      page={page}
      query={query}
      filteredData={filteredData}
      setFilteredData={setFilteredData}/>
    </div>
  );
}

export default App;

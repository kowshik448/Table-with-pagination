import axios from "axios";
import React, { useState } from "react";
import {Table , Container, Row , Col} from 'react-bootstrap';
import './TeamList.css';
import TeamStatsView from "./TeamStats";
import {appConstants} from "../../src/constants"

function TableComponent({
    setQuery,
    selectPageHandler,
    page,
    query,
    filteredData,
    setFilteredData}) {
    const [showSidePanel , setShowSidePanel] = useState({
        open : false,
        gameData : {},
        teamId:''
    })
    const [previousId , setPreviousId] = useState('');
    const [order , setOrder] = useState('ASC');

    const arrowDropDown = <span className="material-symbols-outlined pos">arrow_drop_down</span>;
    const arrowDropUp = <span className="material-symbols-outlined pos">arrow_drop_up</span> ;

    // making API call ,when clicks on any table row to show game data
    const handleTeamClick = async(id)=>{
        if (previousId !=id){
        const res = await axios.get(`https://www.balldontlie.io/api/v1/games?seasons[]=2021&team_ids[]=${id}`)
        const filtergameData = res.data.data.filter((item)=>{
            return id === item[appConstants.HOME_TEAM].id
        })
        setPreviousId(id);
        setShowSidePanel({open:true,gameData:filtergameData,teamId:id})
    }}

    // sorting the table based on certain coloumns
    const sorting = (col)=>{
        if (order === "ASC"){
            const sortData = [...filteredData].sort((a,b)=>
            a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setFilteredData(sortData);
            setOrder('DSC');
        }
        if (order === "DSC"){
            const sortData = [...filteredData].sort((a,b)=>
            a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            setFilteredData(sortData);
            setOrder('ASC');           
        }
    }


    return (
        <div  className={`${showSidePanel.open ? 'inactive' : ''}`}>
        <Container className={`main_container ${showSidePanel.open ? 'inactive' : ''}`}>
            <Row >
                <Col>
                    <h2 className="header">NBA TEAMS</h2>
                </Col>
            </Row>
            <Row>
                <Col className="searchbar_block">
                    <span 
                        className={`material-symbols-outlined ${query ? 'icon_disable' : 'icon'}`}>search
                    </span>
                    <input 
                        
                        type='text' 
                        className={`searchbar ${showSidePanel.open ? 'inactive' : ''}`} 
                        onChange={(e)=> setQuery(e.target.value)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table responsive  >
                        <thead className="tableHeader">
                            <tr>
                                <th className="head-title"  onClick={()=>sorting('name')}>
                                    {appConstants.TEAM_NAME}{ order==='ASC' ? arrowDropDown : arrowDropUp}
                                </th>
                                <th className="head-title"  onClick={()=>sorting('city')}>
                                    {appConstants.CITY}{ order==='ASC' ? arrowDropDown : arrowDropUp}
                                </th>
                                <th>{appConstants.ABBREVIATION}</th>
                                <th>{appConstants.CONFERENCE}</th>
                                <th>{appConstants.DIVISION}</th>
                                {/* {
                                appConstants.TABLE_HEADERS.map((item,index)=>
                                <th 
                                    onClick={()=>sorting(sortKeys[item])} 
                                    key={index}>{item}</th>
                                )} */}
                            </tr> 
                        </thead>
                        <tbody>
                            {
                            filteredData.slice(page * 6 - 6, page * 6).map((item)=>(
                                <tr key={item.id} id = {item.id}
                                    onClick={()=>handleTeamClick(item.id)} 
                                    className={`tableRow ${showSidePanel.open ? 'inactive' : 'active'}`}>
                                    <td >{item.name}</td>
                                    <td>{item.city}</td>
                                    <td>{item.abbreviation}</td>
                                    <td>{item.conference}</td>
                                    <td>{item.division}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    {filteredData.length > 0 && <div className="pagination">
                    <span 
                        onClick={() => selectPageHandler(page - 1)} 
                        className={page > 1 ? "pagination__not_selected" : "pagination__disable"}>◀
                    </span>
                    {[...Array(Math.ceil(filteredData.length / 6))].map((_, i) => {
                        return <span
                                key={i} 
                                className={page === i + 1 ? "pagination__selected" : "pagination__not_selected"} 
                                onClick={() => selectPageHandler(i + 1)}>{i + 1}
                            </span>
                    })}
                    <span 
                        onClick={() => selectPageHandler(page + 1)} 
                        className={page < Math.ceil(filteredData.length / 6) ? "pagination__not_selected" : "pagination__disable"}>▶
                    </span>
                    </div>}
                </Col>
            </Row>
        </Container>
        {showSidePanel.open && showSidePanel.gameData &&<div className="sidepanel">
                <TeamStatsView 
                    showSidePanel={showSidePanel}
                    setShowSidePanel={setShowSidePanel}
                    setPreviousId={setPreviousId}
                    />
            </div>}
        </div>
    );
}

export default TableComponent;
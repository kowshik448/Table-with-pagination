import React from "react";
import './TeamList.css';
import {appConstants} from "../../src/constants"

const  TeamStatsView = ({showSidePanel , setShowSidePanel,setPreviousId}) =>{
    const {home_team_score, date,visitor_team_score ,visitor_team , home_team, season } = showSidePanel.gameData[0];
    const staticData = {
        'Date' : date.slice(0,10),
        'Home Team': home_team.name,
        'Home Team Score': home_team_score,
        'Visitor Team' : visitor_team.name,
        'Visitor Team Score' : visitor_team_score,
    }

    const closeIcon = <span className="material-symbols-outlined">close</span>;

    const handleClose =()=>{
        setShowSidePanel({
            open:false,
            gameData:{},
            teamId:''
        });
        setPreviousId('');
    }
    return(
        <div className="main-container">
            <div className="title">
                <div className="title-name">{home_team.name}</div>
                <button  className="btn-close" onClick={handleClose}>{closeIcon}</button>
            </div>
            <div className="content">
                <div className="text-content">{appConstants.TEAM_FULLNAME}</div>
                <div className="value-content">{home_team.full_name}</div>
            </div>
            <div className="content">
                <div className="text-content">Total Games in {season}</div>
                <div className="value-content">{showSidePanel.gameData.length}</div>
            </div>
            <div className="content font ">{appConstants.RANDOM_GAME_DETAILS}</div>
            {
                Object.entries(staticData).map(([key,value])=>(
                    <div key={key} className="content font inner">
                        <div className="text-content ">{key}</div>
                        <div className="value-content">{value}</div>
                    </div>
                ))
            }
        </div>
    )
}

export default TeamStatsView;
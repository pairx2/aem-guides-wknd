import React, { DOMElement, useState, useEffect } from 'react'
import { useSharedTeamData } from '../shared/TeamData'
import { useSharedLabProfiles } from "../shared/LabProfiles"
import { SearchTeamService } from "../services/SearchTeamService"
import {LoadingIndicator} from "@abbott/add-platform";

export const TeamCardsList = (props) => {
    const { selectedLabProfile } = useSharedLabProfiles()
    const { mySearchedUsers, isLoading } = useSharedTeamData()
    const { searchUsers } = SearchTeamService()

    React.useEffect(() => {
        if (selectedLabProfile.labName) {
            searchUsers()
        }
    }, [selectedLabProfile])


    return (
        <>
            {isLoading && (
                <div className="section-loading">
                    <LoadingIndicator />
                </div>
            )}
            {mySearchedUsers.accountTeam?.length > 0  ? (
                <div className="header_lab-profile">
                    <div className='intrusment-dashboard-title'>
                        <h4>
                            My Abbott Team
                        </h4>
                    </div>
                </div>
            ) :""}
            <div className='team-list-results-container'>
                {mySearchedUsers.accountTeam?.map(item =>
                    <div className='m-card card-body-background instrument-card team-list instrument-card-item'>
                      <div className='internal-card-links'>
                        <div className='instrument-card-links'>
                            <div className='instrument-card-nickname'>
                                <h6>{item.memberRoleLabel}</h6>
                            </div>
                            <div className='instrument-card-prodtype'>
                                <p>{item.memberDetail.FirstName} {item.memberDetail.LastName}</p>
                            </div>
                            <div className='instrument-card-serialnumber'>
                                <a href={`mailto:${item.memberDetail.Email}`}>{item.memberDetail.Email}</a>

                            </div>
                            <div className='instrument-card-prodlink'>
                                <p>{item.memberDetail.Phone}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
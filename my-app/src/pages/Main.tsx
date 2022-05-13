import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GET_LAUNCHES } from '../client/query';
import { LaunchesPastResult, Launch } from '../types/types';

const SortButton = styled.button`
    display: inline-block;
    outline: none;
    cursor: pointer;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;
    height: 38px;
    min-width: 96px;
    min-height: 38px;
    border: none;
    color: #fff;
    background-color: rgb(88, 101, 242);
    transition: background-color .17s ease,color .17s ease;
    :hover {
        background-color: rgb(71, 82, 196);
    }

`

export const Main = () => {
    const [launches, setLaunches] = useState<Launch[]>([])
    const [isError, setIsError] = useState(false)
    const [filterTerm, setFilterTerm] = useState<boolean | null>(null)
    const { loading, data: { launchesPastResult } = {} } = useQuery<LaunchesPastResult>(GET_LAUNCHES, {
        variables: {
            sort: "launch_year",
            order: "desc"
        },
        onCompleted(_data) {
            setLaunches(_data.launchesPastResult.data)
        },
        onError() {
            setIsError(true)
        }
    })

    const TableRows = () => {
        return (
            <>{launches?.map((launch: Launch) => {
                return (
                    <tr key={launch.mission_name}>
                        <td><Link to={launch.id}>{launch.mission_name}</Link></td>
                        <td>{launch.launch_year}</td>
                        <td>{launch.launch_success?.toString()}</td>
                    </tr>
                )
            })
            }</>
        )
    }

    //this won't take into consideration the one result that has no launch success
    //something to consider in the future
    const filter = (launchSuccess: boolean) => {
        const filteredResults = launchesPastResult?.data.filter(launch => launch.launch_success === launchSuccess)
        setFilterTerm(launchSuccess)
        setLaunches(filteredResults || [])
        console.log(filteredResults)
    }

    //shortcut to sort. by utilizing the fact that the query can be sorted initially
    //all we have to do in this case is reverse the array
    const sortByYear = () => {
        setLaunches(launches?.slice().reverse())
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (isError) {
        return <p>Houston we have a problem</p>
    }

    return (
        <>
            <input type="radio"
                value="All"
                checked={filterTerm === null}
                onChange={() => {
                    setLaunches(launchesPastResult?.data || [])
                    setFilterTerm(null)
                }} />All
            <input type="radio"
                value="Success"
                checked={filterTerm === true}
                onChange={() => filter(true)} />Success
            <input type="radio"
                value="Failure"
                checked={filterTerm === false}
                onChange={() => filter(false)} />Failure
            <table>
                <tbody>
                    <tr>
                        <th>Mission Name</th>
                        <th onClick={sortByYear}><SortButton>Launch Year</SortButton></th>
                        <th>Launch Success</th>
                    </tr>
                    <TableRows />
                </tbody>
            </table>
        </>
    );
}


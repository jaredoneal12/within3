import { useQuery } from '@apollo/client'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { GET_LAUNCH } from '../client/query'
import { LaunchDetails } from '../types/types'

const OverviewContainer = styled.div`
    h1, p {
        font-family: 'Space Mono', monospace;
    }
`

export const LaunchOverview = () => {
    let { id } = useParams()
    const { loading, data } = useQuery<LaunchDetails>(GET_LAUNCH, {
        variables: {
            id
        },
    })

    if (loading) {
        return <p>Loading...</p>
    }

    const { mission_name, details, launch_date_utc, } = data?.launch || {}

    return (
        <OverviewContainer>
            <Link to="/">Back</Link>
            <h1>
                Project: {mission_name}
            </h1>
            <p>
                &#128640;
                Launched: {launch_date_utc && new Date(launch_date_utc).toLocaleDateString()}
            </p>
            <p>
                {details || "Looks like there's no description for this launch! Go back and try another one."}
            </p>
        </OverviewContainer>
    )
}
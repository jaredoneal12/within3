import { gql } from "@apollo/client";

export const GET_LAUNCHES = gql`
    query launchesPastResult($order: String, $sort: String) {
        launchesPastResult(order: $order, sort: $sort)
        {
        data {
            mission_name
            launch_year
            launch_success
            id
        }
        }
    }
`;

export const GET_LAUNCH = gql`
    query launchesPastResult($id: ID!) {
        launch(id: $id) {
            mission_name
            details
            launch_date_utc
        }
    }
`
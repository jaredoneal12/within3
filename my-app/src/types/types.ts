export interface Launch {
    mission_name: string
    launch_year: string
    launch_success: boolean | null
    id: string
}

export interface LaunchDetails {
    launch: {
        details: string
        launch_date_utc: string
    } & Launch
}


export interface LaunchesPastResult {
    launchesPastResult: {
        data: Launch[]
    }
}
import React from 'react'
import { render } from '@testing-library/react'
import { Main } from '../pages/Main'
import { useQuery } from '@apollo/client'
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

jest.mock('@apollo/client')

const mockUseQuery = useQuery as jest.Mock

describe('Main page table tests', () => {
    it('should render loading state', () => {
        mockUseQuery.mockReturnValue({
            loading: true
        })
        const { getByTestId } = render(<Main />)

        expect(getByTestId('loading-indicator')).toBeInTheDocument()
    })

    it('should render the main table with some launch data', () => {
        mockUseQuery.mockReturnValue({
            data: {
                launchesPastResult: {
                    data: [
                        {
                            mission_name: "A test mission name",
                            launch_year: "1337",
                            launch_success: false,
                            id: "4202021"
                        }
                    ]
                }
            }
        }
        )
        const { getByText } = render(<Main />, { wrapper: MemoryRouter })
        expect(getByText('1337')).toBeVisible()
    })
})
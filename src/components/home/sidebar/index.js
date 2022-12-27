import React from 'react'
import { SideBarBox } from '../../../style/sidebar'
import SideBarTop from './top'
import AllUsers from './users'

const SideBar = () => {
    return (
        <>
            <SideBarBox>
                <SideBarTop />
                <AllUsers />
            </SideBarBox>
        </>
    )
}

export default SideBar

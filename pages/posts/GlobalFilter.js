import React, { useState } from 'react'
import { Input } from 'semantic-ui-react'

function GlobalFilter({ filter, setFilter }) {

    return (
        <>
            <Input
            icon='search'
            placeholder='Search...'
            vlaue={filter || ''}
            onChange={e => setFilter(e.target.value)}
            />
        </>
    )
}

export default GlobalFilter

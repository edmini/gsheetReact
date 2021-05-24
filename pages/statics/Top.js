import React, { useState } from 'react'
import { Container, Menu, Input } from 'semantic-ui-react'

function Top(){
    const [activeItem, setActiveItem] = useState('Home');

    function handleItemClick(e) {
        setActiveItem(e.target.innerText);
    }

    return (
    <Menu secondary>
        <Container>
            <Menu.Item
            name='Home'
            active={activeItem === 'Home'}
            onClick={handleItemClick}
            />
            <Menu.Item
            name='Messages'
            active={activeItem === 'Messages'}
            onClick={handleItemClick}
            />
            <Menu.Item
            name='Friends'
            active={activeItem === 'Friends'}
            onClick={handleItemClick}
            />
            <Menu.Menu position='right'>
            <Menu.Item>
                <Input icon='search' placeholder='Search...' />
            </Menu.Item>
            <Menu.Item
                name='Logout'
                active={activeItem === 'Logout'}
                onClick={handleItemClick}
            />
            </Menu.Menu>
        </Container>
      </Menu>
    )
}

export default Top;
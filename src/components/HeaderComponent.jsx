import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div className='fixed'>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="navbar-brand">Employee Management App</div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
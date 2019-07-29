import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.handleUserChange = this.handleUserChange.bind(this);
    }
    handleUserChange(e) {
        e.preventDefault();
        this.props.changeView('userSelect')
    }
    render() {
        return(
            <div style={{backgroundColor: "#B9CEF3", color:"white"}} className='banner row py-2'>
                <div className='col-6'>
                    <img style={{ width: 45 }} src='images/logo.png' className='img-fluid' alt="Ohana Logo"/>
                </div>
                <div onClick={this.handleUserChange} style={{fontSize: "1.5rem"}} className="col-5 text-right">{this.props.currentUser}</div>
            </div>
            
        )
    }
}
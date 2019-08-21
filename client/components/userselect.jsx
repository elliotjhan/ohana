import React from 'react';
import {CSSTransition} from 'react-transition-group';

export default class UserSelect extends React.Component{
    constructor(props){
        super(props);
        this.setUserToMom = this.setUserToMom.bind(this);
        this.setUserToDad = this.setUserToDad.bind(this);
        this.setUserToCaregiver = this.setUserToCaregiver.bind(this);
    }
    setUserToMom(){
        this.props.setUser("Mom");
        this.props.changeView("homepage");
    }
    setUserToDad(){
        this.props.setUser("Dad");
        this.props.changeView("homepage");
    }
    setUserToCaregiver(){
        this.props.setUser("Caregiver");
        this.props.changeView("homepage");
    }
    render(){
        return(
            <CSSTransition
                in={true}
                appear={true}
                timeout={200}
                classNames="fade"> 
            <div>
                <br/>
                <div className="container userSelectContainer text-center py-3">
                    <div className="row mt-3 justify-content-center">
                        <div className="col-12 p-2 col-lg-6">
                            <div className="poiretTitle selectUser">Select User</div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12 momButtonContainer">
                            <button onClick={this.setUserToMom} className="btn py-3" type="button">
                                <div className="headerButton momButton">Mom</div>
                            </button>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 dadButtonContainer">
                            <button onClick={this.setUserToDad} className="btn py-3" type="button">
                                <div className="headerButton dadButton">Dad</div>
                            </button>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 caretakerButtonContainer">
                            <button onClick={this.setUserToCaregiver} className="btn py-3" type="button">
                                <div className="headerButton careButton">Caregiver</div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>  
            </CSSTransition>
        )
    }
}
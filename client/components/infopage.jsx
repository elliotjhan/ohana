import React from 'react';
import {CSSTransition} from 'react-transition-group';

export default class InfoPage extends React.Component {
    constructor(props) {
        super(props);
        this.missionButtonHandler = this.missionButtonHandler.bind(this);
        this.teamButtonHandler = this.teamButtonHandler.bind(this);
        this.howToButtonHandler = this.howToButtonHandler.bind(this);
        this.mainPageButtonHandler = this.mainPageButtonHandler.bind(this);
        this.homePageButtonHandler = this.homePageButtonHandler.bind(this);
        this.userSelectHandler = this.userSelectHandler.bind(this);
    }

    missionButtonHandler(e) {
        e.preventDefault();
        this.props.sendInfoPageView('mission');
        this.mainPageButtonHandler();
    }

    teamButtonHandler(e) {
        e.preventDefault();
        this.props.sendInfoPageView('teamMembers');
        this.mainPageButtonHandler();
    }

    userSelectHandler(e) {
        e.preventDefault();
        this.props.setView('userSelect')
    }

    howToButtonHandler(e) {
        e.preventDefault();
        this.props.sendInfoPageView('howTo');
        this.mainPageButtonHandler();
    }

    mainPageButtonHandler() {
        this.props.setView('infoPage');
    }

    homePageButtonHandler() {
        this.props.setView('homepage');
    }

    render() {
        if (this.props.infoPageView === 'landingPage') {
            return(
                <CSSTransition
                in={true}
                appear={true}
                timeout={200}
                classNames="fade"> 
                <div>
                    <div className="container py-3">
                        <br/><br/>
                        <div className="row">
                            <div className="col-5 text-right">
                                <img className="ducky" src="images/logo8.png"/>
                            </div>
                            <div className="col-7 title poiret pl-0 pt-3">hana</div>
                        </div>    
                        <br/><br/><br/><br/>
                        <div className='row'>
                            <div className="missionButtonContainer col-12">
                                <button type="button" className="btn" onClick={this.missionButtonHandler}>
                                    <div className="poiretBody">Our Mission</div>
                                </button>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="teamButtonContainer col-12 ">
                                <button type="button" className="btn" onClick={this.teamButtonHandler}>
                                    <div className="poiretBody">Our Team</div>
                                </button>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="howToButtonContainer col-12 ">
                                <button type="button" className="btn" onClick={this.howToButtonHandler}>
                                    <div className="poiretBody">How To</div>
                                </button>
                            </div>
                        </div>
                        <br/>
                        <div className="row mt-2">
                            <div className="col ml-2">
                                <button onClick={this.userSelectHandler} className="pinkButton">
                                    Start
                                </button>
                            </div>
                        </div>
                    </div>
                </div>   
                </CSSTransition>   
            )
        } else if (this.props.infoPageView === 'teamMembers') {
            return(
                <CSSTransition
                in={true}
                appear={true}
                timeout={200}
                classNames="fade"> 
                <div className="container membersContainer text-center py-2 mb-5">
                    <div className="row mb-1">
                        <div className="col">
                            <div className="poiretTitle">Our Team</div>
                        </div>
                    </div>
                    <div className="row pt-2 align-items-center">
                        <img src="images/Steve.png" alt="steve" className="col-4"/>
                        <div className="col-8">
                            <p style={{"fontSize":"1.65rem"}}>Steve Min</p>
                        </div>
                    </div>
                    <div className="row pt-2 align-items-center">
                        <img src="images/Nick.png" alt="nick" className="col-4"/>
                        <div className="col-8">
                            <p style={{"fontSize":"1.65rem"}}>Nick Simoncelli</p>
                        </div>
                    </div>
                    <div className="row pt-2 align-items-center">
                        <img src="images/Tony.jpeg" alt="tony" className="col-4"/>
                        <div className="col-8">
                            <p style={{"fontSize":"1.65rem"}}>Tony Jin</p>
                        </div>
                    </div>
                    <div className="row pt-2 align-items-center">
                        <img src="images/Elliot.jpeg" alt="elliot" className="col-4"/>
                        <div className="col-8">
                            <p style={{"fontSize":"1.65rem"}}>Elliot Han</p>
                        </div>
                    </div>
                    <div className="row pt-2 align-items-center">
                        <img src="images/Bisham.JPG" alt="bisham" className="col-4"/>
                        <div className="col-8">
                            <p style={{"fontSize":"1.65rem"}}>Bisham Mohabir</p>
                        </div>
                    </div>
                    <div className="row pt-2 align-items-center">
                        <img src="images/cody.jpg" alt="cody" className="col-4"/>
                        <div className="col-8">
                            <p style={{"fontSize":"1.65rem"}}>Cody Miller</p>
                        </div>
                    </div>
                </div>
                </CSSTransition>
            )
        } else if (this.props.infoPageView === "mission") {
            return(
                <CSSTransition
                in={true}
                appear={true}
                timeout={200}
                classNames="fade"> 
                <div className="container missionContainer py-2 mb-3">
                    <div className="row my-3">
                        <div className="col-12 text-left">
                            <div className="poiretTitle">Our Mission</div>
                        </div>
                    </div>
                    <div className="row missionStatement">
                        <div className="col-lg-6">
                            <p>Ohana helps new parents track information about their child.
                                With a simple click of a button: feeding times, naps, and diaper changes are recorded.
                            </p>
                            <p>
                                Ohana's graphical reports and detailed calendar allow parents and caretakers
                                to stay organized.
                            </p>
                            <p>
                                It takes a village to raise a child.
                            </p>
                            <p>Welcome to Ohana</p>
                        </div>
                    </div>
                </div>
                </CSSTransition>
            )
        } else if (this.props.infoPageView === 'howTo') {
            return(
                <CSSTransition
                in={true}
                appear={true}
                timeout={200}
                classNames="fade"> 
                <div className="container missionContainer py-2 mb-4" id="backgroundImage2">
                    <div className="row my-3">
                        <div className="col-12 text-left">
                            <div className="poiretTitle">How To</div>
                        </div>
                    </div>
                    <div className="row missionStatement">
                        <div className="col-lg-6">
                            <p>
                                First, select one of three users Mom, Dad, or Caretaker
                            </p>
                            <p>
                                For diaper change entry, tap the diaper icon and select one of two logos to make entry based on bowel movement type
                            </p>
                            <p>
                                For feeding entry, tap the bottle icon 
                            </p>
                            <p>
                                For nap entry, tap mobile icon when baby begins nap and tap baby icon when nap is finished
                            </p>
                            <p>
                                To navigate, tap the house icon for homepage, graph for entry history, and calendar for monthly view
                            </p>
                            <p>
                                Press any day on the calendar to view list of all entries for that day
                            </p>
                        </div>
                    </div>
                </div>
                </CSSTransition>
            )
        }

    }
}

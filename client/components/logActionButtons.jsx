import React from 'react';
import SubmitModal from './submitModal';
import {CSSTransition} from 'react-transition-group';

export default class LogActionButtons extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            view: 'main',
            show: false,
            startedAt: null
        };
        this.showNotification = this.showNotification.bind(this);
        this.diaperClickHandler = this.diaperClickHandler.bind(this);
        this.nappingClickHandler = this.nappingClickHandler.bind(this);
        this.handlePostNap = this.handlePostNap.bind(this);
        this.cancelDiapering = this.cancelDiapering.bind(this);
        this.sendAwakeState = this.sendAwakeState.bind(this);
        this.handlePostFeedings = this.handlePostFeedings.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
        this.setView = this.setView.bind(this);
    }

    showNotification() {
        this.setState({ show: true });
    }

    setView(){
        this.setState({
            show: false,
            view: 'main'
        });
    }

    diaperClickHandler(e) {
        e.preventDefault();
        this.setState({view : "diapering"})
    }

    nappingClickHandler(e) {
        e.preventDefault();
        if(this.props.awakeState === true){
            this.sendAwakeState();
            this.getCurrentTime(e);
        } else if(this.props.awakeState === false) {
            this.handlePostNap();
            this.sendAwakeState();
            this.showNotification();
        } 
    }

    cancelDiapering(e) {
        e.preventDefault();
        this.setState({view : 'main'})
    }

    getCurrentTime(e) {
        let today = new Date();
        if (e.currentTarget.id==="napButton") {
            this.props.getCurrentTime(today);
        }
    }

    sendAwakeState() {
        let newAwakeState = !this.props.awakeState;
        this.props.sendNapState(newAwakeState);
    }
    
    handleCurrentUser() {
        if(this.props.currentUser === "Mom") {
            return 1;
        } else if(this.props.currentUser === "Dad") {
            return 2;
        } else {
            return 3;
        }
    }

    handlePostNap() {
        //let startedAt = this.state.startedAt;
        this.props.postNap(this.handleCurrentUser(), 1, this.props.startedTime);
    }

    handlePostFeedings(e) {
        e.preventDefault();
        this.props.postFeedings(this.handleCurrentUser(), 1);
        this.showNotification();
    }

    handlePostChange(event) {
        if(event.target.id==="pee") {
            this.props.postChanges(this.handleCurrentUser(), 1, 1); 
        } else {
            this.props.postChanges(this.handleCurrentUser(), 1, 2); 
        }
        this.showNotification();
    }

    currentNapStatusIcon() {
        if(this.props.awakeState){
            return <img src="/images/napButtonIcon.png" id="napButton" height="142px" width="auto" onClick={this.nappingClickHandler} />;
        } else {
            return <img src="/images/sleeping-baby2.png" id="babyButton" height="142px" width="auto" onClick={this.nappingClickHandler}/>;
        }
    }

    diaperingCancelButtonRender() {
        if(this.state.view === 'diapering'){
            return (
                <div className="cancelButtonContainer col-12 text-center">
                    <img className={this.state.show ? 'hide' : ''} src="/images/x-button.png" height="60px" width="auto" onClick={this.cancelDiapering} />
                </div>
            )
        }
    }

    render() {
        return(
            <CSSTransition
            in={true}
            appear={true}
            timeout={200}
            classNames="fade"> 
            <div className="container background1 mt-5">
                <div className="diapering row">
                    <div className="diaperingButtonContainer col-12 text-center">
                        {this.state.view === 'main' ? <img src="/images/diaper.png" height="142px" width="auto" onClick={this.diaperClickHandler}/> : 
                        <div style={{"height":"142px"}}></div> }
                    </div>
                </div>
                <div className="feedingNapping row text-center">
                    <div className="feedingButtonContainer col-6">
                        {this.state.view === 'main' ? 
                            <img src="/images/bottle2.png" height="142px" width="auto" onClick={this.handlePostFeedings}/> :
                            <img src="/images/pee3.png" id="pee" height="142px" width="auto" onClick={this.handlePostChange} />
                        }
                    </div>
                    <div className="nappingButtonContainer col-6">
                        {this.state.view === 'main' ? 
                            this.currentNapStatusIcon() :    
                            <img src="/images/poop4.png" id="poop" height="142px" width="auto" onClick={this.handlePostChange} />
                        }
                    </div>
                </div>
                <div className="cancelButton row my-3">
                        {this.diaperingCancelButtonRender()}
                </div>
                {this.state.show && <SubmitModal setView={this.setView} mainActionConfirm={true} />}                  
            </div>
            </CSSTransition>
        )            
    }
}




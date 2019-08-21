import React from 'react';
import UserSelect from './userselect';
import Header from './header';
import Footer from './footer';
import NavBar from './navbar';
import LogActionButtons from './logActionButtons';
import Calendar from './calendar';
import Graph from './graph';
import InfoPage from './infopage';
import SubmitModal from './submitModal';
import {CSSTransition} from 'react-transition-group';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            view: "landingPage",
            currentUser: "Mom",
            data: [],
            napsData: [],
            feedingsData: [],
            diaperChangesData: [],
            awake: true,
            infoPageView: 'landingPage',
            allCalendarEntries: [],
            startedAt: null
        };
        this.setView = this.setView.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.getEntries = this.getEntries.bind(this);
        this.postNap = this.postNap.bind(this);
        this.getNapsData = this.getNapsData.bind(this);
        this.getFeedingsData = this.getFeedingsData.bind(this);
        this.getDiaperChangesData = this.getDiaperChangesData.bind(this);
        this.receiveActionButtonState = this.receiveActionButtonState.bind(this);
        this.postFeedings = this.postFeedings.bind(this);
        this.postChanges = this.postChanges.bind(this);
        this.receiveInfoPageView = this.receiveInfoPageView.bind(this);
        this.getAllCalendarEntries = this.getAllCalendarEntries.bind(this);
        this.getCurrentTime = this.getCurrentTime.bind(this);
        this.removeEntry = this.removeEntry.bind(this);
        this.updateEntry = this.updateEntry.bind(this);
    }

    componentDidMount() {
        this.getNapsData();
        this.getFeedingsData();
        this.getDiaperChangesData();
        this.getAllCalendarEntries();
    }

    receiveActionButtonState(awakeState){
        this.setState({ awake : awakeState })
    }

    receiveInfoPageView(newPageView){
        this.setState({ infoPageView : newPageView })
    }

    getNapsData() {
        fetch('api/graph/naps', {
            method: 'GET'
        })
        .then(res => res.json())
        .then(res => {
            this.setState({ napsData:res})
        })
        .catch(error => console.error('error: ', error))
    }

    getFeedingsData() {
        fetch('api/graph/feedings', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ feedingsData:res})
            })
            .catch(error => console.error('error: ', error))
    }

    getDiaperChangesData() {
        fetch('api/graph/changes', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(res => {
                this.setState({ diaperChangesData:res})
            })
            .catch(error => console.error('error: ', error))
    }

    getEntries(targetDate) {
        fetch('api/entries?date=' + targetDate)
        .then(response => {
            return response.json();
        })
        .then(myJson => {
            console.log("entries", myJson.entries)
            this.setState({data: myJson.entries});
        })
        .catch(error => {
            console.error('error: ', error);
        })
    }
    getAllCalendarEntries() {
        fetch('api/entries/all')
        .then(response => {
            return response.json();
        })
        .then(myJson => {
            console.log("all entires:", myJson);
            this.setState({allCalendarEntries: myJson});
        })
        .catch(error => {
            console.error('error: ', error);
        })
    }

    updateEntry(id, newData){
        fetch('api/update?id='+id+'&finishedAt='+newData.dateTime+'&entryType='+newData.entryType+'&otherInfo='+newData.otherInfo, {
            method: 'POST',
        })
        .then(response => {
            return response.json();
        })
        .then(myJson => {
           console.log("successful update", myJson);
           this.getAllCalendarEntries();
        })
        .catch(error => {
            console.error('error: ', error);
        })
    }

    postNap(userId, babyId, startedAt) {

        fetch(`api/create/naps?userId=${userId}&babyId=${babyId}&otherInfo={}&startedAt=${startedAt}`, {
            method: 'POST',
        })
        .then(data => console.log('Request Successful:', data)
        )
        .catch(error=> {
            console.error('error:', error);
        })
        this.getAllCalendarEntries();
    }

    postChanges(userId, babyId, changeType) {
        fetch(`api/create/changes?userId=${userId}&babyId=${babyId}&otherInfo=${changeType}`, {
            method: 'POST',
        })
        .then(data => console.log('Request Successful:', data))
        .catch(error=> {
            console.error('error:', error);
        })
        this.getAllCalendarEntries();
    }

    postFeedings(userId, babyId) {
        fetch(`api/create/feedings?userId=${userId}&babyId=${babyId}&otherInfo={}`, {
            method: 'POST',
        })
        .then(data => console.log('Request Successful:', data))
        .catch(error=> {
            console.error('error:', error);
        })
        this.getAllCalendarEntries();
    }

    setView(changedView){
        this.setState({
            view: changedView
        })
    }

    changeUser(newUser){
        this.setState({
            currentUser: newUser
        })
    }

    getCurrentTime(dateTime) {
        this.setState({startedAt: dateTime})
    }

    removeEntry(id){
        console.log("id", id)
        fetch('api/delete?id='+id, {"method": "POST"})
        .then(response => {
            return response.json();
        })
        .then(myJson => {
            console.log("my json in delete", myJson);
            this.setState({
                data: this.state.data.filter(entry=>entry.id!==id)
            })
        })
        .catch(error => {
            console.error('error: ', error);
        })
        this.getAllCalendarEntries();
    }

    render() {
        if(this.state.view ==="userSelect"){
            return (
                <CSSTransition
                appear={true}
                timeout={300}
                classNames="fade"> 
                <div className="backgroundImage">
                    <Header
                        sendInfoPageView={this.receiveInfoPageView}
                        infoPageView={this.state.infoPageView}
                        changeView={this.setView}
                        currentUser={this.state.currentUser}/>
                    <UserSelect
                        setUser={this.changeUser}
                        changeView={this.setView}/>
                    <Footer/>
                </div>
                </CSSTransition>
            )
        }else if(this.state.view==="calendar"){
            return (
                <div className="backgroundImage">
                      <Header
                        sendInfoPageView={this.receiveInfoPageView}
                        infoPageView={this.state.infoPageView}
                        currentView={this.state.view}
                        changeView={this.setView}
                        currentUser={this.state.currentUser}/>
                      <NavBar
                          appView={this.state.view}
                          changeView={this.setView}
                          getNapsData={this.getNapsData}
                          getFeedingsData={this.getFeedingsData}
                          getDiaperChangesData={this.getDiaperChangesData}
                      />
                      <Calendar
                        updateEntry={this.updateEntry}
                        removeEntry={this.removeEntry}
                        getAllCalendarEntries={this.getAllCalendarEntries}
                        calendarData ={this.state.allCalendarEntries}
                        individualDateData={this.state.data}
                        getDateDataFromDatabase={this.getEntries} />
                   </div>
            )
        } else if (this.state.view === "homepage") {
           return( 
                <div className="backgroundImage">
                    <Header
                        sendInfoPageView={this.receiveInfoPageView}
                        infoPageView={this.state.infoPageView}
                        currentView={this.state.view}
                        changeView={this.setView}
                        currentUser={this.state.currentUser} />
                    <NavBar
                    appView={this.state.view}
                        changeView={this.setView}
                        getNapsData={this.getNapsData}
                        getFeedingsData={this.getFeedingsData}
                        getDiaperChangesData={this.getDiaperChangesData}
                    />
                    <LogActionButtons
                        currentUser={this.state.currentUser}
                        awakeState={this.state.awake}
                        sendNapState={this.receiveActionButtonState}
                        postChanges={this.postChanges}
                        postFeedings={this.postFeedings}
                        postNap={this.postNap}
                        getCurrentTime={this.getCurrentTime}
                        startedTime={this.state.startedAt}
                        changeView={this.setView} />
                    <Footer/>
                </div>
           )
        } else if(this.state.view === "graph") {
            return (
                <div className="backgroundImage">
                    <Header
                        sendInfoPageView={this.receiveInfoPageView}
                        infoPageView={this.state.infoPageView}
                        currentView={this.state.view}
                        changeView={this.setView}
                        currentUser={this.state.currentUser}/>
                    <NavBar
                    appView={this.state.view}
                        changeView={this.setView}
                        getNapsData={this.getNapsData}
                        getFeedingsData={this.getFeedingsData}
                        getDiaperChangesData={this.getDiaperChangesData}
                    />
                    <Graph
                        feedings={this.state.feedingsData}
                        changes={this.state.diaperChangesData}
                        naps={this.state.napsData}/>
                    <Footer/>
                </div>
            )
        } else if(this.state.view === "landingPage") {
            return(
                <div>
                    <InfoPage
                        infoPageView={this.state.infoPageView}
                        sendInfoPageView={this.receiveInfoPageView} 
                        setView={this.setView} />
                    <Footer />
                </div>
            )
        } else if (this.state.view === "infoPage") {
            return (
                <div className="backgroundImage">
                    <Header
                        sendInfoPageView={this.receiveInfoPageView}
                        infoPageView={this.state.infoPageView}
                        currentView={this.state.view}
                        changeView={this.setView}
                        currentUser={this.state.currentUser}/>
                    <InfoPage
                        infoPageView={this.state.infoPageView}
                        sendInfoPageView={this.receiveInfoPageView} 
                        setView={this.setView} />
                    <Footer />
                </div>
            )
        } 
    }
}

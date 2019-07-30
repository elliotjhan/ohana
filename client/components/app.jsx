import React from 'react';
import UserSelect from './userselect';
import Header from './header';
import Footer from './footer';
import NavBar from './navbar';
import LogActionButtons from './logActionButtons';
import Calendar from './calendar';
import Graph from './graph';
export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            view: "userSelect", 
            currentUser: "",
            data: []
        }
        this.setView = this.setView.bind(this);
        this.changeUser = this.changeUser.bind(this);
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
    render () {
        if(this.state.view ==="userSelect"){
            return(
                <React.Fragment>
                    <Header changeView={this.setView} currentUser={this.state.currentUser}/>
                    <UserSelect setUser={this.changeUser} changeView={this.setView}/> 
                    <Footer/>
                </React.Fragment>
            )
        
        }else if(this.state.view==="calendar"){
            return (
                <React.Fragment>
                      <Header changeView={this.setView} currentUser={this.state.currentUser}/>
                      <NavBar changeView={this.setView} />
                      <Calendar></Calendar>
                      <Footer/>
                   </React.Fragment>
            )
        } else if (this.state.view === "homepage") {
           return( <React.Fragment>
                    <Header changeView={this.setView} currentUser={this.state.currentUser}/>
                    <NavBar changeView={this.setView} />
                    <LogActionButtons changeView={this.setView} />
                    <Footer/>
                </React.Fragment>
           )
        }else if(this.state.view === "graph") {
            return (
                <React.Fragment>
                    <Header changeView={this.setView} currentUser={this.state.currentUser}/>
                    <NavBar changeView={this.setView} />
                    <Graph />
                    <Footer/>
                </React.Fragment>
            )
        }
    }
}
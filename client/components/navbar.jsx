import React from 'react';
import {CSSTransition} from 'react-transition-group';

export default class NavBar extends React.Component {

        constructor(props){
            super(props);
            this.changeViewtoHome = this.changeViewtoHome.bind(this);
            this.changeViewtoGraph = this.changeViewtoGraph.bind(this);
            this.changeViewtoCalendar = this.changeViewtoCalendar.bind(this);
        }
        changeViewtoHome(){
            this.props.changeView("homepage");
        }
        changeViewtoGraph(){
            this.props.changeView("graph");
            this.props.getNapsData();
            this.props.getDiaperChangesData();
            this.props.getFeedingsData();
        }
        changeViewtoCalendar(){
            this.props.changeView("calendar");
        }

        render(){
            return(
                    <CSSTransition
                        in={true}
                        appear={true}
                        timeout={200}
                        classNames="fade"> 
                        <div className="row py-1 text-center">
                            <div className="homepageButtonContainer col-4">
                                <button onClick={this.changeViewtoHome}  className={this.props.appView === "homepage" ? "highlightNav btn p-2" : "btn p-2"} type="button">
                                    <img src="/images/home.png" width="80" />
                                </button>
                            </div>
                            <div className="homepageButtonContainer col-4">
                                <button onClick={this.changeViewtoGraph} className={this.props.appView === "graph" ? "highlightNav btn p-2" : "btn p-2"} type="button">
                                    <img src="/images/graph.png" width="80" />
                                </button>
                            </div>
                            <div className="homepageButtonContainer col-4">
                                <button onClick={this.changeViewtoCalendar} className={this.props.appView === "calendar" ? "highlightNav btn p-2" : "btn p-2"} type="button">
                                    <img src="/images/calendar.png" width="80" />
                                </button>
                            </div>
                        </div>
                    </CSSTransition>
           )
        }

}

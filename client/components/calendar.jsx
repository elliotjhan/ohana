import React from 'react';
import dateFns from 'date-fns';
import CalendarDetails from './calendardetails';
import SubmitModal from './submitModal';
import {CSSTransition} from 'react-transition-group';
var format = require('date-fns/format');


export default class Calendar extends React.Component{

    constructor(props){
        super(props)
        this.state={
            currentMonth: new Date(),
            currentDate: new Date(), 
            selectedDate: null,
            allEntryData: []
        }
        this.renderHeader = this.renderHeader.bind(this);
        this.nextMonth = this.nextMonth.bind(this);
        this.prevMonth = this.prevMonth.bind(this);
    }

    renderHeader(){
        const dateFormat = "MMMM YYYY";
        return (
            <div className="header row flex-middle py-2">
                <div className="col-2 col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span style={{"fontSize":"1.25rem"}}>
                        {dateFns.format(this.state.currentMonth, dateFormat)}
                    </span>
                </div>
                <div className="col-2 col-end" onClick={this.nextMonth}>
                    <div className="icon"> chevron_right</div>
                </div>
            </div>
        )
    }
    renderDays(){
        const dateFormat = "dddd";
        const days = [];
        let startDate = dateFns.startOfWeek(this.state.currentMonth);

        for (let dateIndex = 0; dateIndex<7; dateIndex++){
            days.push(
                <div className="col col-center" key={dateIndex}>
                    {dateFns.format(dateFns.addDays(startDate, dateIndex), dateFormat).substring(0,3)}
                </div>
            )
        }

        return <div className="days row"> {days}</div>
    }
    renderCells(){
        const {currentMonth, selectedDate} = this.state;
        const monthStart = dateFns.startOfMonth(currentMonth);
        const monthEnd = dateFns.endOfMonth(monthStart);
        const startDate = dateFns.startOfWeek(monthStart);
        const endDate = dateFns.endOfWeek(monthEnd);
        const dateFormat = "D";
        const rows = [];
        let days = [];
        let day = startDate;
        let formattedDate = "";
        // debugger;
        while(day<=endDate){
            for (var dayIndex = 0; dayIndex <7; dayIndex++){
                formattedDate = dateFns.format(day, dateFormat);
                const cloneDay = day;
                var reformattedDay = format(day, "YYYY-MM-DD");
                var calendarDivBackgroundColor= "#FFFFFF";
                var calendarDataDateFromDB = this.props.calendarData.data;
                var calendarColorIndex = 0;

                for (var calendarDataIndex = 0; calendarDataIndex < calendarDataDateFromDB.length; calendarDataIndex++){
                    var cutData =calendarDataDateFromDB[calendarDataIndex].finished_at;
                    var gotDate = new Date(cutData);
                    gotDate = gotDate.toString();
                    gotDate = format(gotDate, "YYYY-MM-DD")
                    if(gotDate===reformattedDay){
                        calendarColorIndex++
                    }
                }

                if(calendarColorIndex>0 && calendarColorIndex<=2){
                    calendarDivBackgroundColor = "#F3E0EC";
                }else if(calendarColorIndex>2 && calendarColorIndex<6){
                    calendarDivBackgroundColor = "#E0BAD7"
                }else if(calendarColorIndex>=6 && calendarColorIndex <9){
                    calendarDivBackgroundColor = "#BC9CB9"
                }else if (calendarColorIndex>=9){
                    calendarDivBackgroundColor = "#AF5E9B"
                }
            
                days.push(
                    <div
                    className={`col cell ${
                         dateFns.isSameDay(day, selectedDate) ? "selected" : ""
                    }`}
                    key={reformattedDay}
                    style={{backgroundColor: calendarDivBackgroundColor}}
                    onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
                  >
                    <span className="number">{formattedDate}</span>
                    <span className="bg">{formattedDate}</span>
                  </div>
                );
                day = dateFns.addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>

    }

    onDateClick(day){
        this.setState({
            selectedDate: day
        }, () => { 
            this.props.getDateDataFromDatabase(
                format(
                    this.state.selectedDate,
                    'YYYY-MM-DD'
                )
            )}
        )
    }
    nextMonth() {
        this.setState({
            currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
        })
    }
    prevMonth(){
        this.setState({
            currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
        })
    }

    render(){
        return(
            <CSSTransition
            in={true}
            appear={true}
            timeout={200}
            classNames="fade"> 
                <div className="calendar">
                    {this.renderHeader()}
                    {this.renderDays()}
                    {this.renderCells()}
                    <CalendarDetails
                        updateEntry={this.props.updateEntry}
                        removeEntry={this.props.removeEntry}
                        getDateDataFromDatabase={this.props.getDateDataFromDatabase}
                        currentDate={this.state.selectedDate}
                        dataFromSelectedDate={this.props.individualDateData}
                    />
                </div>
            </CSSTransition>
        )
    }
}
import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { isThisSecond } from 'date-fns';
var format = require('date-fns/format');

export default class SubmitModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: true,
      minute : "00",
      hour : 1,
      modifiedType : null,
      timeOfDay : "AM",
    };

    this.toggle = this.toggle.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    this.toggle = this.toggle.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleHourSlide = this.handleHourSlide.bind(this);
    this.handleMinuteSlide = this.handleMinuteSlide.bind(this);
    this.modifyToFeeding = this.modifyToFeeding.bind(this);
    this.modifyToDiapering1 = this.modifyToDiapering1.bind(this);
    this.modifyToDiapering2 = this.modifyToDiapering2.bind(this);
    this.modifyToNap = this.modifyToNap.bind(this);
    this.AMclickHanlder = this.AMclickHanlder.bind(this);
    this.PMclickHanlder = this.PMclickHanlder.bind(this);
  }

  hideModal() {
    this.setState({ modal : !this.state.modal });
    this.props.resetModal('');
  }

  toggle(e) {
    e.preventDefault();
    if(this.props.mainActionConfirm === true) {
      this.props.setView();
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    } else if ( this.props.delete === true) {
      this.hideModal();
    } else if ( this.props.modify === true) {
      this.hideModal();
    }
  }

  deleteRow(){
    this.props.resetModal();
    this.props.removeEntry(this.props.id);
  }

  updateEntry () {
    if( this.state.modifiedType === null ) {
      console.log('Please select an entry type.');
      return;
    }
    this.props.resetModal(''); 
    let time;
    let entryType;
    let otherInfo = '{}';
    if(this.state.timeOfDay === 'PM') {
      let militaryHours = parseInt(this.state.hour) + 12;
      if(militaryHours === 24) {
        militaryHours = 0;
      }
      time = militaryHours+':'+this.state.minute+':00';
    } else {
      time = this.state.hour+':'+this.state.minute+':00';
    }
    if(this.state.modifiedType === 'pee' || this.state.modifiedType === 'poop') {
      entryType = 'changes';
    } else {
      entryType = this.state.modifiedType;
    }
    if(this.state.modifiedType === 'pee') {
      otherInfo = 1;
    } else if (this.state.modifiedType === 'poop') {
      otherInfo = 2;
    }

    let newDate = format(this.props.date, 'YYYY-MM-DD');
    

    let dateTime = newDate + " " + time;
    
    let updateEntryObject = {
      'entryType' : entryType,
      'dateTime' : dateTime,
      'otherInfo' : otherInfo,
    }
    this.props.updateEntry(this.props.id, updateEntryObject);
     this.props.getDateDataFromDatabase(newDate);  
  }

  handleHourSlide(e) {
    this.setState({ hour: e.target.value })
  } 

  handleMinuteSlide(e) {
    this.setState({ minute : e.target.value })
  } 

  modifyToFeeding() {
    this.setState({ modifiedType : 'feedings' })
  }

  modifyToDiapering1() {
    this.setState({ modifiedType : 'pee' })
  }

  modifyToDiapering2() {
    this.setState({ modifiedType : 'poop' })
  }

  modifyToNap() {
    this.setState({ modifiedType : 'naps' })
  }

  AMclickHanlder() {
    this.setState({ timeOfDay : "AM" })
  }

  PMclickHanlder() {
    this.setState({ timeOfDay : "PM" })
  }

  timeDisplay() {
    let correctTimeDisplay;
    if(this.state.minute.length === 1){
      console.log('minute.length')
      correctTimeDisplay = this.state.hour+':0'+this.state.minute+' '+this.state.timeOfDay
    } else {
      correctTimeDisplay = this.state.hour+':'+this.state.minute+' '+this.state.timeOfDay
    }
    return correctTimeDisplay;
  }

  setModifyType(){
    let modifyType;
    if(this.state.modifiedType === null) {
      return null;
    } else if (this.state.modifiedType === "feedings"){
      modifyType = <img src="/images/bottle2.png" height="25px" width="auto" />
    } else if (this.state.modifiedType === 'pee') {
      modifyType = <img src="/images/pee3.png" height="25px" width="auto" />
    } else if (this.state.modifiedType === 'poop') {
      modifyType = <img src="/images/poop4.png" height="25px" width="auto" />
    } else if (this.state.modifiedType === 'naps'){
      modifyType = <img src="/images/napButtonIcon.png"height="25px" width="auto" />
    }
    return modifyType;
  }

  render() {
    if(this.props.mainActionConfirm === true) {
      return (
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} >
            <ModalBody className="text-center row p-3" >
              <div className="col-3"><img src="/images/check2.png" height="25px" width="auto"/></div>
               <div className="col-9 pl-0">New entry has been recorded!</div>
            </ModalBody>
          </Modal>
        </div>
      );
    } else if(this.props.delete === true) {
      return (
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} >
            <ModalBody className="text-center" >
              Are you sure you want to delete this entry?
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.hideModal} >No</button>
              <button type="button" className="btn btn-danger" onClick={this.deleteRow} >Yes</button>
            </ModalFooter>
          </Modal>
        </div>
      );
    } else if(this.props.modify === true) {
      return (
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle} >
            <ModalBody>
              <div className="container text-center">
                <div className="row pb-3">
                  <div className="col-3 feedingButtonContainer">
                    <button className="btn p-2" style={{"backgroundColor" : "transparent", "border" : "none"}} value="feeding" onClick={this.modifyToFeeding}>
                      <img src="/images/bottle2.png" id="feedingButton" height="40px" width="auto" /> 
                    </button>                    
                  </div>
                  <div className="col-3 diapering1ButtonContainer">
                    <button className="btn p-2" style={{"backgroundColor" : "transparent", "border" : "none"}} value="diapering1" onClick={this.modifyToDiapering1}>
                      <img src="/images/pee3.png" id="diaper1Button" height="40px" width="auto" />
                    </button>
                  </div>
                  <div className="col-3 diapering2ButtonContainer">
                    <button className="btn p-2" style={{"backgroundColor" : "transparent", "border" : "none"}} value="diapering2" onClick={this.modifyToDiapering2}>
                      <img src="/images/poop4.png" id="diaper2Button" height="40px" width="auto" />
                    </button>
                  </div>
                  <div className="col-3 napButtonContainer">
                    <button className="btn p-2" style={{"backgroundColor" : "transparent", "border" : "none"}} value="nap" onClick={this.modifyToNap}>
                      <img src="/images/napButtonIcon.png" id="napButton" height="40px" width="auto" />
                    </button>
                  </div>
                </div>

                <div className="row sliderContainer">
                  <div className="col-8">
                    <input type="range" min={1} max={12} value={this.state.hour} className="hourSlider" onChange={this.handleHourSlide} />
                  </div> 
                  <div className="col-4 text-left">
                    <p>Hour</p>  
                  </div>
                  <div className="col-8">
                    <input type="range" min={0} max={59} value={this.state.minute} className="minuteSlider" onChange={this.handleMinuteSlide} />
                  </div>
                  <div className="col-4 text-left">
                    <p>Minutes</p>
                  </div>
                  <div className="col-12">
                    <button className="btn" onClick={this.AMclickHanlder}>AM</button>
                    <button className="btn" onClick={this.PMclickHanlder}>PM</button>
                  </div>
                </div>

                <div className="row p-2">
                  <p className="text-center">This entry will be modified to:</p>
                </div>
                <div className="row">
                  <div className="col-6">{this.timeDisplay()}</div>
                  <div className="col-6">{this.setModifyType()}</div>
                </div>
              </div>              

            </ModalBody>
            <ModalFooter>
              <Button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.updateEntry} >Submit</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    } 
  }
}

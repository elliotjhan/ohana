import React from 'react';
import {CSSTransition} from 'react-transition-group';

export default class Footer extends React.Component {
    render() {
        return (
            <CSSTransition
                in={true}
                appear={true}
                timeout={200}
                classNames="fade"> 
                <div className="fixed-bottom row p-2 text-center footer">
                    <p className="col-12 m-0 footerText">
                        Ohana Means Family
                    </p>
                </div> 
            </CSSTransition>
        )
    }
}

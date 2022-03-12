import {Component} from "react";
import '../css/LandingPage.css';
import landingBg from '../assets/images/landing-bg.jpg';
import bookPile from '../assets/images/bookPile.png';

export default class LandingPage extends Component {
    render() {
        return (
            <div className="landingPage">
                <div className="paine1">
                    <h2 className="readSmarter">Read Smarter</h2>
                    <p>Setting goals works!  Whether you have one novel that you want to make sure you get to the end of or whether you are preparing for exams and want to organise your reading schedule, we can help.</p>
                    <p>Create an account, select your book(s) and set your goals.  Goals can be changed at any time so feel free to experiment.</p>
                    <p>Please check out the about page, especially if you want to leave feedback about functionality we could include to improve the user experience.  This app is provided completely free of charge and free of advertising and is therefore staffed by volunteers ... so please be patient!  If you happen to be a programmer, we are always looking for an extra pair of hands so that we can improve!</p>

                    <div className="getStarted">
                        <img className="bookPileImg" alt="pile of books" src={bookPile}/>
                        <h4>Let's get started!</h4>
                    </div>

                </div>
                <div className="paine2">
                    <img src={landingBg} className="landingBg"/>
                </div>
            </div>
        )
    }
}
import React, {MouseEventHandler} from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Submission } from '../submissions';
import {subs} from '../app';

//Might need to change the Route in app.tsx to somewhere else following Author login

export function AuthorPage(props: any){
    const { name } = useParams<{ name : string }>();
    
    //Need to display the art pieces that he/she has submitted on main page

    return(
        <div>
            <h2>{name}'s Page</h2>
            <SubmitButton onClick={() => <Link to='/submit'></Link>}/>
            <p><ViewSubmitted subs /></p>
        </div>
    )
}
// { onClick } : { onClick : MouseEventHandler }
function SubmitButton({ onClick } : { onClick : MouseEventHandler }){
    return(
            <button style={{backgroundColor: 'plum'}} onClick={() => <Link to='/submit'></Link>} >
                <div>Submit Art Piece</div>
            </button>
    )
}

function ViewSubmitted(props : any) {
    let nodes = subs.map((sub: any) => <Submitted key={sub.title+sub.author} value={sub} />).slice(0,5);
    return (
    <div role="main" aria-label="Submission">
        {nodes}
    </div>);
}

function Submitted(props: { value: Submission }) {
    return (<div className="submission">
        <span><Link to={`/view-submission/${props.value.title}`}>&ldquo;{props.value.title}&rdquo;</Link></span>
        <div role="group">
            <EditButton onClick={() => <Link to='/submit'></Link>} />
        </div>
    </div>
)}

function EditButton({ onClick } : { onClick : MouseEventHandler }){
    return(
        //Make like to a psuedo submit page that you can change the description or attach a new file?
        <button onClick={() => <Link to='/submit'></Link>} > <div>Edit Piece</div> </button>
    )
}
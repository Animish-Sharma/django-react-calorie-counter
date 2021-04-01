import React from 'react';
import './NotFound.css';

function NotFoundPage(props) {
    console.log(props);
    return (
        <div className='not-found'>
            <div className="not-found-image-div">
            <img className="not-found-image"
            src="https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/page_not_found_su7k.svg" 
            alt=""/>
            </div>
            <div className='not-found-card'>
                <h2 className="not-found-header">THERE IS NO PAGE WITH URL /{props.match.params.id}</h2>
                <p className="not-found-text">I am sorry there is no page with the url /{props.match.params.id}<br/> 
                There is a great possibility that this page is either removed or moved.
                But you can check out other pages.<br/>
                Thank You
                </p>
            </div>
            
        </div>
    )
}

export default NotFoundPage


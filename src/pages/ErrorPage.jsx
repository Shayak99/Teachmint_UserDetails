import React from 'react';
import { Link } from 'react-router-dom';


const ErrorPage = () => {
    return (
        <>
            <h2><i>The page you are looking for does not exist. Please check the url again. </i></h2>
            <p>
                <Link to={'/'}>Take me Home</Link>
            </p>
        </>
    )
}

export default ErrorPage;
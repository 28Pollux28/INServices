
import React from 'react'
import { Link } from 'react-router-dom'


export const NotFound = () => {
    return (
        <div>
            <h1>Oops! You seem to be lost.</h1>
            <p>Here are some helpful links:</p>
            <Link className="btn btn-toolbar" to='/'>Home</Link>
        </div>
    )
}

import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
        return (
                <div>
                <h1>{country.name.common}</h1>
                <p>capital: {country.capital[0]}</p>
                <p>area: {country.area}</p>
                <h2>languages:</h2>
                <ul>
                {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={country.flag} alt={country.name.common} />
                </div>
        )
}

export default Country

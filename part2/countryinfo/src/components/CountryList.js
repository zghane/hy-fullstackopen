import React from "react"
import Country from "./Country"

const CountryList = ({countries, setCountries}) => {
        if (countries.length > 10) {
                return (
                        <p>Too many matches, specify another filter</p>
                )
        }
        else if (countries.length === 0) {
                return (
                        <p>No countries found, try another search</p>
                )
        }
        // show list of country names
        else if (countries.length > 1 && countries.length < 10) {
                return (
                        <ul>
                        {countries.map(country => <li key={country.name.common}> {country.name.common}<button onClick={() => setCountries([country])}>show</button></li>)}
                        </ul>
                )
        }
        else if (countries.length === 1) {
                return (
                        <Country country={countries[0]}/>
                )
        }
}

export default CountryList

import React from "react"
import { useState, useEffect } from "react"
import axios from "axios"
import CountryList from "./components/CountryList"
import Search from "./components/Search"

const App = () => {
        const [filteredCountries, setFilteredCountries] = useState([])
        const [allCountries, setAllCountries] = useState([])
        const [newSearchFilter, setNewSearchFilter] = useState("")


        // get the country data
        useEffect(() => {
                axios
                        .get("https://restcountries.com/v3.1/all")
                        .then(response => {
                                setAllCountries(response.data)
                        }).catch(error => {
                                //alert("couldn't fetch the country data")
                                console.log(error)
                        })
        }, [])


        const handleSearchFilterChange = (event) => {
                setNewSearchFilter(event.target.value)
                if (newSearchFilter) {
                        // i = case insensitive
                        const re = new RegExp( newSearchFilter, "i" );
                        // name in json structure: country -> name -> common (has nativeName, official,... etc as well)
                        // common is likely the one user supplies as filter?
                        const filtered = allCountries.filter(country => country.name.common.match(re))
                        setFilteredCountries(filtered)
                }
        }

        return (
                <div>
                        <Search value={newSearchFilter} onChange={handleSearchFilterChange} />
                        <CountryList countries={filteredCountries} setCountries={setFilteredCountries} />
                </div>
        )
}

export default App

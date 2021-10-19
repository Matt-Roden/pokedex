import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom';
import Loader from '../Loader/Loader';
import Header from "../Header/Header";
import Search from "../Search/Search";
import HowTo from "../HowTo/HowTo";
import PokedexGrid from "../PokedexGrid/PokedexGrid";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
import Error from "../Error/Error";
import { getPokedexData } from '../../apiCalls';
import "./App.css";

const App = () => {
  const [pokeDex, setPokeDex] = useState([])
  const [foundPokemon, setFoundPokemon] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    setTimeout(() => {getAllPokeDexData()}, 1450)  // setTimeout is for animations
  }, []);

  const getAllPokeDexData = async () => {
    try {
      const res = await getPokedexData()
      const pokeDexData = await res.json()
      setPokeDex(pokeDexData.results)
    } catch (err) {
      console.log('Error: ', err)
    }
  };

  const addPokemon = (queriedPokemon) => {
    const foundPokemon = validatePokemonQuery(queriedPokemon)
    if(foundPokemon === undefined) {
      setError('error')
    } else {
      setFoundPokemon([foundPokemon])
    }
  };

  const validatePokemonQuery = (queriedPokemon) => {
    const lowerCaseInput = queriedPokemon.toLowerCase();

     return pokeDex.find((pokemon, index) => {
      let lowerCaseName = pokemon.name.toLowerCase();

      if (
        lowerCaseName === lowerCaseInput &&
        lowerCaseInput !== "" &&
        lowerCaseInput !== undefined
      ) {
        return pokemon;
      } else if (parseInt(lowerCaseInput)) {
        if (index + 1 === parseInt(lowerCaseInput)) {
          return pokemon;
        }
      }
    })
  };

  const getPokemonImage = (id) => {
    let pokemonImage = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
    return pokemonImage;
  };

  const clearErrorMessage = () => {
    return setError('')
  };

  const clearPokemon = (e) => {
    setFoundPokemon([])
    clearErrorMessage();
  };

  const hideHowToBtn = (e) => {
    const howTo = document.querySelector(".how-to");
    howTo.classList.add("hidden");
  }

  const showHowToBtn = (e) => {
    const howTo = document.querySelector(".how-to");
    howTo.classList.remove("hidden");
  }

  return (
    <div className="App">
      <Header hideHowToBtn={hideHowToBtn} foundPokemon={foundPokemon}/>
      <Route exact path='/'
        render={() =>

          <main className='main-content'>
            {!pokeDex.length && <Loader />}
            {pokeDex.length > 0 && <Search addPokemon={addPokemon} clearErrorMessage={clearErrorMessage}/>}
            {error && <Error />}
            {foundPokemon.length !== 0 && !error && (
              <PokemonDetails
                foundPokemon={foundPokemon}
                getPokemonImage={getPokemonImage}
                clearPokemon={clearPokemon}
              />
            )}

            {foundPokemon.length === 0 && (
              <PokedexGrid
                pokedexData={pokeDex}
                getPokemonImage={getPokemonImage}
              />
            )}

            {error !== '' && foundPokemon.length !== 0 && (
              <PokedexGrid
                pokedexData={pokeDex}
                getPokemonImage={getPokemonImage}
              />
            )}

          </main>
        }
      />
      <Route
        exact path='/howto'
        render={() => <HowTo clearPokemon={clearPokemon} showHowToBtn={showHowToBtn}/>}
      />
    </div>
  )
};

export default App

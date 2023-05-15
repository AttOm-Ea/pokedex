import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import PokemonCard from "../components/pokedex/PokemonCard";


const Pokedex = () => {
    const nameTrainer = useSelector(store => store.nameTrainer);
    const [pokemons, setPokemons] = useState([]);
    const [pokemonName, setPokemonName] = useState("");
    const [typesPokemon, setTypesPokemon] = useState([]);
    const [currentType, setCurrentType] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const handleSubmit = (e) => {
        e.preventDefault();
        setPokemonName(e.target.pokemonName.value);
    }

    const pokemonsByName = pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()))

    const paginationLogic = () => {
        const numbersPokemon = 20;

        const sliceStart = (currentPage - 1) * numbersPokemon;
        const sliceEnd = sliceStart + numbersPokemon;
        const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd);

        const lastPage = Math.ceil(pokemonsByName.length / numbersPokemon) || 1;

        const pagesPerBlock = 5;
        const actualBlock = Math.ceil(currentPage / pagesPerBlock);

        const pagesInblock = [];
        const minPage = (actualBlock -1 ) * pagesPerBlock + 1;
        const maxPage = actualBlock * pagesPerBlock;

        for (let index = minPage; index <= maxPage; index++) {
            if (index <= lastPage) {
                pagesInblock.push(index);    
            }
        }

        return {pokemonInPage, lastPage, pagesInblock}
    }

    const {pokemonInPage, lastPage, pagesInblock} = paginationLogic();

    const handleClickPreviusPage = () => {
        const newCurrentPage = currentPage - 1;
        if(newCurrentPage >= 1){
            setCurrentPage(newCurrentPage);
        }
    }

    const handleClickNextPage = ( ) => {
        const newCurrentPage = currentPage + 1;
        if(newCurrentPage <= lastPage){
            setCurrentPage(newCurrentPage);
        }
    }
    
    useEffect(() => {
        Swal.fire({ title: "Hello " + nameTrainer, text: " Find your favorite Pokemon!", icon: "success", timer: "4000", showConfirmButton: false});
    }, []);

    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/pokemon?limit=1281";
        if (!currentType) {
        axios.get(URL)
            .then((res)  => setPokemons(res.data.results))
            .catch((err)  => console.log(err))    
        }
    }, [currentType]);

    useEffect(() => {
        const URL = "https://pokeapi.co/api/v2/type/";
        axios.get(URL)
            .then((res)  => {
                setTypesPokemon(res.data.results.map(type => type.name).sort())
            })
            .catch((err)  => console.log(err))
    }, []);

    useEffect(() => {
        const URL = `https://pokeapi.co/api/v2/type/${currentType}/`;
        if (currentType) {
            axios.get(URL)
            .then((res)  => {
                setPokemons(res.data.pokemon.map(pokemon => pokemon.pokemon))
            })
            .catch((err)  => console.log(err))    
        }
    }, [currentType]);

    useEffect(() => {
        setCurrentPage(1);
    }, [pokemonName, currentType]);

    return (
        <section className="h-full bg-[#faf7f7] ">
            <form className="h-[12%] w-full flex justify-between lg:justify-end" onSubmit={handleSubmit}>
                <div className="w-[50%] lg:w-[36%] flex justify-center items-center">
                    <select className="h-16 w-11/12 md:w-10/12 rounded-2xl border p-1 capitalize" name="pets" id="pet-select" onChange={(e) => setCurrentType(e.target.value)}>
                        <option value=""> All types </option>
                        {
                            typesPokemon.map(type => <option value={type} key={type}> {type} </option>)
                        }
                    </select>    
                </div>
                <div className="w-[50%] lg:w-[36%] flex justify-center items-center">
                    <div className="h-16 w-11/12 md:w-10/12 rounded-2xl border">
                        <input className='h-full w-9/12 md:w-10/12 rounded-tl-2xl rounded-bl-2xl placeholder:pl-2 pl-2 text-blue-800 capitalize text-xs md:text-base' type="text" placeholder='Find your Pokemon' id="pokemonName"/>
                        <button className='h-full w-3/12 md:w-2/12 rounded-tr-2xl rounded-br-2xl bg-red-700 text-white text-xs md:text-base'> Search </button>        
                    </div>
                </div>
            </form>    
            <ul className="w-full h-[7%] flex justify-center">
                <li onClick={() => setCurrentPage(1)} className="text-3xl text-yellow-600 cursor-pointer flex justify-center items-center pr-2"> {"<<"} </li>
                <li onClick={handleClickPreviusPage} className="text-3xl text-yellow-600 cursor-pointer flex justify-center items-center"> {"<"} </li>
                {
                    pagesInblock.map(numberPage => <li onClick={() => setCurrentPage(numberPage)} className={`py-1 px-2 ${ numberPage == currentPage ? "bg-red-700" : "bg-yellow-600" } rounded-sm m-1 text-white cursor-pointer flex justify-center items-center`} key={numberPage}> {numberPage} </li>)
                }
                <li onClick={handleClickNextPage} className="text-3xl text-yellow-600 cursor-pointer flex justify-center items-center"> {">"} </li>
                <li onClick={() => setCurrentPage(lastPage)} className="text-3xl text-yellow-600 cursor-pointer flex justify-center items-center pl-2"> {">>"} </li>
            </ul>
            <div className="h-[80%] w-full pb-2 px-4 overflow-auto flex flex-wrap">
                
                {
                    pokemonInPage.map(pokemon => <PokemonCard urlPokemon={pokemon.url} namePokemon={pokemon.name} key={pokemon.url}/>)
                }
                
            </div>
        </section>
        
    );
};

export default Pokedex;
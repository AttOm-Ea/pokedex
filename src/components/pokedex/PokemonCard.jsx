import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({urlPokemon, namePokemon}) => {
    const borderByType = {
        'grass': "border-green-800", 'fire': "border-red-800", 'water': "border-blue-800", 'bug': "border-green-800", 'poison': "border-violet-800", 'flying': "border-blue-700", 'normal': "border-blue-600", 'fighting': "border-orange-800", 'ground': "border-stone-800", 'rock': "border-slate-600", 'ghost': "border-slate-800", 'steel': "border-slate-700", 'electric': "border-yellow-700", 'psychic': "border-violet-800", 'ice': "border-blue-400", 'dragon': "border-orange-700", 'dark': "border-violet-800", 'fairy': "border-violet-400", 'unknown': "border-slate-400", 'shadow': "border-slate-900",
    }
    
    const bgByType = {
        'grass': "bg-green-800", 'fire': "bg-red-800", 'water': "bg-blue-800", 'bug': "bg-green-800", 'poison': "bg-violet-800", 'flying': "bg-blue-700", 'normal': "bg-blue-600", 'fighting': "bg-orange-800", 'ground': "bg-stone-800", 'rock': "bg-slate-600", 'ghost': "bg-slate-800", 'steel': "bg-slate-700", 'electric': "bg-yellow-700", 'psychic': "bg-violet-800", 'ice': "bg-blue-400", 'dragon': "bg-orange-700", 'dark': "bg-violet-800", 'fairy': "bg-violet-400", 'unknown': "bg-slate-400", 'shadow': "bg-slate-900",
    }

    const gradientByType = {
        'grass': "from-green-800 via-green-600", 'fire': "from-red-800 via-red-600", 'water': "from-blue-800 via-blue-600", 'bug': "from-green-800 via-green-500", 'poison': "from-violet-800 via-violet-600", 'flying': "from-blue-700 via-blue-500", 'normal': "from-blue-600 via-blue-400", 'fighting': "from-orange-800 via-orenge-600", 'ground': "from-stone-800 via-stone-600", 'rock': "from-slate-600 via-slate-400", 'ghost': "from-slate-800 via-slate-600", 'steel': "from-slate-700 via-slate-500", 'electric': "from-yellow-700 via-yellow-500", 'psychic': "from-violet-800 via-violet-600", 'ice':  "from-blue-400 via-blue-200", 'dragon': "from-orange-700 via-orenge-500", 'dark': "from-violet-900 via-violet-600", 'fairy': "from-violet-400 via-violet-200", 'unknown': "from-slate-400 via-slate-200", 'shadow': "from-slate-900 via-slate-700",
    }

    const [pokemon, setPokemon] = useState();

    const types = pokemon?.types.slice(0, 2).map(type => type.type.name).join(" / ");

    useEffect(() => { 
        axios.get(urlPokemon)
            .then((res)  =>  setPokemon(res.data))
            .catch((err)  => console.log(err))
    }, []);
    
    return (
        <section className="w-full md:w-[50%] lg:w-[20%] h-4/6 flex justify-center items-center">
            <Link to={`/Pokedex/${pokemon?.id}`} className={`w-10/12 h-[95%] border-4 rounded-xl capitalize ${borderByType[pokemon?.types[0].type.name]}`}>
                <div className={`w-full h-1/6 flex justify-center items-center ${bgByType[pokemon?.types[0].type.name]} pl-1`}>
                    <h3 className="w-2/3 h-5/6 bg-yellow-600  rounded-tl-xl rounded-tr-xl rounded-br-3xl flex justify-start items-center pl-2 font-Righteous text-xl text-white text-ellipsis  overflow-auto whitespace-nowrap"> {namePokemon} </h3>
                    <span className="w-1/3 h-full flex justify-center items-center text-center text-slate-300"> {types} </span>
                </div>
                <div className={` w-full h-5/6 bg-gradient-to-b ${gradientByType[pokemon?.types[0].type.name]} from-15% via-40% to-40% to-white  rounded-br-lg rounded-bl-lg `}>
                    <div className="w-full h-4/6 flex justify-center items-center">
                        <img className="max-w-full max-h-full" src={pokemon?.sprites.other["official-artwork"].front_default} alt="Pokemon"/>    
                    </div>
                    <section className="h-2/6 flex flex-wrap overflow-auto">
                        {
                            pokemon?.stats.map(stat => (
                                <div className="w-1/3 flex flex-col justify-end items-center text-center" key={stat.stat.name}>
                                    <h5 className={`text-xs font-Righteous text-red-950`}>{stat.stat.name == "special-attack" ? "S-Attac" : stat.stat.name && stat.stat.name == "special-defense" ? "S-Defense" : stat.stat.name }</h5>
                                    <span className="text-sm font-Righteous text-yellow-600">{stat.base_stat}</span>
                                </div>
                            ))
                        }
                    </section>
                </div>
            </Link>
        </section>
    );
};

export default PokemonCard;
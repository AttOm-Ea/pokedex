import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PokemonId = () => {
    const [pokemon, setPokemon] = useState();
    const {id} = useParams();
    const gradientByType = {
        'grass': "from-green-800 via-green-600", 'fire': "from-red-800 via-red-600", 'water': "from-blue-800 via-blue-600", 'bug': "from-green-800 via-green-500", 'poison': "from-violet-800 via-violet-600", 'flying': "from-blue-700 via-blue-500", 'normal': "from-blue-600 via-blue-400", 'fighting': "from-orange-800 via-orenge-600", 'ground': "from-stone-800 via-stone-600", 'rock': "from-slate-600 via-slate-400", 'ghost': "from-slate-800 via-slate-600", 'steel': "from-slate-700 via-slate-500", 'electric': "from-yellow-700 via-yellow-500", 'psychic': "from-violet-800 via-violet-600", 'ice':  "from-blue-400 via-blue-200", 'dragon': "from-orenge-700 via-orenge-500", 'dark': "from-violet-900 via-violet-600", 'fairy': "from-violet-400 via-violet-200", 'unknown': "from-slate-400 via-slate-200", 'shadow': "from-slate-900 via-slate-700",
    }
    const colorsByType = {
        'grass': "bg-green-800", 'fire': "bg-red-800", 'water': "bg-blue-800", 'bug': "bg-green-800", 'poison': "bg-violet-800", 'flying': "bg-blue-700", 'normal': "bg-blue-600", 'fighting': "bg-orange-800", 'ground': "bg-stone-800", 'rock': "bg-slate-600", 'ghost': "bg-slate-800", 'steel': "bg-slate-700", 'electric': "bg-yellow-700", 'psychic': "bg-violet-800", 'ice': "bg-blue-400", 'dragon': "bg-orenge-700", 'dark': "bg-violet-800", 'fairy': "bg-violet-400", 'unknown': "bg-slate-400", 'shadow': "bg-slate-900",
    }

    console.log(pokemon);
    const getPercentStatBar = (stat) => {
        const percentBarProgres = Math.floor((stat * 100)/255)
        return `${percentBarProgres}%`
    }

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            .then((res)  =>  setPokemon(res.data))
            .catch((err)  => console.log(err))
    }, []);

    return (
        <section className="w-full h-full max-w-[1350px] m-auto">
            <div className="w-full h-16 flex justify-center pr-4 pt-2 mb-4">
                <h3 className="w-9/12 lg:w-3/12 h-full bg-yellow-600 rounded-tl-xl rounded-br-3xl flex justify-center items-center font-Righteous text-xl text-white text-ellipsis  overflow-auto whitespace-nowrap capitalize"> { "#" + id + " / " + pokemon?.name} </h3>    
            </div>
            <div className="w-full h-auto lg:h-[59%] flex flex-col md:flex-row md:flex-wrap">
                <div className="w-11/12 m-auto md:m-0 md:w-1/2 lg:w-1/3 px-2 pt-3 order-2 lg:order-1">
                    <div className="w-full flex justify-center items-center">
                        <div className="w-1/3 h-[.10rem] bg-yellow-600 rounded-full"></div> 
                        <h3 className="w-1/3 font-Righteous text-center "> Basics  </h3>
                        <div className="w-1/3 h-[.10rem] bg-yellow-600 rounded-full"></div>     
                    </div>
                    <div className="h-5/6 flex flex-col justify-evenly overflow-auto">
                        <div className="flex justify-evenly items-center text-center">
                            <div>
                                <h4> Weight </h4>
                                <span> {pokemon?.weight} </span>
                            </div>
                            <div>
                                <h4> Height </h4>
                                <span> {pokemon?.height} </span>
                            </div>
                        </div>
                        <div className="text-center">
                            <h4 className="mb-2"> Types </h4>
                            <section className="flex flex-nowrap justify-center">
                                {
                                    pokemon?.types.map(type => (
                                        <article className={`w-[30%] py-2 ${colorsByType[type.type.name]} border-2 border-slate-500 rounded-2xl capitalize text-white mr-2 mb-2`}  key={type.type.name}> {type.type.name} </article>
                                    ))
                                }
                            </section>
                        </div>
                        <div className="text-center">
                            <h4 className="mb-2"> Abilities </h4>
                            <section className="flex flex-nowrap justify-center">
                                {
                                    pokemon?.abilities.map(ability => (
                                        <article className={`w-[30%] py-2 bg-gradient-to-r ${gradientByType[pokemon?.types[0].type.name]} from-50% via-100% border-2 border-slate-500 rounded-2xl capitalize text-white mr-2 mb-2`}  key={ability.ability.name}> {ability.ability.name} </article>
                                    ))
                                }
                            </section>
                        </div>
                    </div>
                </div>
                <div className={`w-10/12 m-auto lg:w-1/3 h-full flex justify-center items-center bg-gradient-to-b ${gradientByType[pokemon?.types[0].type.name]} from-15% via-70% to-70% to-white  rounded-tr-3xl rounded-tl-3xl order-1 lg:order-2`}>
                    <img className="max-w-full max-h-full" src={pokemon?.sprites.other["official-artwork"].front_default} alt=""/>    
                </div>
                <div className="w-11/12 m-auto md:w-1/2 lg:w-1/3 px-2 pt-3 order-3">
                    <div className="w-full flex justify-center items-center">
                        <div className="w-1/3 h-[.10rem] bg-yellow-600 rounded-full"></div> 
                        <h3 className="w-1/3 font-Righteous text-center "> Stats  </h3>
                        <div className="w-1/3 h-[.10rem] bg-yellow-600 rounded-full"></div>     
                    </div>
                    <section>
                        {
                            pokemon?.stats.map(stat => (
                                <article key={stat.stat.name}>
                                    <section className="flex justify-between">
                                        <h4 className="capitalize"> {stat.stat.name} </h4>
                                        <span> {stat.base_stat} / 255 </span>
                                    </section>
                                    <div className="bg-gray-100 h-6 rounded-md">
                                        <div style={{"width": getPercentStatBar(stat.base_stat)}} className={`h-full bg-gradient-to-r ${gradientByType[pokemon?.types[0].type.name]} from-50% via-100%`}> </div>
                                    </div>
                                </article>
                                
                            ))
                        }
                    </section>
                </div>
            </div>
            <div className="w-full ">
                <div className="w-full flex justify-center items-center">
                    <div className="w-1/3 h-[.10rem] bg-yellow-600 rounded-full"></div> 
                    <h3 className="w-1/3 font-Righteous text-center "> Movements  </h3>
                    <div className="w-1/3 h-[.10rem] bg-yellow-600 rounded-full"></div>     
                </div>
                <section className="w-full h-32 flex justify-center flex-wrap overflow-auto gap-2 pt-1">
                    {
                        pokemon?.moves.map(move => (
                            <article className={`w-3/12 md:w-1/12 py-2 max-h-10 bg-gradient-to-r ${gradientByType[pokemon?.types[0].type.name]} from-50% via-100% border-2 border-slate-500 rounded-2xl capitalize text-white mb-2 text-clip overflow-auto whitespace-nowrap text-center px-[.18rem] `}  key={move.move.name}> {move.move.name} </article>
                        ))
                    }
                </section>
            </div> 
        </section>
    );
};

export default PokemonId;
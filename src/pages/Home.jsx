import React from 'react';
import { setNameTrainer } from '../store/slices/nameTrainer.slice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setNameTrainer(e.target.nameTrainer.value));
        navigate("/Pokedex")
    }

    return (
        <section className='w-full h-full flex flex-col justify-center items-center bg-red-900/90'>
            <div className='h-3/6 w-full flex items-center mt-10'>
                <div className='h-full w-28 flex justify-center items-center'>
                    <div className="w-0 h-0 border-t-[25px] md:border-t-[50px] border-t-transparent border-l-[50px] md:border-l-[100px] border-l-yellow-600 border-b-[25px] md:border-b-[50px] border-b-transparent rounded-full"> </div>
                </div>
                <div className='w-11/12 flex flex-col justify-center items-center pr-28'>
                    <h2 className='text-yellow-400 font-Righteous text-3xl md:text-6xl'> Hello Trainer! </h2>
                    <p className='font-Instrument text-xs md:text-base '> Enter your nickname to get started... </p>
                    <form action="" className='border flex' onSubmit={handleSubmit}>
                        <input id="nameTrainer" className='md:p-2 text-blue-700' type="text" placeholder='Your Nickname'/>
                        <button className='bg-blue-600 hover:bg-blue-800 md:p-2 text-white'> Start </button>
                    </form>
                    <div className='h-28'>
                        <img className='h-full m-auto' src="/Img/ballHome.png" alt="Pokeball"/>    
                    </div>        
                </div>
            </div>
            <div className='w-full h-1/6 mt-16 flex flex-col'> 
                <div className='w-4/12 h-1 m-auto border border-gray-600 bg-black rounded-full'> </div>
                <div className='w-3/12 h-1 m-auto border border-gray-700 bg-black rounded-full'> </div>
                <div className='w-2/12 h-1 m-auto border border-gray-800 bg-black rounded-full'> </div>
            </div>
        </section>
    );
}

export default Home;
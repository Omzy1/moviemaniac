import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import './MovieList.css';
import './MovieList.css';
import MovieCard from './MovieCard';
import FilterGroup from '../FilterGroup';
const MovieList = ({type, title , emoji}) => {
    const [movies, setMovies] = useState([])
    const [filteredMovies, setFilteredMovies] = useState([])
    const [minRating, setMinRating] = useState(0)
    const [sorting, setSorting] = useState({
        by: "default",
        order: "desc"
    });
    //  fetch("https://api.themoviedb.org/3/movie/popular?api_key=cb92c3f932d4d632779b0fb5228e6ee9"
        // )
        // this is the first method in order to get the data
        // .then(res => res.json()).then(data => console.log(data))
    useEffect(() => {
        //calling the API data by fetching 
        fetchMovies();
    } ,[type]);

    useEffect(() => {
        if(sorting.by!=="default"){
            const sortMovies = _.orderBy(filteredMovies, [sorting.by], [sorting.order])
            setFilteredMovies(sortMovies)
        }
    }, [sorting]);
     //this is the second method to get the data
     const fetchMovies = async () => {
        const response= await fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=cb92c3f932d4d632779b0fb5228e6ee9`
        ) 
        const data = await response.json();
        setMovies(data.results);
        setFilteredMovies(data.results);
     };
     const handleFilter = rate => {
        if(minRating === rate){
            setMinRating(0);
            setFilteredMovies(movies);
        }else{
        setMinRating(rate)
        const  filtered = movies.filter(movie => movie.vote_average >= rate)
        setFilteredMovies(filtered);
        }
    };
    const handleSorting = e => {
       const {name ,value} = e.target;
      setSorting(prev => ({...prev, [name]: value}))
      };
    
     
  return (
    <section className="movie_list" id={type}>
        <header className='align_center movie_list_header'>
            <h2 className= 'align_center movie_list_heading'>{title} <img src={emoji} alt={`${emoji} icon`} className='navbar_emoji' /></h2>
       
       <div className="align_center movie_list_fs">
        <FilterGroup onClickFilter={handleFilter} minRating={minRating}/>
        <select name="by" id="" className="movie_sorting" onChange={handleSorting} value={sorting.by}>
            <option value="default">SortBy</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
        </select>

        <select name="order" id="" className="movie_sorting" onChange={handleSorting} value={sorting.order}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
        </select>
       </div>
        </header>

        <div className="movie_cards">
            {
                filteredMovies.map(movie => <MovieCard key={movie.id} movie ={movie}/>)
            }
        </div>
    </section>
  )
};

export default MovieList
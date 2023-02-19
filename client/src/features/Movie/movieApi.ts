import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api";
import { IMovie } from "../../models/movie";

export const getMovies = createAsyncThunk("movie/getMovies", async () => {
    try {
        const response = await API.get("movies")
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const addMovie = createAsyncThunk("movie/addMovie", async (movie: IMovie) => {
    try {
        const response = await API.post("movies", movie)
        return response.data
    } catch (error) {
        console.log(error)
    }
})

// export const updateMovie = createAsyncThunk("movie/updateMovie",
//     async (movie: IMovie) => {
//         try {
//             const response = await API.put(`movies/${movie.id}`, movie);
//             return response.data
//         } catch (error) {
//             console.log(error)
//         }
//     })

// export const deleteMovie = createAsyncThunk("movie/deleteMovie", async (id: number) => {
//     try {
//         const response = await API.delete(`movies/${id}`)
//         return response.data
//     } catch (error) {
//         console.log(error)
//     }
// })
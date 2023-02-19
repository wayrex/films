import { createSlice } from "@reduxjs/toolkit";
import { addMovie, getMovies } from "./movieApi";

export const movieSlice = createSlice({
    name: "movie",
    initialState: {
        list: {
            isLoading: false,
            status: "",
            values: []
        },
        save: {
            isSaving: false,
            isDeleting: false
        }
    },
    reducers: {
        clearSuccessMessage: (state, payload) => {
            // TODO: Update state to clear success message
        }
    },
    extraReducers: {
        [getMovies.pending.type]: (state, action) => {
            state.list.status = "pending"
            state.list.isLoading = true
        },
        [getMovies.fulfilled.type]: (state, { payload }) => {
            state.list.status = "success"
            state.list.values = payload
            state.list.isLoading = false
        },
        [getMovies.rejected.type]: (state, action) => {
            state.list.status = "failed"
            state.list.isLoading = false
        },
        [addMovie.pending.type]: (state, action) => {
            state.save.isSaving = true
        },
        [addMovie.fulfilled.type]: (state, action) => {
            state.save.isSaving = false
        },
        [addMovie.rejected.type]: (state, action) => {
            state.save.isSaving = false
        },
        // [updateMovie.pending.type]: (state, action) => {
        //     state.save.isSaving = true
        // },
        // [updateMovie.fulfilled.type]: (state, action) => {
        //     state.save.isSaving = false
        // },
        // [updateMovie.rejected.type]: (state, action) => {
        //     state.save.isSaving = false
        // },
        // [deleteMovie.pending.type]: (state, action) => {
        //     state.save.isDeleting = true
        // },
        // [deleteMovie.fulfilled.type]: (state, action) => {
        //     state.save.isDeleting = false
        // },
        // [deleteMovie.rejected.type]: (state, action) => {
        //     state.save.isDeleting = false
        // }
    }
})

export default movieSlice.reducer

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IMovie, IMovieList } from "../../models/movie";
import { RootState, useAppDispatch } from "../../store";
import {
  getMovies,
  addMovie
} from "./movieApi";
// import moment from "moment";
import { Input, Checkbox, Button } from "../../components";
// import { toast, ToastContainer } from "react-toastify";

export const Movie: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  const movieList = useSelector(
    (state: RootState) => state.movie.list.values
  );
  const isLoadingTable = useSelector(
    (state: RootState) => state.movie.list.isLoading
  );
  const isSaving = useSelector(
    (state: RootState) => state.movie.save.isSaving
  );
  const isDeleting = useSelector(
    (state: RootState) => state.movie.save.isDeleting
  );

  const [movie, setMovie] = useState<IMovie>({
    Title: "",
    Year: 768,
    Runtime: "879",
    Poster: "google.com"
  });

  const [showValidation, setShowValidation] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setMovie((prevState) => ({
      ...prevState,
      [name]: name === "isActive" ? checked : value,
    }));
  };

  const selectMovie = (d: IMovie) => {
    setShowValidation(false);
    setMovie({
      Title: d.Title,
      Year: d.Year,
      Runtime: d.Runtime,
      Poster: d.Poster
    });
  };

  // const removeMovie = (id: number) => {
  //   if (id)
  //     dispatch(deleteMovie(id))
  //       .unwrap()
  //       .then((response) => {
  //         console.log(response);
  //         dispatch(getMovies());
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  // };

  const submit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (movie.Title === "") {
      setShowValidation(true);
      return;
    }

    // const action =
    //   movie.id === 0
    //     ? addMovie(movie)
    //     : updateMovie(movie);
    const action = addMovie(movie);
    dispatch(action)
      .unwrap()
      .then((response: any) => {
        console.log(response);
        resetForm();
        dispatch(getMovies());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetForm = () => {
    setMovie({
      Title: "",
      Year: 768,
      Runtime: "879",
      Poster: "google.com"
    });
    setShowValidation(false);
  };

  return (
    <>
      <div className="form-container">
        <h1 className="title">
          Movie &nbsp;
          <span className="tag is-link">{movieList?.length}</span>
        </h1>
        <div className="card">
          <div className="card-content">
            <div className="content">
              <div className="columns">
                <div className="column is-4">
                  <Input
                    type="text"
                    title="Name"
                    name="name"
                    placeholder="Enter name here"
                    value={movie.Title}
                    inputChange={handleInputChange}
                    showValidation={showValidation}
                    isRequired={true}
                  />
                </div>
              </div>
              <Button
                type="is-success"
                loading={isSaving}
                title="Submit"
                onClick={submit}
                disabled={isSaving || isDeleting}
              />
              &nbsp;
              {/* {movie.id !== 0 && (
                <Button
                  title="Cancel"
                  onClick={resetForm}
                  disabled={isSaving || isDeleting}
                />
              )} */}
              <hr />
              {isLoadingTable && (
                <div className="has-text-centered">Fetching...</div>
              )}
              <div className="table-container">
                <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Active</th>
                      <th>Birthday</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {movieList?.map((d: IMovieList, index: number) => {
                      return (
                        <tr key={index}>
                          <td>{d.Title}</td>
                          <td>
                            <Button
                              type="is-warning"
                              title="Edit"
                              onClick={() => selectMovie(d)}
                              disabled={isSaving || isDeleting}
                            />
                            &nbsp;
                            {/* <Button
                              type="is-danger"
                              title="Delete"
                              loading={isDeleting}
                              onClick={() => removeMovie(d.id)}
                              disabled={isSaving || isDeleting}
                            /> */}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default interface Film {
    title: string;
    description: string;
    type: string;
    extractedFrom: string;
    filmId: string;
    url: string;
    siteName: string;
    image: string;
    genres: string[],
    actors: string[],
    directors: string[],
    releaseDate: Date,
    createdDate: Date,
    modifiedDate: Date
}

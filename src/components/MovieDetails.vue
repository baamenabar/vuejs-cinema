<template>
    <div class="detail" v-if="movie">
        <movie-item v-bind:movie="movie">
            <div class="movie-details">
                <p class="movie-genre">{{ movie.Genre }}</p>
                <p class="movie-plot">{{ movie.Plot }}</p>
                <table>
                    <tr>
                        <td>Released date:</td><td>{{ movie.Released }}</td>
                    </tr>
                    <tr>
                        <td>Running time</td><td>{{ movie.Runtime }}</td>
                    </tr>
                    <tr>
                        <td>Director: </td><td>{{ movie.Director }}</td>
                    </tr>
                    <tr>
                        <td>Cast: </td><td>{{ movie.Actors }}</td>
                    </tr>
                </table>
            </div>
        </movie-item>
        <p class="home"><router-link v-bind:to="{ name: 'home' }">Return to results</router-link></p>
    </div>
</template>

<script>

import MovieItem from './MovieItem.vue';

export default {
    props: ['movies'],
    computed: {
        movie() {
            const foundMovie = this.movies.find(movie => movie.movie.imdbID === this.$route.params.id, this);
            return foundMovie ? foundMovie.movie : undefined;
        },
    },
    components: {
        MovieItem,
    },
}
</script>

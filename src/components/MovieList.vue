<template>
    <div class="movie-list">
        <div v-if="filteredMovies.length">
            <movie-item v-for="movie in filteredMovies" v-bind:movie="movie.movie" v-bind:key="movie.movie.imdbID">
                <div v-for="session in getSessionTimes(movie.sessions)" class="session-time-wrapper tooltip-wrapper" v-tooltip="{ seats: session.seats }">
                    <div class="session-time">{{ session.time }}</div>
                </div>
            </movie-item>
        </div>
        <div v-else-if="movies.length" class="no-results">
            {{ noResults }}
        </div>
        <div v-else class="no-results">
            Loading...
        </div>
    </div>
</template>

<script>
import genres from '../util/genres';// relative to this file
import times from '../util/times';
import MovieItem from './MovieItem.vue';

export default {
    props: ['genre', 'time', 'movies', 'day'],
    components: {
        MovieItem,
    },
    methods: {
        moviePassesGenreFilter(movie) {
            // if no filter is selected, all movies are elegible
            if (!this.genre.length) {
                return true;
            }
            return this.genre.every( genre => {
                const movieGenres = movie.movie.Genre.split(', ');
                return movieGenres.indexOf(genre) > -1;
            });
        },
        sessionPassesTimeFilter(session) {
            // if none or all are checked, just return all
            if (!this.time.length || this.time.length === Object.keys(times).length) {
                return true;
            }
            
            if (!this.day.isSame(session.time, 'day')) {
                return false;
            }

            if (this.time[0] === times.BEFORE_6PM) {
                return this.$moment(session.time).hour() < 18;
            }
            // ELSE this.time[0] === times.AFTER_6PM
            return this.$moment(session.time).hour() >= 18;
        },
        filteredSessions(sessions) {
            return sessions.filter(session => {
                return this.sessionPassesTimeFilter(session) && this.$moment(session.time).isSame(this.day, 'day');
            }, this);
        },
        getSessionTimes(sessions) {
            return this.filteredSessions(sessions).map(session => {
                return Object.assign({}, session, {
                    time: this.$moment(session.time).format('h:mm A'),
                });
            }, this);
        },
    },
    computed: {
        filteredMovies() {
            return this.movies
                .filter(this.moviePassesGenreFilter, this)
                .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter, this), this)
            ;
        },
        noResults() {
            const times = this.time.join(', ');
            const genres = this.genre.join(', ');

            return `No results for ${times}${ times.length && genres.length ? ', ' : '' }${genres}`;
        },
    },
}
</script>
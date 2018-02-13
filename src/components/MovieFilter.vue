<template>
    <div class="movie-filter">
        <h2>Movie Filters</h2>
        <h3>By time of day</h3>
        <div class="filter-group"> 
            <check-filter v-for="time in times" v-bind:title="time" type="time" v-bind:key="time"></check-filter>
        </div>
        <h3>By genre</h3>
        <div class="filter-group"> 
            <check-filter v-for="genre in genres" v-bind:title="genre" type="genre" v-bind:key="genre"></check-filter>
        </div>
    </div>
</template>

<script>
import genres from '../util/genres';// relative to this file
import times from '../util/times';
import CheckFilter from './CheckFilter.vue';

export default {
    components: {
        CheckFilter,
    },
    data() {
        return {
            genres,
            times,
        };
    }
}
</script>
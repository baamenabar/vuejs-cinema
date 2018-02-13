<template>
    <div class="movie">
        <div class="movie-col-left">
            <router-link v-bind:to="{ name: 'movie', params: { id: movie.imdbID } }">
                <img :src="movie.Poster" alt="">
            </router-link>
        </div>
        <div class="movie-col-right">
            <div class="movie-header">
                <router-link v-bind:to="{ name: 'movie', params: { id: movie.imdbID } }">
                    <h3 class="movie-title">{{ movie.Title }}</h3>
                </router-link>
                <div class="movie-rating">{{ movie.Rated }}</div>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>

export default {
    props: ['movie'],
}
</script>
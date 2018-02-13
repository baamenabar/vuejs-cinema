import Overview from '../components/Overview.vue';
import MovieDetails from '../components/MovieDetails.vue';

export default [
    { path: '/', component: Overview, name: 'home'},
    { path: '/movie/:id', component: MovieDetails, name: 'movie'},
    { path: '*', redirect: { name: 'home' } },
];

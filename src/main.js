import Vue from 'vue';
import './style.scss';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment } });

const bus = new Vue();
Object.defineProperty(Vue.prototype, '$bus', { get() { return this.$root.bus } });

import { checkFilter, setDay } from './util/bus';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import routes from './util/routes';
const router = new VueRouter({ routes });

import Tooltip from './util/tooltip';
Vue.use(Tooltip);

new Vue({
    el: '#app',
    data: {
        moment,
        bus,
        genre: [],
        time: [],
        movies: [],
        day: moment(),
    },
    components: {
        VueRouter,
    },
    router,
    created: function() {
        this.$http.get('/api')
        .then(response => {
            this.movies = response.data;
        })
        .catch(err => {
            console.error('Failed request.', err);
        });

        this.$bus.$on('filter-checked', checkFilter.bind(this));
        this.$bus.$on('select-day', setDay.bind(this));
    }
});

<template>
    <div class="day-select">
        <ul class="days">
            <li v-for="day in days" v-on:click="selectDay(day)" :class="{ day: true, active: isActive(day) }">
                {{ formatDay(day) }}
            </li>
            <li class="day-selector">
                <span class="dec" @click="changeDay(-1)"></span>
                <span class="inc" @click="changeDay(1)"></span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['selected'],
    data() {
        return {
            days: [0, 1, 2, 3, 4, 5, 6].map(num => this.$moment().add(num, 'days'))
        };
    },
    methods: {
        formatDay(rawDay) {
            if (rawDay.isSame(this.$moment(), 'day')) {
                return 'Heute';
            }
            return rawDay.format('ddd DD/MM');
        },
        isActive(day) {
            return day.isSame(this.selected, 'day');
        },
        selectDay(day) {
            this.$bus.$emit('select-day', day);
        },
        changeDay(change) {
            const newDay = this.$moment(this.selected).add(change, 'days');
            if(!this.days.some(day => day.isSame(newDay, 'day'))) {
                return;
            }
            this.selectDay(newDay);
        },
    }
}
</script>

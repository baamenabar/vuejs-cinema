<template>
    <div class="check-filter">
        <label>
            <input type="checkbox" v-model="checked" v-on:change="checkFilter" />
            <span class="check-filter-title">{{ title }}</span>
        </label>
    </div>    
</template>

<script>
export default {
    data() {
        return {
            checked: false
        };
    },
    props: ['title', 'type'],
    methods: {
        checkFilter() {
            this.$bus.$emit('filter-checked', {
                type: this.type,
                name: this.title, 
                checked: this.checked,
            });
        }
    },
}
</script>

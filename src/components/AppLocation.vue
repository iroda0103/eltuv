<template>
    <div class="location-selector" v-if="!isRestaurantPage">
        <select v-model="selectedLocation" @change="filterByLocation" class="location-select"
            :disabled="isRestaurantPage">
            <option v-for="location in locations" :key="location.id" :value="location.id">
                {{ location.name }}
            </option>
        </select>
        <!-- <i class="location-icon">📍</i> -->
        <font-awesome-icon class="location-icon" :icon="['fas', 'location']" />

    </div>
</template>

<script>
export default {
    name: 'AppLocation',
    props: {
        locations: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            selectedLocation: 1
        };
    },
    emits: ['update:selectedLocation'],
    computed: {
        isRestaurantPage() {
            return this.$route.path.startsWith('/restaurant/');
        }
    },
    methods: {
        filterByLocation() {
            this.$emit('update:selectedLocation', this.selectedLocation);
        }
    }
};
</script>


<style>
.location-selector {
    position: relative;
    /* margin-bottom: 16px; */
}

.location-select {
    width: 100%;
    padding: 14px 40px 14px 12px;
    border: 1px solid var(--border-color);
    border-radius: 16px;
    font-size: 16px;
    appearance: none;
    background-color: var(--bg-container);
    color: var(--text-primary);
    min-width: 120px;
}

.location-select:disabled {
    background-color: var(--disabled-bg);
    cursor: not-allowed;
}

.location-icon {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
}
</style>
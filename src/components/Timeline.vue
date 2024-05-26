<template>
    <nav class="is-primary panel">
        <span class="panel-tabs">
            <a v-for="period of periods" :key="period" @click="selectPeriod(period)" 
            :class="{ 'is-active': period === selectedPeriod}">{{ period }}</a>
        </span>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const periods = ["Today", "This week", "This month"] as const
type Period = typeof periods[number]

const selectedPeriod = ref<Period>("Today")

function selectPeriod(period: Period) {
    selectedPeriod.value = period
}
</script>

<style scoped></style>
<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        @click="postStore.setSelectPeriod(period)"
        :class="{ 'is-active': period === postStore.selectedPeriod }"
        >{{ period }}</a
      >
    </span>
    <TimelineItem
      v-for="postItem of postStore.filteredPosts"
      :post="postItem"
      :key="postItem.id"
    ></TimelineItem>
  </nav>
</template>

<script setup lang="ts">
import TimelineItem from "./TimelineItem.vue";
import {usePosts} from '../stores/posts'
import { periods } from "../constant";

const postStore = usePosts()
postStore.fetchPosts()
</script>

<style scoped></style>

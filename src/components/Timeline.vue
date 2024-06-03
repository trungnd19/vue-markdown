<template>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        @click="selectPeriod(period)"
        :class="{ 'is-active': period === selectedPeriod }"
        >{{ period }}</a
      >
    </span>
    <TimelineItem
      v-for="postItem of posts"
      :post="postItem"
      :key="postItem.id"
    ></TimelineItem>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { TimelinePost, thisMonth, thisWeek, today } from "../posts";
import { DateTime } from "luxon";
import TimelineItem from "./TimelineItem.vue";

const periods = ["Today", "This week", "This month"] as const;
type Period = (typeof periods)[number];

const selectedPeriod = ref<Period>("Today");

function selectPeriod(period: Period) {
  selectedPeriod.value = period;
}

const posts = computed<TimelinePost[]>(() => {
  return [today, thisWeek, thisMonth]
    .map((post) => {
      return {
        ...post,
        created: DateTime.fromISO(post.created),
      };
    })
    .filter((post) => {
      if (selectedPeriod.value === "Today") {
        return post.created >= DateTime.now().minus({ day: 1 });
      }

      if (selectedPeriod.value === "This week") {
        return post.created >= DateTime.now().minus({ week: 1 });
      }

      return post;
    });
});
</script>

<style scoped></style>

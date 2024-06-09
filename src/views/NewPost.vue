<script setup lang="ts">
import { DateTime } from "luxon";
import PostWriter from "../components/PostWriter.vue"
import { TimelinePost } from "../posts";

const post: TimelinePost = {
    id: "-1",
    created: DateTime.now(),
    title: "New post",
    markdown: "##Title"
}

</script>
<template>
    <PostWriter :post="post"></PostWriter>
</template>
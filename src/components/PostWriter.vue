<script lang="ts" setup>
import { ref, onMounted, watch, watchEffect } from "vue";
import { Post, TimelinePost } from "../posts";
import { useRouter } from "vue-router"
import { marked } from "marked";
import highlightjs from "highlight.js";
import debounce from "lodash/debounce";
import { usePosts } from "../stores/posts";

const props = defineProps<{
  post: TimelinePost | Post;
}>();

const emit = defineEmits<{
  (event: "submit", post: Post): void;
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref("");
const contentEditable = ref<HTMLDivElement>();

const posts = usePosts();
const router = useRouter();

function parseHtml(markdown: string) {
  marked.parse(
    markdown,
    {
      gfm: true,
      breaks: true,
      highlight: (code) => {
        return highlightjs.highlightAll();
      }
    },
    (err, parseResult) => {
      html.value = parseResult;
    }
  );
}

watch(
  content,
  debounce((newContent) => {
    parseHtml(newContent);
  }, 250),
  {
    immediate: true
  }
);

onMounted(() => {
  if (!contentEditable.value) {
    throw Error("ContentEditable DOM node was not found");
  }
  contentEditable.value.innerText = content.value;
});

function handleInput() {
  if (!contentEditable.value) {
    throw Error("ContentEditable DOM node was not found");
  }
  content.value = contentEditable.value.innerText;
}

async function handleClick() {
  const newPost: TimelinePost = {
    ...props.post,
    title: title.value,
    markdown: content.value,
    html: html.value
  };
  await posts.createPost(newPost)
  router.push("/")
}
</script>

<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input
          v-model="title"
          type="text"
          class="input" />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div
        ref="contentEditable"
        contenteditable
        @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button
        class="button is-primary is-pulled-right"
        @click="handleClick">
        Save Post
      </button>
    </div>
  </div>
</template>
import { defineStore } from "pinia";
import { reactive, readonly } from "vue";
import { Post, TimelinePost, thisMonth, thisWeek, today } from "../posts";
import { Period } from "../constant";
import { DateTime } from "luxon";

interface PostState {
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
}

// class PostsStore {
//     #state: PostState;
//     constructor() {
//         this.#state = reactive<PostState>({
//             foo: 'foo'
//         })
//     }

//     updateState(val: string) {
//         this.#state.foo = val;
//     }

//     getState() {
//         return readonly(this.#state)
//     }
// }

// const store = new PostsStore()

// export function usePosts() {
//     return store
// }

function delay() {
  return new Promise<void>(res => setTimeout(res, 1500))
}

export const usePosts = defineStore("post", {
  state: (): PostState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: "Today",
  }),
  actions: {
    setSelectPeriod(period: Period) {
      this.selectedPeriod = period;
    },

    // keep business logic inside posts store instead of calling api in Timeline component
    async fetchPosts() {
      const res = await fetch("http://127.0.0.1:8000/posts");
      const data = (await res.json()) as Post[];
      await delay();

      let ids: string[] = [];
      let all: Map<string, Post> = new Map();
      for (const post of data) {
        ids.push(post.id);
        all.set(post.id, post);
      }

      this.ids = ids;
      this.all = all;
    },

    async createPost(post: TimelinePost) {
      const body = JSON.stringify({...post, created: post.created.toISO()})
      
      return fetch("http://127.0.0.1:8000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: body
      });
    }
  },
  // get new state based on existing state, state param = store states
  getters: {
    filteredPosts: (state): TimelinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id);

          if (!post) {
            throw new Error("Post not found");
          }

          return {
            ...post,
            created: DateTime.fromISO(post.created),
          };
        })
        .filter((post) => {
          if (state.selectedPeriod === "Today") {
            return post.created >= DateTime.now().minus({ day: 1 });
          }

          if (state.selectedPeriod === "This week") {
            return post.created >= DateTime.now().minus({ week: 1 });
          }

          return post;
        });
    },
  },
});

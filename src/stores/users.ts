import { defineStore } from "pinia";
import { reactive, readonly } from "vue";
import { Post, TimelinePost, thisMonth, thisWeek, today } from "../posts";
import { Period } from "../constant";
import { DateTime } from "luxon";
import { NewUser } from "../users";

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

export const useUsers = defineStore("users", {
  state: (): PostState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: "Today",
  }),

  actions: {
    async createUser(newUser: NewUser) {
      const body = JSON.stringify(newUser)
      
      return fetch("http://127.0.0.1:8000/users", {
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

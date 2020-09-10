import { ActionTree, Store } from "vuex";
import { ActionContext } from "vuex/types";
import { Context } from "@nuxt/types";
import { auth } from "@/store/auth"

// RootStateを追加
export const state = () => ({});
export type RootState = ReturnType<typeof state>;

// const initializer = (store: Store<any>) => auth.initModule();
// export const plugins = [initializer];

// Rootのactionsを追加
export const actions: ActionTree<any, any> = {
  nuxtServerInit: async (
    context: ActionContext<RootState, RootState>,
    server: Context
  ) => {
    // auth.initModule();
  }
};

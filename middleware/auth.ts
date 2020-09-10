import { Middleware } from '@nuxt/types';
import { auth } from '@/store/auth';

// 認証チェック対象外のパス
const targetPath:string[] = ["index", "register"]

const middleware:Middleware = ({ route, store, redirect }) => {
  if (auth.user != null) {
    return
  }
  if(targetPath.indexOf(route.name || "") == -1){
    redirect('/', {"page": route.name || ""})
  }
}
export default middleware

/**
 * チャットAPI通信用インターフェイス
 */
export interface Chat {
  id: string,
  email: string,
  name: UserName,
  text: string
}

/**
 * チャット画面出力用インターフェイス
 */
export interface ChatLayout extends Chat{
  line: Line | null,
  space: Space | null
}

/**
 * 背景用
 * インターフェイス
 */
interface Line {
  "clip-path": string
}

/**
 * 背景用
 * インターフェイス
 */
interface Space {
  "margin-left": string,
  "margin-top": string
}

/**
 * ユーザ情報
 */
interface UserName {
  last: string
}

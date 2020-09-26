import firebase from '@/plugins/firebase';
import { Room } from '@/interfaces/Room';
import { Chat } from '@/interfaces/Chat';

let db = firebase.firestore();

export function addRoom(form: Room) {
  return db.collection("rooms").add( form )
}

export function updateChatLog(id: string, chatLogs: Chat[]) {
  return db.collection("rooms").doc(id).update( { "chatLog": chatLogs } )
}

export async function roomDetail(id: string): Promise<Room> {
  return await db.collection("rooms").doc(id).get().then(res => {
    return res.data() as Room
  })
}

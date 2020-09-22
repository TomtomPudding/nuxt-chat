import { Chat } from '@/interfaces/Chat'

export interface Room {
  id: string | null;
  name: string;
  photoURL: string;
  members: string[];
  chatLog: Chat[];
}

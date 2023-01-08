export interface Message {
  message: string;
  sender: MessageSender;
  receiver?: string;
  timestamp: number;
}

export interface MessageSender {
  id: string;
  name: string;
  avatar: string;
}

export const DEFAULT_CHAT_MODEL: string = 'chat-model';

export interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const chatModels: Array<ChatModel> = [
  {
    id: 'chat-model',
    name: '会话模型',
    description: '通用会话大模型',
  },
  {
    id: 'chat-model-reasoning',
    name: '推理模型',
    description: '先进推理大模型',
  },
];

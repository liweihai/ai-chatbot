import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from 'ai';
import { createOpenAICompatible } from '@ai-sdk/openai-compatible';
import {
  artifactModel,
  chatModel,
  reasoningModel,
  titleModel,
} from './models.test';
import { isTestEnvironment } from '../constants';

const provider = createOpenAICompatible({
  name: 'provider',
  apiKey: process.env.GLM4_API_KEY,
  baseURL: process.env.GLM4_BASE_URL,
  queryParams: {
    'api-version': '1.0.0',
  },
});

export const myProvider = isTestEnvironment
  ? customProvider({
      languageModels: {
        'chat-model': chatModel,
        'chat-model-reasoning': reasoningModel,
        'title-model': titleModel,
        'artifact-model': artifactModel,
      },
    })
  : customProvider({
      languageModels: {
        'chat-model': provider('glm-4-flash-250414'),
        'chat-model-reasoning': wrapLanguageModel({
          model: provider('glm-4-flash-250414'),
          middleware: extractReasoningMiddleware({ tagName: 'think' }),
        }),
        'title-model': provider('glm-4-flash-250414'),
        'artifact-model': provider('glm-4-flash-250414'),
      },
      imageModels: {
        'small-model': provider.imageModel('glm-4-flash-250414'),
      },
    });

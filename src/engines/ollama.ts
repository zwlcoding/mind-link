import { Ollama } from 'ollama/browser';



export const OLLAMA_BASE_URL = import.meta.env.PUBLIC_OLLAMA_BASE_URL || 'http://127.0.0.1:11434';

const customFetch = (input: RequestInfo | URL, init?: RequestInit) => {
  return fetch(input, {
    mode: 'cors',
    ...init,
  });
};

export const ollama = new Ollama({
  host: OLLAMA_BASE_URL,
  fetch: customFetch,
  headers: {
    'x-ollama-token': import.meta.env.PUBLIC_OLLAMA_HEADER_TOKEN || ''
  },
});

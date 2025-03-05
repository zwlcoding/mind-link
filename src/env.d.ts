/// <reference types="@rsbuild/core/types" />

interface ImportMetaEnv {
  // import.meta.env.PUBLIC_FOO
  readonly OLLAMA_BASE_URL: string;
  readonly OLLAMA_HEADER_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

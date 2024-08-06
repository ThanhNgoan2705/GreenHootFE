/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly IP_HOST: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
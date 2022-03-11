/// <reference types="node" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly GRAPH_CMS_API_KEY: string;
    }
}
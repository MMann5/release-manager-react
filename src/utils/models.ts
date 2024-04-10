export interface GlobalConfig {
  envs: string[];
  repos: string[];
  columns: string[];
}

export interface Config {
  env: string;
  repo: string;
  columns: string[];
}

export interface Data {
  repo_manager: string;
  commit: string;
  created_at: string;
  created_by: string;
  env: string;
  ref: string;
  remoteUrl: string;
  repository: string;
  tag: string;
  version: string;
  description: string;
}

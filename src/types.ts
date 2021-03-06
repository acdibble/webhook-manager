interface GithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface GithubRepository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: GithubUser;
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: string | null;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

type WebhookEvent = 'check_run'
| 'check_suite'
| 'create'
| 'delete'
| 'deployment'
| 'deployment_status'
| 'fork'
| 'gollum'
| 'issues'
| 'issue_comment'
| 'label'
| 'milestone'
| 'page_build'
| 'project'
| 'project_card'
| 'project_column'
| 'public'
| 'pull_request'
| 'pull_request_review'
| 'pull_request_review_comment'
| 'push'
| 'registry_package'
| 'release'
| 'repository'
| 'repository_dispatch'
| 'status'
| 'watch';

export interface WebhookPayload {
  zen: string;
  hook_id: number;
  hook: {
    type: string;
    id: number;
    name: string;
    active: boolean;
    events: WebhookEvent[];
    config: {
      content_type: string;
      insecure_ssl: string;
      secret: string;
      url: string;
    };
    updated_at: string;
    created_at: string;
    url: string;
    test_url: string;
    ping_url: string;
    last_response: {
      code: number | null;
      status: string;
      message: string | null;
    };
  };
  repository: GithubRepository;
  sender: GithubUser;
}

type Permission = 'read' | 'write';

interface Commit {
  id: string;
  tree_id: string;
  message: string;
  timestamp: string;
  author: {
    name: string;
    email: string;
  };
  committer: {
    name: string;
    email: string;
  };
}

export interface CheckSuitePayload {
  action: 'completed' | 'queued';
  check_suite: {
    id: 538695795;
    node_id: string;
    head_branch: string;
    head_sha: string;
    status: 'completed' | 'queued';
    conclusion: 'success';
    url: string;
    before: string;
    after: string;
    pull_requests: [];
    app: {
      id: number;
      slug: string;
      node_id: string;
      owner: GithubUser;
      name: string;
      description: string;
      external_url: string;
      html_url: string;
      created_at: string;
      updated_at: string;
      permissions: {
        actions: Permission;
        checks: Permission;
        contents: Permission;
        deployments: Permission;
        issues: Permission;
        metadata: Permission;
        packages: Permission;
        pages: Permission;
        pull_requests: Permission;
        repository_hooks: Permission;
        repository_projects: Permission;
        statuses: Permission;
        vulnerability_alerts: Permission;
      };
      events: WebhookEvent[];
    };
    created_at: string;
    updated_at: string;
    latest_check_runs_count: number;
    check_runs_url: string;
    head_commit: Commit;
  };
  repository: GithubRepository;
  sender: GithubUser;
}

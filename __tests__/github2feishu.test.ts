import { expect } from "@jest/globals";

import * as core from "@actions/core";
import { context } from "@actions/github";
import * as main from "../src/github2feishu";
import * as dotenv from "dotenv";

dotenv.config({ path: [".env.local"] });

const runMock = jest.spyOn(main, "PostGithubEvent");

// Mock the GitHub Actions core library
let debugMock: jest.SpiedFunction<typeof core.debug>;
let errorMock: jest.SpiedFunction<typeof core.error>;
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>;
let setOutputMock: jest.SpiedFunction<typeof core.setOutput>;

describe("events and actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Set the action's inputs as return values from core.getInput()

    debugMock = jest.spyOn(core, "debug").mockImplementation();
    errorMock = jest.spyOn(core, "error").mockImplementation();
  });
  /*
  it("push event", async () => {
    const pushevent = {
      after: "dc9af660f53062cb275dbe7912730256ce7c65c0",
      base_ref: null,
      before: "775ae3d16b63e139bf86c921452ecbf99920e332",
      commits: [
        {
          author: {
            email: "wan.junjie@foxmail.com",
            name: "junka",
            username: "junka",
          },
          committer: {
            email: "wan.junjie@foxmail.com",
            name: "junka",
            username: "junka",
          },
          distinct: true,
          id: "dc9af660f53062cb275dbe7912730256ce7c65c0",
          message:
            "slow down the wakatime\n\nSigned-off-by: junka <wan.junjie@foxmail.com>",
          timestamp: "2024-05-20T21:12:42+08:00",
          tree_id: "861060d83ecb9c1c7d0fff6c8fe006fad2344647",
          url: "https://github.com/junka/junka/commit/dc9af660f53062cb275dbe7912730256ce7c65c0",
        },
      ],
      compare:
        "https://github.com/junka/junka/compare/775ae3d16b63...dc9af660f530",
      created: false,
      deleted: false,
      forced: true,
      head_commit: {
        author: {
          email: "wan.junjie@foxmail.com",
          name: "junka",
          username: "junka",
        },
        committer: {
          email: "wan.junjie@foxmail.com",
          name: "junka",
          username: "junka",
        },
        distinct: true,
        id: "dc9af660f53062cb275dbe7912730256ce7c65c0",
        message:
          "slow down the wakatime\n\nSigned-off-by: junka <wan.junjie@foxmail.com>",
        timestamp: "2024-05-20T21:12:42+08:00",
        tree_id: "861060d83ecb9c1c7d0fff6c8fe006fad2344647",
        url: "https://github.com/junka/junka/commit/dc9af660f53062cb275dbe7912730256ce7c65c0",
      },
      pusher: { email: "wan.junjie@foxmail.com", name: "junka" },
      ref: "refs/heads/main",
      repository: {
        allow_forking: true,
        archive_url:
          "https://api.github.com/repos/junka/junka/{archive_format}{/ref}",
        archived: false,
        assignees_url:
          "https://api.github.com/repos/junka/junka/assignees{/user}",
        blobs_url: "https://api.github.com/repos/junka/junka/git/blobs{/sha}",
        branches_url:
          "https://api.github.com/repos/junka/junka/branches{/branch}",
        clone_url: "https://github.com/junka/junka.git",
        collaborators_url:
          "https://api.github.com/repos/junka/junka/collaborators{/collaborator}",
        comments_url:
          "https://api.github.com/repos/junka/junka/comments{/number}",
        commits_url: "https://api.github.com/repos/junka/junka/commits{/sha}",
        compare_url:
          "https://api.github.com/repos/junka/junka/compare/{base}...{head}",
        contents_url:
          "https://api.github.com/repos/junka/junka/contents/{+path}",
        contributors_url:
          "https://api.github.com/repos/junka/junka/contributors",
        created_at: 1668054255,
        default_branch: "main",
        deployments_url: "https://api.github.com/repos/junka/junka/deployments",
        description: "Config files for my GitHub profile.",
        disabled: false,
        downloads_url: "https://api.github.com/repos/junka/junka/downloads",
        events_url: "https://api.github.com/repos/junka/junka/events",
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: "https://api.github.com/repos/junka/junka/forks",
        full_name: "junka/junka",
        git_commits_url:
          "https://api.github.com/repos/junka/junka/git/commits{/sha}",
        git_refs_url: "https://api.github.com/repos/junka/junka/git/refs{/sha}",
        git_tags_url: "https://api.github.com/repos/junka/junka/git/tags{/sha}",
        git_url: "git://github.com/junka/junka.git",
        has_discussions: false,
        has_downloads: true,
        has_issues: false,
        has_pages: false,
        has_projects: true,
        has_wiki: false,
        homepage: "https://github.com/junka",
        hooks_url: "https://api.github.com/repos/junka/junka/hooks",
        html_url: "https://github.com/junka/junka",
        id: 564141524,
        is_template: false,
        issue_comment_url:
          "https://api.github.com/repos/junka/junka/issues/comments{/number}",
        issue_events_url:
          "https://api.github.com/repos/junka/junka/issues/events{/number}",
        issues_url: "https://api.github.com/repos/junka/junka/issues{/number}",
        keys_url: "https://api.github.com/repos/junka/junka/keys{/key_id}",
        labels_url: "https://api.github.com/repos/junka/junka/labels{/name}",
        language: null,
        languages_url: "https://api.github.com/repos/junka/junka/languages",
        license: null,
        master_branch: "main",
        merges_url: "https://api.github.com/repos/junka/junka/merges",
        milestones_url:
          "https://api.github.com/repos/junka/junka/milestones{/number}",
        mirror_url: null,
        name: "junka",
        node_id: "R_kgDOIaAd1A",
        notifications_url:
          "https://api.github.com/repos/junka/junka/notifications{?since,all,participating}",
        open_issues: 0,
        open_issues_count: 0,
        owner: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          email: "wan.junjie@foxmail.com",
          events_url: "https://api.github.com/users/junka/events{/privacy}",
          followers_url: "https://api.github.com/users/junka/followers",
          following_url:
            "https://api.github.com/users/junka/following{/other_user}",
          gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/junka",
          id: 2344498,
          login: "junka",
          name: "junka",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/junka/orgs",
          received_events_url:
            "https://api.github.com/users/junka/received_events",
          repos_url: "https://api.github.com/users/junka/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/junka/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/junka/subscriptions",
          type: "User",
          url: "https://api.github.com/users/junka",
        },
        private: false,
        pulls_url: "https://api.github.com/repos/junka/junka/pulls{/number}",
        pushed_at: 1716210766,
        releases_url: "https://api.github.com/repos/junka/junka/releases{/id}",
        size: 33,
        ssh_url: "git@github.com:junka/junka.git",
        stargazers: 0,
        stargazers_count: 0,
        stargazers_url: "https://api.github.com/repos/junka/junka/stargazers",
        statuses_url: "https://api.github.com/repos/junka/junka/statuses/{sha}",
        subscribers_url: "https://api.github.com/repos/junka/junka/subscribers",
        subscription_url:
          "https://api.github.com/repos/junka/junka/subscription",
        svn_url: "https://github.com/junka/junka",
        tags_url: "https://api.github.com/repos/junka/junka/tags",
        teams_url: "https://api.github.com/repos/junka/junka/teams",
        topics: ["config", "github-config"],
        trees_url: "https://api.github.com/repos/junka/junka/git/trees{/sha}",
        updated_at: "2024-05-20T13:03:53Z",
        url: "https://github.com/junka/junka",
        visibility: "public",
        watchers: 0,
        watchers_count: 0,
        web_commit_signoff_required: false,
      },
      sender: {
        avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
        events_url: "https://api.github.com/users/junka/events{/privacy}",
        followers_url: "https://api.github.com/users/junka/followers",
        following_url:
          "https://api.github.com/users/junka/following{/other_user}",
        gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
        gravatar_id: "",
        html_url: "https://github.com/junka",
        id: 2344498,
        login: "junka",
        node_id: "MDQ6VXNlcjIzNDQ0OTg=",
        organizations_url: "https://api.github.com/users/junka/orgs",
        received_events_url:
          "https://api.github.com/users/junka/received_events",
        repos_url: "https://api.github.com/users/junka/repos",
        site_admin: false,
        starred_url:
          "https://api.github.com/users/junka/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/junka/subscriptions",
        type: "User",
        url: "https://api.github.com/users/junka",
      },
    };

    jest.replaceProperty(context, "payload", pushevent);
    jest.replaceProperty(context, "eventName", "push");
    jest.replaceProperty(context, "actor", "somebody");

    const resp = await main.PostGithubEvent();
    expect(runMock).toHaveReturned();
    expect(resp).toEqual(200);
    expect(debugMock).toHaveBeenNthCalledWith(1, 0);
    expect(debugMock).toHaveBeenNthCalledWith(2, "success");

    expect(errorMock).not.toHaveBeenCalled();
  });

  it("schedule event", async () => {
    const scheduleevent = {
      repository: {
        allow_forking: true,
        archive_url:
          "https://api.github.com/repos/junka/junka/{archive_format}{/ref}",
        archived: false,
        assignees_url:
          "https://api.github.com/repos/junka/junka/assignees{/user}",
        blobs_url: "https://api.github.com/repos/junka/junka/git/blobs{/sha}",
        branches_url:
          "https://api.github.com/repos/junka/junka/branches{/branch}",
        clone_url: "https://github.com/junka/junka.git",
        collaborators_url:
          "https://api.github.com/repos/junka/junka/collaborators{/collaborator}",
        comments_url:
          "https://api.github.com/repos/junka/junka/comments{/number}",
        commits_url: "https://api.github.com/repos/junka/junka/commits{/sha}",
        compare_url:
          "https://api.github.com/repos/junka/junka/compare/{base}...{head}",
        contents_url:
          "https://api.github.com/repos/junka/junka/contents/{+path}",
        contributors_url:
          "https://api.github.com/repos/junka/junka/contributors",
        created_at: "2022-11-10T04:24:15Z",
        default_branch: "main",
        deployments_url: "https://api.github.com/repos/junka/junka/deployments",
        description: "Config files for my GitHub profile.",
        disabled: false,
        downloads_url: "https://api.github.com/repos/junka/junka/downloads",
        events_url: "https://api.github.com/repos/junka/junka/events",
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: "https://api.github.com/repos/junka/junka/forks",
        full_name: "junka/junka",
        git_commits_url:
          "https://api.github.com/repos/junka/junka/git/commits{/sha}",
        git_refs_url: "https://api.github.com/repos/junka/junka/git/refs{/sha}",
        git_tags_url: "https://api.github.com/repos/junka/junka/git/tags{/sha}",
        git_url: "git://github.com/junka/junka.git",
        has_discussions: false,
        has_downloads: true,
        has_issues: false,
        has_pages: false,
        has_projects: true,
        has_wiki: false,
        homepage: "https://github.com/junka",
        hooks_url: "https://api.github.com/repos/junka/junka/hooks",
        html_url: "https://github.com/junka/junka",
        id: 564141524,
        is_template: false,
        issue_comment_url:
          "https://api.github.com/repos/junka/junka/issues/comments{/number}",
        issue_events_url:
          "https://api.github.com/repos/junka/junka/issues/events{/number}",
        issues_url: "https://api.github.com/repos/junka/junka/issues{/number}",
        keys_url: "https://api.github.com/repos/junka/junka/keys{/key_id}",
        labels_url: "https://api.github.com/repos/junka/junka/labels{/name}",
        language: null,
        languages_url: "https://api.github.com/repos/junka/junka/languages",
        license: null,
        merges_url: "https://api.github.com/repos/junka/junka/merges",
        milestones_url:
          "https://api.github.com/repos/junka/junka/milestones{/number}",
        mirror_url: null,
        name: "junka",
        node_id: "R_kgDOIaAd1A",
        notifications_url:
          "https://api.github.com/repos/junka/junka/notifications{?since,all,participating}",
        open_issues: 0,
        open_issues_count: 0,
        owner: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/junka/events{/privacy}",
          followers_url: "https://api.github.com/users/junka/followers",
          following_url:
            "https://api.github.com/users/junka/following{/other_user}",
          gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/junka",
          id: 2344498,
          login: "junka",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/junka/orgs",
          received_events_url:
            "https://api.github.com/users/junka/received_events",
          repos_url: "https://api.github.com/users/junka/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/junka/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/junka/subscriptions",
          type: "User",
          url: "https://api.github.com/users/junka",
        },
        private: false,
        pulls_url: "https://api.github.com/repos/junka/junka/pulls{/number}",
        pushed_at: "2024-05-20T02:50:41Z",
        releases_url: "https://api.github.com/repos/junka/junka/releases{/id}",
        size: 33,
        ssh_url: "git@github.com:junka/junka.git",
        stargazers_count: 0,
        stargazers_url: "https://api.github.com/repos/junka/junka/stargazers",
        statuses_url: "https://api.github.com/repos/junka/junka/statuses/{sha}",
        subscribers_url: "https://api.github.com/repos/junka/junka/subscribers",
        subscription_url:
          "https://api.github.com/repos/junka/junka/subscription",
        svn_url: "https://github.com/junka/junka",
        tags_url: "https://api.github.com/repos/junka/junka/tags",
        teams_url: "https://api.github.com/repos/junka/junka/teams",
        topics: ["config", "github-config"],
        trees_url: "https://api.github.com/repos/junka/junka/git/trees{/sha}",
        updated_at: "2024-05-20T02:50:44Z",
        url: "https://api.github.com/repos/junka/junka",
        visibility: "public",
        watchers: 0,
        watchers_count: 0,
        web_commit_signoff_required: false,
      },
      schedule: "30 8 * * *",
      workflow: ".github/workflows/feishubot.yml",
    };

    jest.replaceProperty(context, "payload", scheduleevent);
    jest.replaceProperty(context, "eventName", "schedule");

    const resp = await main.PostGithubEvent();
    expect(runMock).toHaveReturned();
    expect(resp).toEqual(200);
    expect(debugMock).toHaveBeenNthCalledWith(1, 0);
    expect(debugMock).toHaveBeenNthCalledWith(2, "success");

    expect(errorMock).not.toHaveBeenCalled();
  });

  it("watch event", async () => {
    const watchevent = {
      action: "started",
      repository: {
        allow_forking: true,
        archive_url:
          "https://api.github.com/repos/junka/junka/{archive_format}{/ref}",
        archived: false,
        assignees_url:
          "https://api.github.com/repos/junka/junka/assignees{/user}",
        blobs_url: "https://api.github.com/repos/junka/junka/git/blobs{/sha}",
        branches_url:
          "https://api.github.com/repos/junka/junka/branches{/branch}",
        clone_url: "https://github.com/junka/junka.git",
        collaborators_url:
          "https://api.github.com/repos/junka/junka/collaborators{/collaborator}",
        comments_url:
          "https://api.github.com/repos/junka/junka/comments{/number}",
        commits_url: "https://api.github.com/repos/junka/junka/commits{/sha}",
        compare_url:
          "https://api.github.com/repos/junka/junka/compare/{base}...{head}",
        contents_url:
          "https://api.github.com/repos/junka/junka/contents/{+path}",
        contributors_url:
          "https://api.github.com/repos/junka/junka/contributors",
        created_at: "2022-11-10T04:24:15Z",
        default_branch: "main",
        deployments_url: "https://api.github.com/repos/junka/junka/deployments",
        description: "Config files for my GitHub profile.",
        disabled: false,
        downloads_url: "https://api.github.com/repos/junka/junka/downloads",
        events_url: "https://api.github.com/repos/junka/junka/events",
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: "https://api.github.com/repos/junka/junka/forks",
        full_name: "junka/junka",
        git_commits_url:
          "https://api.github.com/repos/junka/junka/git/commits{/sha}",
        git_refs_url: "https://api.github.com/repos/junka/junka/git/refs{/sha}",
        git_tags_url: "https://api.github.com/repos/junka/junka/git/tags{/sha}",
        git_url: "git://github.com/junka/junka.git",
        has_discussions: false,
        has_downloads: true,
        has_issues: false,
        has_pages: false,
        has_projects: true,
        has_wiki: false,
        homepage: "https://github.com/junka",
        hooks_url: "https://api.github.com/repos/junka/junka/hooks",
        html_url: "https://github.com/junka/junka",
        id: 564141524,
        is_template: false,
        issue_comment_url:
          "https://api.github.com/repos/junka/junka/issues/comments{/number}",
        issue_events_url:
          "https://api.github.com/repos/junka/junka/issues/events{/number}",
        issues_url: "https://api.github.com/repos/junka/junka/issues{/number}",
        keys_url: "https://api.github.com/repos/junka/junka/keys{/key_id}",
        labels_url: "https://api.github.com/repos/junka/junka/labels{/name}",
        language: null,
        languages_url: "https://api.github.com/repos/junka/junka/languages",
        license: null,
        merges_url: "https://api.github.com/repos/junka/junka/merges",
        milestones_url:
          "https://api.github.com/repos/junka/junka/milestones{/number}",
        mirror_url: null,
        name: "junka",
        node_id: "R_kgDOIaAd1A",
        notifications_url:
          "https://api.github.com/repos/junka/junka/notifications{?since,all,participating}",
        open_issues: 0,
        open_issues_count: 0,
        owner: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/junka/events{/privacy}",
          followers_url: "https://api.github.com/users/junka/followers",
          following_url:
            "https://api.github.com/users/junka/following{/other_user}",
          gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/junka",
          id: 2344498,
          login: "junka",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/junka/orgs",
          received_events_url:
            "https://api.github.com/users/junka/received_events",
          repos_url: "https://api.github.com/users/junka/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/junka/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/junka/subscriptions",
          type: "User",
          url: "https://api.github.com/users/junka",
        },
        private: false,
        pulls_url: "https://api.github.com/repos/junka/junka/pulls{/number}",
        pushed_at: "2024-05-21T03:07:32Z",
        releases_url: "https://api.github.com/repos/junka/junka/releases{/id}",
        size: 29,
        ssh_url: "git@github.com:junka/junka.git",
        stargazers_count: 1,
        stargazers_url: "https://api.github.com/repos/junka/junka/stargazers",
        statuses_url: "https://api.github.com/repos/junka/junka/statuses/{sha}",
        subscribers_url: "https://api.github.com/repos/junka/junka/subscribers",
        subscription_url:
          "https://api.github.com/repos/junka/junka/subscription",
        svn_url: "https://github.com/junka/junka",
        tags_url: "https://api.github.com/repos/junka/junka/tags",
        teams_url: "https://api.github.com/repos/junka/junka/teams",
        topics: ["config", "github-config"],
        trees_url: "https://api.github.com/repos/junka/junka/git/trees{/sha}",
        updated_at: "2024-05-21T13:37:36Z",
        url: "https://api.github.com/repos/junka/junka",
        visibility: "public",
        watchers: 1,
        watchers_count: 1,
        web_commit_signoff_required: false,
      },
      sender: {
        avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
        events_url: "https://api.github.com/users/junka/events{/privacy}",
        followers_url: "https://api.github.com/users/junka/followers",
        following_url:
          "https://api.github.com/users/junka/following{/other_user}",
        gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
        gravatar_id: "",
        html_url: "https://github.com/junka",
        id: 2344498,
        login: "junka",
        node_id: "MDQ6VXNlcjIzNDQ0OTg=",
        organizations_url: "https://api.github.com/users/junka/orgs",
        received_events_url:
          "https://api.github.com/users/junka/received_events",
        repos_url: "https://api.github.com/users/junka/repos",
        site_admin: false,
        starred_url:
          "https://api.github.com/users/junka/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/junka/subscriptions",
        type: "User",
        url: "https://api.github.com/users/junka",
      },
    };

    jest.replaceProperty(context, "payload", watchevent);
    jest.replaceProperty(context, "eventName", "watch");

    const resp = await main.PostGithubEvent();
    expect(runMock).toHaveReturned();
    expect(resp).toEqual(200);
    expect(debugMock).toHaveBeenNthCalledWith(1, 0);
    expect(debugMock).toHaveBeenNthCalledWith(2, "success");

    expect(errorMock).not.toHaveBeenCalled();
  });

  it("release event", async () => {
    const releaseevent = {
      action: "published",
      release: {
        assets: [],
        assets_url:
          "https://api.github.com/repos/junka/junka/releases/156695832/assets",
        author: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/junka/events{/privacy}",
          followers_url: "https://api.github.com/users/junka/followers",
          following_url:
            "https://api.github.com/users/junka/following{/other_user}",
          gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/junka",
          id: 2344498,
          login: "junka",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/junka/orgs",
          received_events_url:
            "https://api.github.com/users/junka/received_events",
          repos_url: "https://api.github.com/users/junka/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/junka/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/junka/subscriptions",
          type: "User",
          url: "https://api.github.com/users/junka",
        },
        body: "",
        created_at: "2024-05-21T03:07:32Z",
        draft: false,
        html_url: "https://github.com/junka/junka/releases/tag/v1.0.0",
        id: 156695832,
        name: "test release",
        node_id: "RE_kwDOIaAd1M4JVv0Y",
        prerelease: false,
        published_at: "2024-05-21T13:45:34Z",
        tag_name: "v1.0.0",
        tarball_url: "https://api.github.com/repos/junka/junka/tarball/v1.0.0",
        target_commitish: "main",
        upload_url:
          "https://uploads.github.com/repos/junka/junka/releases/156695832/assets{?name,label}",
        url: "https://api.github.com/repos/junka/junka/releases/156695832",
        zipball_url: "https://api.github.com/repos/junka/junka/zipball/v1.0.0",
      },
      repository: {
        allow_forking: true,
        archive_url:
          "https://api.github.com/repos/junka/junka/{archive_format}{/ref}",
        archived: false,
        assignees_url:
          "https://api.github.com/repos/junka/junka/assignees{/user}",
        blobs_url: "https://api.github.com/repos/junka/junka/git/blobs{/sha}",
        branches_url:
          "https://api.github.com/repos/junka/junka/branches{/branch}",
        clone_url: "https://github.com/junka/junka.git",
        collaborators_url:
          "https://api.github.com/repos/junka/junka/collaborators{/collaborator}",
        comments_url:
          "https://api.github.com/repos/junka/junka/comments{/number}",
        commits_url: "https://api.github.com/repos/junka/junka/commits{/sha}",
        compare_url:
          "https://api.github.com/repos/junka/junka/compare/{base}...{head}",
        contents_url:
          "https://api.github.com/repos/junka/junka/contents/{+path}",
        contributors_url:
          "https://api.github.com/repos/junka/junka/contributors",
        created_at: "2022-11-10T04:24:15Z",
        default_branch: "main",
        deployments_url: "https://api.github.com/repos/junka/junka/deployments",
        description: "Config files for my GitHub profile.",
        disabled: false,
        downloads_url: "https://api.github.com/repos/junka/junka/downloads",
        events_url: "https://api.github.com/repos/junka/junka/events",
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: "https://api.github.com/repos/junka/junka/forks",
        full_name: "junka/junka",
        git_commits_url:
          "https://api.github.com/repos/junka/junka/git/commits{/sha}",
        git_refs_url: "https://api.github.com/repos/junka/junka/git/refs{/sha}",
        git_tags_url: "https://api.github.com/repos/junka/junka/git/tags{/sha}",
        git_url: "git://github.com/junka/junka.git",
        has_discussions: false,
        has_downloads: true,
        has_issues: false,
        has_pages: false,
        has_projects: true,
        has_wiki: false,
        homepage: "https://github.com/junka",
        hooks_url: "https://api.github.com/repos/junka/junka/hooks",
        html_url: "https://github.com/junka/junka",
        id: 564141524,
        is_template: false,
        issue_comment_url:
          "https://api.github.com/repos/junka/junka/issues/comments{/number}",
        issue_events_url:
          "https://api.github.com/repos/junka/junka/issues/events{/number}",
        issues_url: "https://api.github.com/repos/junka/junka/issues{/number}",
        keys_url: "https://api.github.com/repos/junka/junka/keys{/key_id}",
        labels_url: "https://api.github.com/repos/junka/junka/labels{/name}",
        language: null,
        languages_url: "https://api.github.com/repos/junka/junka/languages",
        license: null,
        merges_url: "https://api.github.com/repos/junka/junka/merges",
        milestones_url:
          "https://api.github.com/repos/junka/junka/milestones{/number}",
        mirror_url: null,
        name: "junka",
        node_id: "R_kgDOIaAd1A",
        notifications_url:
          "https://api.github.com/repos/junka/junka/notifications{?since,all,participating}",
        open_issues: 0,
        open_issues_count: 0,
        owner: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/junka/events{/privacy}",
          followers_url: "https://api.github.com/users/junka/followers",
          following_url:
            "https://api.github.com/users/junka/following{/other_user}",
          gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/junka",
          id: 2344498,
          login: "junka",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/junka/orgs",
          received_events_url:
            "https://api.github.com/users/junka/received_events",
          repos_url: "https://api.github.com/users/junka/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/junka/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/junka/subscriptions",
          type: "User",
          url: "https://api.github.com/users/junka",
        },
        private: false,
        pulls_url: "https://api.github.com/repos/junka/junka/pulls{/number}",
        pushed_at: "2024-05-21T03:07:32Z",
        releases_url: "https://api.github.com/repos/junka/junka/releases{/id}",
        size: 29,
        ssh_url: "git@github.com:junka/junka.git",
        stargazers_count: 0,
        stargazers_url: "https://api.github.com/repos/junka/junka/stargazers",
        statuses_url: "https://api.github.com/repos/junka/junka/statuses/{sha}",
        subscribers_url: "https://api.github.com/repos/junka/junka/subscribers",
        subscription_url:
          "https://api.github.com/repos/junka/junka/subscription",
        svn_url: "https://github.com/junka/junka",
        tags_url: "https://api.github.com/repos/junka/junka/tags",
        teams_url: "https://api.github.com/repos/junka/junka/teams",
        topics: ["config", "github-config"],
        trees_url: "https://api.github.com/repos/junka/junka/git/trees{/sha}",
        updated_at: "2024-05-21T13:42:17Z",
        url: "https://api.github.com/repos/junka/junka",
        visibility: "public",
        watchers: 0,
        watchers_count: 0,
        web_commit_signoff_required: false,
      },
      sender: {
        avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
        events_url: "https://api.github.com/users/junka/events{/privacy}",
        followers_url: "https://api.github.com/users/junka/followers",
        following_url:
          "https://api.github.com/users/junka/following{/other_user}",
        gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
        gravatar_id: "",
        html_url: "https://github.com/junka",
        id: 2344498,
        login: "junka",
        node_id: "MDQ6VXNlcjIzNDQ0OTg=",
        organizations_url: "https://api.github.com/users/junka/orgs",
        received_events_url:
          "https://api.github.com/users/junka/received_events",
        repos_url: "https://api.github.com/users/junka/repos",
        site_admin: false,
        starred_url:
          "https://api.github.com/users/junka/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/junka/subscriptions",
        type: "User",
        url: "https://api.github.com/users/junka",
      },
    };
    jest.replaceProperty(context, "payload", releaseevent);
    jest.replaceProperty(context, "eventName", "release");
    jest.replaceProperty(context, "actor", "somebody");

    const resp = await main.PostGithubEvent();
    expect(runMock).toHaveReturned();
    expect(resp).toEqual(200);
    expect(debugMock).toHaveBeenNthCalledWith(1, 0);
    expect(debugMock).toHaveBeenNthCalledWith(2, "success");

    expect(errorMock).not.toHaveBeenCalled();
  });

  it("delete event", async () => {
    const deleteevent = {
      pusher_type: "user",
      ref: "v1.0.0",
      ref_type: "tag",
      repository: {
        allow_forking: true,
        archive_url:
          "https://api.github.com/repos/junka/junka/{archive_format}{/ref}",
        archived: false,
        assignees_url:
          "https://api.github.com/repos/junka/junka/assignees{/user}",
        blobs_url: "https://api.github.com/repos/junka/junka/git/blobs{/sha}",
        branches_url:
          "https://api.github.com/repos/junka/junka/branches{/branch}",
        clone_url: "https://github.com/junka/junka.git",
        collaborators_url:
          "https://api.github.com/repos/junka/junka/collaborators{/collaborator}",
        comments_url:
          "https://api.github.com/repos/junka/junka/comments{/number}",
        commits_url: "https://api.github.com/repos/junka/junka/commits{/sha}",
        compare_url:
          "https://api.github.com/repos/junka/junka/compare/{base}...{head}",
        contents_url:
          "https://api.github.com/repos/junka/junka/contents/{+path}",
        contributors_url:
          "https://api.github.com/repos/junka/junka/contributors",
        created_at: "2022-11-10T04:24:15Z",
        default_branch: "main",
        deployments_url: "https://api.github.com/repos/junka/junka/deployments",
        description: "Config files for my GitHub profile.",
        disabled: false,
        downloads_url: "https://api.github.com/repos/junka/junka/downloads",
        events_url: "https://api.github.com/repos/junka/junka/events",
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: "https://api.github.com/repos/junka/junka/forks",
        full_name: "junka/junka",
        git_commits_url:
          "https://api.github.com/repos/junka/junka/git/commits{/sha}",
        git_refs_url: "https://api.github.com/repos/junka/junka/git/refs{/sha}",
        git_tags_url: "https://api.github.com/repos/junka/junka/git/tags{/sha}",
        git_url: "git://github.com/junka/junka.git",
        has_discussions: false,
        has_downloads: true,
        has_issues: false,
        has_pages: false,
        has_projects: true,
        has_wiki: false,
        homepage: "https://github.com/junka",
        hooks_url: "https://api.github.com/repos/junka/junka/hooks",
        html_url: "https://github.com/junka/junka",
        id: 564141524,
        is_template: false,
        issue_comment_url:
          "https://api.github.com/repos/junka/junka/issues/comments{/number}",
        issue_events_url:
          "https://api.github.com/repos/junka/junka/issues/events{/number}",
        issues_url: "https://api.github.com/repos/junka/junka/issues{/number}",
        keys_url: "https://api.github.com/repos/junka/junka/keys{/key_id}",
        labels_url: "https://api.github.com/repos/junka/junka/labels{/name}",
        language: null,
        languages_url: "https://api.github.com/repos/junka/junka/languages",
        license: null,
        merges_url: "https://api.github.com/repos/junka/junka/merges",
        milestones_url:
          "https://api.github.com/repos/junka/junka/milestones{/number}",
        mirror_url: null,
        name: "junka",
        node_id: "R_kgDOIaAd1A",
        notifications_url:
          "https://api.github.com/repos/junka/junka/notifications{?since,all,participating}",
        open_issues: 0,
        open_issues_count: 0,
        owner: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/junka/events{/privacy}",
          followers_url: "https://api.github.com/users/junka/followers",
          following_url:
            "https://api.github.com/users/junka/following{/other_user}",
          gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/junka",
          id: 2344498,
          login: "junka",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/junka/orgs",
          received_events_url:
            "https://api.github.com/users/junka/received_events",
          repos_url: "https://api.github.com/users/junka/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/junka/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/junka/subscriptions",
          type: "User",
          url: "https://api.github.com/users/junka",
        },
        private: false,
        pulls_url: "https://api.github.com/repos/junka/junka/pulls{/number}",
        pushed_at: "2024-05-21T16:46:23Z",
        releases_url: "https://api.github.com/repos/junka/junka/releases{/id}",
        size: 29,
        ssh_url: "git@github.com:junka/junka.git",
        stargazers_count: 0,
        stargazers_url: "https://api.github.com/repos/junka/junka/stargazers",
        statuses_url: "https://api.github.com/repos/junka/junka/statuses/{sha}",
        subscribers_url: "https://api.github.com/repos/junka/junka/subscribers",
        subscription_url:
          "https://api.github.com/repos/junka/junka/subscription",
        svn_url: "https://github.com/junka/junka",
        tags_url: "https://api.github.com/repos/junka/junka/tags",
        teams_url: "https://api.github.com/repos/junka/junka/teams",
        topics: ["config", "github-config"],
        trees_url: "https://api.github.com/repos/junka/junka/git/trees{/sha}",
        updated_at: "2024-05-21T13:42:17Z",
        url: "https://api.github.com/repos/junka/junka",
        visibility: "public",
        watchers: 0,
        watchers_count: 0,
        web_commit_signoff_required: false,
      },
      sender: {
        avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
        events_url: "https://api.github.com/users/junka/events{/privacy}",
        followers_url: "https://api.github.com/users/junka/followers",
        following_url:
          "https://api.github.com/users/junka/following{/other_user}",
        gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
        gravatar_id: "",
        html_url: "https://github.com/junka",
        id: 2344498,
        login: "junka",
        node_id: "MDQ6VXNlcjIzNDQ0OTg=",
        organizations_url: "https://api.github.com/users/junka/orgs",
        received_events_url:
          "https://api.github.com/users/junka/received_events",
        repos_url: "https://api.github.com/users/junka/repos",
        site_admin: false,
        starred_url:
          "https://api.github.com/users/junka/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/junka/subscriptions",
        type: "User",
        url: "https://api.github.com/users/junka",
      },
    };

    jest.replaceProperty(context, "payload", deleteevent);
    jest.replaceProperty(context, "eventName", "delete");
    jest.replaceProperty(context, "actor", "newbody");

    const resp = await main.PostGithubEvent();
    expect(runMock).toHaveReturned();
    expect(resp).toEqual(200);
    expect(debugMock).toHaveBeenNthCalledWith(1, 0);
    expect(debugMock).toHaveBeenNthCalledWith(2, "success");

    expect(errorMock).not.toHaveBeenCalled();
  });
  
    it("create event", async () => {
        const createevent = {
            description: 'Config files for my GitHub profile.',
            master_branch: 'main',
            pusher_type: 'user',
            ref: 'v1.0.0',
            ref_type: 'tag',
            repository: {
                allow_forking: true,
                archive_url: 'https://api.github.com/repos/junka/junka/{archive_format}{/ref}',
                archived: false,
                assignees_url: 'https://api.github.com/repos/junka/junka/assignees{/user}',
                blobs_url: 'https://api.github.com/repos/junka/junka/git/blobs{/sha}',
                branches_url: 'https://api.github.com/repos/junka/junka/branches{/branch}',
                clone_url: 'https://github.com/junka/junka.git',
                collaborators_url: 'https://api.github.com/repos/junka/junka/collaborators{/collaborator}',
                comments_url: 'https://api.github.com/repos/junka/junka/comments{/number}',
                commits_url: 'https://api.github.com/repos/junka/junka/commits{/sha}',
                compare_url: 'https://api.github.com/repos/junka/junka/compare/{base}...{head}',
                contents_url: 'https://api.github.com/repos/junka/junka/contents/{+path}',
                contributors_url: 'https://api.github.com/repos/junka/junka/contributors',
                created_at: '2022-11-10T04:24:15Z',
                default_branch: 'main',
                deployments_url: 'https://api.github.com/repos/junka/junka/deployments',
                description: 'Config files for my GitHub profile.',
                disabled: false,
                downloads_url: 'https://api.github.com/repos/junka/junka/downloads',
                events_url: 'https://api.github.com/repos/junka/junka/events',
                fork: false,
                forks: 0,
                forks_count: 0,
                forks_url: 'https://api.github.com/repos/junka/junka/forks',
                full_name: 'junka/junka',
                git_commits_url: 'https://api.github.com/repos/junka/junka/git/commits{/sha}',
                git_refs_url: 'https://api.github.com/repos/junka/junka/git/refs{/sha}',
                git_tags_url: 'https://api.github.com/repos/junka/junka/git/tags{/sha}',
                git_url: 'git://github.com/junka/junka.git',
                has_discussions: false,
                has_downloads: true,
                has_issues: false,
                has_pages: false,
                has_projects: true,
                has_wiki: false,
                homepage: 'https://github.com/junka',
                hooks_url: 'https://api.github.com/repos/junka/junka/hooks',
                html_url: 'https://github.com/junka/junka',
                id: 564141524,
                is_template: false,
                issue_comment_url: 'https://api.github.com/repos/junka/junka/issues/comments{/number}',
                issue_events_url: 'https://api.github.com/repos/junka/junka/issues/events{/number}',
                issues_url: 'https://api.github.com/repos/junka/junka/issues{/number}',
                keys_url: 'https://api.github.com/repos/junka/junka/keys{/key_id}',
                labels_url: 'https://api.github.com/repos/junka/junka/labels{/name}',
                language: null,
                languages_url: 'https://api.github.com/repos/junka/junka/languages',
                license: null,
                merges_url: 'https://api.github.com/repos/junka/junka/merges',
                milestones_url: 'https://api.github.com/repos/junka/junka/milestones{/number}',
                mirror_url: null,
                name: 'junka',
                node_id: 'R_kgDOIaAd1A',
                notifications_url: 'https://api.github.com/repos/junka/junka/notifications{?since,all,participating}',
                open_issues: 0,
                open_issues_count: 0,
                owner: {
                    avatar_url: 'https://avatars.githubusercontent.com/u/2344498?v=4',
                    events_url: 'https://api.github.com/users/junka/events{/privacy}',
                    followers_url: 'https://api.github.com/users/junka/followers',
                    following_url: 'https://api.github.com/users/junka/following{/other_user}',
                    gists_url: 'https://api.github.com/users/junka/gists{/gist_id}',
                    gravatar_id: '',
                    html_url: 'https://github.com/junka',
                    id: 2344498,
                    login: 'junka',
                    node_id: 'MDQ6VXNlcjIzNDQ0OTg=',
                    organizations_url: 'https://api.github.com/users/junka/orgs',
                    received_events_url: 'https://api.github.com/users/junka/received_events',
                    repos_url: 'https://api.github.com/users/junka/repos',
                    site_admin: false,
                    starred_url: 'https://api.github.com/users/junka/starred{/owner}{/repo}',
                    subscriptions_url: 'https://api.github.com/users/junka/subscriptions',
                    type: 'User',
                    url: 'https://api.github.com/users/junka'
                },
                private: false,
                pulls_url: 'https://api.github.com/repos/junka/junka/pulls{/number}',
                pushed_at: '2024-05-21T13:45:34Z',
                releases_url: 'https://api.github.com/repos/junka/junka/releases{/id}',
                size: 29,
                ssh_url: 'git@github.com:junka/junka.git',
                stargazers_count: 0,
                stargazers_url: 'https://api.github.com/repos/junka/junka/stargazers',
                statuses_url: 'https://api.github.com/repos/junka/junka/statuses/{sha}',
                subscribers_url: 'https://api.github.com/repos/junka/junka/subscribers',
                subscription_url: 'https://api.github.com/repos/junka/junka/subscription',
                svn_url: 'https://github.com/junka/junka',
                tags_url: 'https://api.github.com/repos/junka/junka/tags',
                teams_url: 'https://api.github.com/repos/junka/junka/teams',
                topics: ['config', 'github-config'],
                trees_url: 'https://api.github.com/repos/junka/junka/git/trees{/sha}',
                updated_at: '2024-05-21T13:42:17Z',
                url: 'https://api.github.com/repos/junka/junka',
                visibility: 'public',
                watchers: 0,
                watchers_count: 0,
                web_commit_signoff_required: false
            },
            sender: {
                avatar_url: 'https://avatars.githubusercontent.com/u/2344498?v=4',
                events_url: 'https://api.github.com/users/junka/events{/privacy}',
                followers_url: 'https://api.github.com/users/junka/followers',
                following_url: 'https://api.github.com/users/junka/following{/other_user}',
                gists_url: 'https://api.github.com/users/junka/gists{/gist_id}',
                gravatar_id: '',
                html_url: 'https://github.com/junka',
                id: 2344498,
                login: 'junka',
                node_id: 'MDQ6VXNlcjIzNDQ0OTg=',
                organizations_url: 'https://api.github.com/users/junka/orgs',
                received_events_url: 'https://api.github.com/users/junka/received_events',
                repos_url: 'https://api.github.com/users/junka/repos',
                site_admin: false,
                starred_url: 'https://api.github.com/users/junka/starred{/owner}{/repo}',
                subscriptions_url: 'https://api.github.com/users/junka/subscriptions',
                type: 'User',
                url: 'https://api.github.com/users/junka'
            }
        }

        jest.replaceProperty(context, "payload", createevent);
        jest.replaceProperty(context, "eventName", "create");
        jest.replaceProperty(context, "actor", "newbody");

        const resp = await main.PostGithubEvent();
        expect(runMock).toHaveReturned();
        expect(resp).toEqual(200);
        expect(debugMock).toHaveBeenNthCalledWith(1, 0);
        expect(debugMock).toHaveBeenNthCalledWith(2, "success");

        expect(errorMock).not.toHaveBeenCalled();
    })
  
  it("branch rule event", async () => {
    const branchruleevent = {
      action: "created",
      repository: {
        allow_forking: true,
        archive_url:
          "https://api.github.com/repos/junka/junka/{archive_format}{/ref}",
        archived: false,
        assignees_url:
          "https://api.github.com/repos/junka/junka/assignees{/user}",
        blobs_url: "https://api.github.com/repos/junka/junka/git/blobs{/sha}",
        branches_url:
          "https://api.github.com/repos/junka/junka/branches{/branch}",
        clone_url: "https://github.com/junka/junka.git",
        collaborators_url:
          "https://api.github.com/repos/junka/junka/collaborators{/collaborator}",
        comments_url:
          "https://api.github.com/repos/junka/junka/comments{/number}",
        commits_url: "https://api.github.com/repos/junka/junka/commits{/sha}",
        compare_url:
          "https://api.github.com/repos/junka/junka/compare/{base}...{head}",
        contents_url:
          "https://api.github.com/repos/junka/junka/contents/{+path}",
        contributors_url:
          "https://api.github.com/repos/junka/junka/contributors",
        created_at: "2022-11-10T04:24:15Z",
        default_branch: "main",
        deployments_url: "https://api.github.com/repos/junka/junka/deployments",
        description: "Config files for my GitHub profile.",
        disabled: false,
        downloads_url: "https://api.github.com/repos/junka/junka/downloads",
        events_url: "https://api.github.com/repos/junka/junka/events",
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: "https://api.github.com/repos/junka/junka/forks",
        full_name: "junka/junka",
        git_commits_url:
          "https://api.github.com/repos/junka/junka/git/commits{/sha}",
        git_refs_url: "https://api.github.com/repos/junka/junka/git/refs{/sha}",
        git_tags_url: "https://api.github.com/repos/junka/junka/git/tags{/sha}",
        git_url: "git://github.com/junka/junka.git",
        has_discussions: false,
        has_downloads: true,
        has_issues: false,
        has_pages: false,
        has_projects: true,
        has_wiki: false,
        homepage: "https://github.com/junka",
        hooks_url: "https://api.github.com/repos/junka/junka/hooks",
        html_url: "https://github.com/junka/junka",
        id: 564141524,
        is_template: false,
        issue_comment_url:
          "https://api.github.com/repos/junka/junka/issues/comments{/number}",
        issue_events_url:
          "https://api.github.com/repos/junka/junka/issues/events{/number}",
        issues_url: "https://api.github.com/repos/junka/junka/issues{/number}",
        keys_url: "https://api.github.com/repos/junka/junka/keys{/key_id}",
        labels_url: "https://api.github.com/repos/junka/junka/labels{/name}",
        language: null,
        languages_url: "https://api.github.com/repos/junka/junka/languages",
        license: null,
        merges_url: "https://api.github.com/repos/junka/junka/merges",
        milestones_url:
          "https://api.github.com/repos/junka/junka/milestones{/number}",
        mirror_url: null,
        name: "junka",
        node_id: "R_kgDOIaAd1A",
        notifications_url:
          "https://api.github.com/repos/junka/junka/notifications{?since,all,participating}",
        open_issues: 0,
        open_issues_count: 0,
        owner: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/junka/events{/privacy}",
          followers_url: "https://api.github.com/users/junka/followers",
          following_url:
            "https://api.github.com/users/junka/following{/other_user}",
          gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/junka",
          id: 2344498,
          login: "junka",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/junka/orgs",
          received_events_url:
            "https://api.github.com/users/junka/received_events",
          repos_url: "https://api.github.com/users/junka/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/junka/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/junka/subscriptions",
          type: "User",
          url: "https://api.github.com/users/junka",
        },
        private: false,
        pulls_url: "https://api.github.com/repos/junka/junka/pulls{/number}",
        pushed_at: "2024-05-21T16:46:23Z",
        releases_url: "https://api.github.com/repos/junka/junka/releases{/id}",
        size: 29,
        ssh_url: "git@github.com:junka/junka.git",
        stargazers_count: 0,
        stargazers_url: "https://api.github.com/repos/junka/junka/stargazers",
        statuses_url: "https://api.github.com/repos/junka/junka/statuses/{sha}",
        subscribers_url: "https://api.github.com/repos/junka/junka/subscribers",
        subscription_url:
          "https://api.github.com/repos/junka/junka/subscription",
        svn_url: "https://github.com/junka/junka",
        tags_url: "https://api.github.com/repos/junka/junka/tags",
        teams_url: "https://api.github.com/repos/junka/junka/teams",
        topics: ["config", "github-config"],
        trees_url: "https://api.github.com/repos/junka/junka/git/trees{/sha}",
        updated_at: "2024-05-21T13:42:17Z",
        url: "https://api.github.com/repos/junka/junka",
        visibility: "public",
        watchers: 0,
        watchers_count: 0,
        web_commit_signoff_required: false,
      },
      rule: {
        admin_enforced: false,
        allow_deletions_enforcement_level: "off",
        allow_force_pushes_enforcement_level: "off",
        authorized_actor_names: [],
        authorized_actors_only: false,
        authorized_dismissal_actors_only: false,
        create_protected: false,
        created_at: "2024-05-22T08:48:38.000+08:00",
        dismiss_stale_reviews_on_push: false,
        id: 50492837,
        ignore_approvals_from_contributors: false,
        linear_history_requirement_enforcement_level: "off",
        merge_queue_enforcement_level: "off",
        name: "main",
        pull_request_reviews_enforcement_level: "off",
        repository_id: 564141524,
        require_code_owner_review: false,
        require_last_push_approval: false,
        required_approving_review_count: 1,
        required_conversation_resolution_level: "off",
        required_deployments_enforcement_level: "off",
        required_status_checks: [],
        required_status_checks_enforcement_level: "non_admins",
        signature_requirement_enforcement_level: "non_admins",
        strict_required_status_checks_policy: true,
        updated_at: "2024-05-22T08:48:38.000+08:00",
      },
      sender: {
        avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
        events_url: "https://api.github.com/users/junka/events{/privacy}",
        followers_url: "https://api.github.com/users/junka/followers",
        following_url:
          "https://api.github.com/users/junka/following{/other_user}",
        gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
        gravatar_id: "",
        html_url: "https://github.com/junka",
        id: 2344498,
        login: "junka",
        node_id: "MDQ6VXNlcjIzNDQ0OTg=",
        organizations_url: "https://api.github.com/users/junka/orgs",
        received_events_url:
          "https://api.github.com/users/junka/received_events",
        repos_url: "https://api.github.com/users/junka/repos",
        site_admin: false,
        starred_url:
          "https://api.github.com/users/junka/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/junka/subscriptions",
        type: "User",
        url: "https://api.github.com/users/junka",
      },
    };

    jest.replaceProperty(context, "payload", branchruleevent);
    jest.replaceProperty(context, "eventName", "branch_protection_rule");
    jest.replaceProperty(context, "actor", "nbody");

    const resp = await main.PostGithubEvent();
    expect(runMock).toHaveReturned();
    expect(resp).toEqual(200);
    expect(debugMock).toHaveBeenNthCalledWith(1, 0);
    expect(debugMock).toHaveBeenNthCalledWith(2, "success");

    expect(errorMock).not.toHaveBeenCalled();
  });
  */
  it("issue open event", async () => {
    const issueevent = {
      action: "opened",
      issue: {
        active_lock_reason: null,
        assignee: null,
        assignees: [],
        author_association: "OWNER",
        body: "we need it",
        closed_at: null,
        comments: 0,
        comments_url:
          "https://api.github.com/repos/junka/pycbpf/issues/1/comments",
        created_at: "2024-05-27T11:44:36Z",
        events_url: "https://api.github.com/repos/junka/pycbpf/issues/1/events",
        html_url: "https://github.com/junka/pycbpf/issues/1",
        id: 2318960959,
        labels: [],
        labels_url:
          "https://api.github.com/repos/junka/pycbpf/issues/1/labels{/name}",
        locked: false,
        milestone: null,
        node_id: "I_kwDOJlGsVc6KOIk_",
        number: 1,
        performed_via_github_app: null,
        reactions: {
          "+1": 0,
          "-1": 0,
          confused: 0,
          eyes: 0,
          heart: 0,
          hooray: 0,
          laugh: 0,
          rocket: 0,
          total_count: 0,
          url: "https://api.github.com/repos/junka/pycbpf/issues/1/reactions",
        },
        repository_url: "https://api.github.com/repos/junka/pycbpf",
        state: "open",
        state_reason: null,
        timeline_url:
          "https://api.github.com/repos/junka/pycbpf/issues/1/timeline",
        title: "test issue",
        updated_at: "2024-05-27T11:44:37Z",
        url: "https://api.github.com/repos/junka/pycbpf/issues/1",
        user: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/junka/events{/privacy}",
          followers_url: "https://api.github.com/users/junka/followers",
          following_url:
            "https://api.github.com/users/junka/following{/other_user}",
          gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/junka",
          id: 2344498,
          login: "junka",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/junka/orgs",
          received_events_url:
            "https://api.github.com/users/junka/received_events",
          repos_url: "https://api.github.com/users/junka/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/junka/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/junka/subscriptions",
          type: "User",
          url: "https://api.github.com/users/junka",
        },
      },
      repository: {
        allow_forking: true,
        archive_url:
          "https://api.github.com/repos/junka/pycbpf/{archive_format}{/ref}",
        archived: false,
        assignees_url:
          "https://api.github.com/repos/junka/pycbpf/assignees{/user}",
        blobs_url: "https://api.github.com/repos/junka/pycbpf/git/blobs{/sha}",
        branches_url:
          "https://api.github.com/repos/junka/pycbpf/branches{/branch}",
        clone_url: "https://github.com/junka/pycbpf.git",
        collaborators_url:
          "https://api.github.com/repos/junka/pycbpf/collaborators{/collaborator}",
        comments_url:
          "https://api.github.com/repos/junka/pycbpf/comments{/number}",
        commits_url: "https://api.github.com/repos/junka/pycbpf/commits{/sha}",
        compare_url:
          "https://api.github.com/repos/junka/pycbpf/compare/{base}...{head}",
        contents_url:
          "https://api.github.com/repos/junka/pycbpf/contents/{+path}",
        contributors_url:
          "https://api.github.com/repos/junka/pycbpf/contributors",
        created_at: "2023-05-19T15:10:31Z",
        default_branch: "main",
        deployments_url:
          "https://api.github.com/repos/junka/pycbpf/deployments",
        description: "python script which compile cbpf to C code for BCC",
        disabled: false,
        downloads_url: "https://api.github.com/repos/junka/pycbpf/downloads",
        events_url: "https://api.github.com/repos/junka/pycbpf/events",
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: "https://api.github.com/repos/junka/pycbpf/forks",
        full_name: "junka/pycbpf",
        git_commits_url:
          "https://api.github.com/repos/junka/pycbpf/git/commits{/sha}",
        git_refs_url:
          "https://api.github.com/repos/junka/pycbpf/git/refs{/sha}",
        git_tags_url:
          "https://api.github.com/repos/junka/pycbpf/git/tags{/sha}",
        git_url: "git://github.com/junka/pycbpf.git",
        has_discussions: false,
        has_downloads: true,
        has_issues: true,
        has_pages: false,
        has_projects: true,
        has_wiki: true,
        homepage: "",
        hooks_url: "https://api.github.com/repos/junka/pycbpf/hooks",
        html_url: "https://github.com/junka/pycbpf",
        id: 642886741,
        is_template: false,
        issue_comment_url:
          "https://api.github.com/repos/junka/pycbpf/issues/comments{/number}",
        issue_events_url:
          "https://api.github.com/repos/junka/pycbpf/issues/events{/number}",
        issues_url: "https://api.github.com/repos/junka/pycbpf/issues{/number}",
        keys_url: "https://api.github.com/repos/junka/pycbpf/keys{/key_id}",
        labels_url: "https://api.github.com/repos/junka/pycbpf/labels{/name}",
        language: "Python",
        languages_url: "https://api.github.com/repos/junka/pycbpf/languages",
        license: {
          key: "mit",
          name: "MIT License",
          node_id: "MDc6TGljZW5zZTEz",
          spdx_id: "MIT",
          url: "https://api.github.com/licenses/mit",
        },
        merges_url: "https://api.github.com/repos/junka/pycbpf/merges",
        milestones_url:
          "https://api.github.com/repos/junka/pycbpf/milestones{/number}",
        mirror_url: null,
        name: "pycbpf",
        node_id: "R_kgDOJlGsVQ",
        notifications_url:
          "https://api.github.com/repos/junka/pycbpf/notifications{?since,all,participating}",
        open_issues: 1,
        open_issues_count: 1,
        owner: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/junka/events{/privacy}",
          followers_url: "https://api.github.com/users/junka/followers",
          following_url:
            "https://api.github.com/users/junka/following{/other_user}",
          gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/junka",
          id: 2344498,
          login: "junka",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/junka/orgs",
          received_events_url:
            "https://api.github.com/users/junka/received_events",
          repos_url: "https://api.github.com/users/junka/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/junka/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/junka/subscriptions",
          type: "User",
          url: "https://api.github.com/users/junka",
        },
        private: false,
        pulls_url: "https://api.github.com/repos/junka/pycbpf/pulls{/number}",
        pushed_at: "2024-05-27T11:41:05Z",
        releases_url: "https://api.github.com/repos/junka/pycbpf/releases{/id}",
        size: 57,
        ssh_url: "git@github.com:junka/pycbpf.git",
        stargazers_count: 0,
        stargazers_url: "https://api.github.com/repos/junka/pycbpf/stargazers",
        statuses_url:
          "https://api.github.com/repos/junka/pycbpf/statuses/{sha}",
        subscribers_url:
          "https://api.github.com/repos/junka/pycbpf/subscribers",
        subscription_url:
          "https://api.github.com/repos/junka/pycbpf/subscription",
        svn_url: "https://github.com/junka/pycbpf",
        tags_url: "https://api.github.com/repos/junka/pycbpf/tags",
        teams_url: "https://api.github.com/repos/junka/pycbpf/teams",
        topics: ["bcc", "cbpf", "ebpf", "packet-capture", "tcpdump"],
        trees_url: "https://api.github.com/repos/junka/pycbpf/git/trees{/sha}",
        updated_at: "2024-05-27T11:41:08Z",
        url: "https://api.github.com/repos/junka/pycbpf",
        visibility: "public",
        watchers: 0,
        watchers_count: 0,
        web_commit_signoff_required: false,
      },
      sender: {
        avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
        events_url: "https://api.github.com/users/junka/events{/privacy}",
        followers_url: "https://api.github.com/users/junka/followers",
        following_url:
          "https://api.github.com/users/junka/following{/other_user}",
        gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
        gravatar_id: "",
        html_url: "https://github.com/junka",
        id: 2344498,
        login: "junka",
        node_id: "MDQ6VXNlcjIzNDQ0OTg=",
        organizations_url: "https://api.github.com/users/junka/orgs",
        received_events_url:
          "https://api.github.com/users/junka/received_events",
        repos_url: "https://api.github.com/users/junka/repos",
        site_admin: false,
        starred_url:
          "https://api.github.com/users/junka/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/junka/subscriptions",
        type: "User",
        url: "https://api.github.com/users/junka",
      },
    };
    jest.replaceProperty(context, "payload", issueevent);
    jest.replaceProperty(context, "eventName", "issue");
    jest.replaceProperty(context, "actor", "nbody");

    const resp = await main.PostGithubEvent();
    expect(runMock).toHaveReturned();
    expect(resp).toEqual(200);
    expect(debugMock).toHaveBeenNthCalledWith(1, 0);
    expect(debugMock).toHaveBeenNthCalledWith(2, "success");

    expect(errorMock).not.toHaveBeenCalled();
  });

  it("issue comment event", async () => {
    const issue_comment_event = {
      action: "created",
      comment: {
        author_association: "OWNER",
        body: "heihei",
        created_at: "2024-05-27T12:20:43Z",
        html_url:
          "https://github.com/junka/pycbpf/issues/1#issuecomment-2133366811",
        id: 2133366811,
        issue_url: "https://api.github.com/repos/junka/pycbpf/issues/1",
        node_id: "IC_kwDOJlGsVc5_KJgb",
        performed_via_github_app: null,
        reactions: {
          "+1": 0,
          "-1": 0,
          confused: 0,
          eyes: 0,
          heart: 0,
          hooray: 0,
          laugh: 0,
          rocket: 0,
          total_count: 0,
          url: "https://api.github.com/repos/junka/pycbpf/issues/comments/2133366811/reactions",
        },
        updated_at: "2024-05-27T12:20:43Z",
        url: "https://api.github.com/repos/junka/pycbpf/issues/comments/2133366811",
        user: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/junka/events{/privacy}",
          followers_url: "https://api.github.com/users/junka/followers",
          following_url:
            "https://api.github.com/users/junka/following{/other_user}",
          gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/junka",
          id: 2344498,
          login: "junka",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/junka/orgs",
          received_events_url:
            "https://api.github.com/users/junka/received_events",
          repos_url: "https://api.github.com/users/junka/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/junka/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/junka/subscriptions",
          type: "User",
          url: "https://api.github.com/users/junka",
        },
      },
      issue: {
        active_lock_reason: null,
        assignee: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/junka/events{/privacy}",
          followers_url: "https://api.github.com/users/junka/followers",
          following_url:
            "https://api.github.com/users/junka/following{/other_user}",
          gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/junka",
          id: 2344498,
          login: "junka",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/junka/orgs",
          received_events_url:
            "https://api.github.com/users/junka/received_events",
          repos_url: "https://api.github.com/users/junka/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/junka/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/junka/subscriptions",
          type: "User",
          url: "https://api.github.com/users/junka",
        },
        assignees: [[Object]],
        author_association: "OWNER",
        body: "we need it",
        closed_at: null,
        comments: 2,
        comments_url:
          "https://api.github.com/repos/junka/pycbpf/issues/1/comments",
        created_at: "2024-05-27T11:44:36Z",
        events_url: "https://api.github.com/repos/junka/pycbpf/issues/1/events",
        html_url: "https://github.com/junka/pycbpf/issues/1",
        id: 2318960959,
        labels: [[Object], [Object]],
        labels_url:
          "https://api.github.com/repos/junka/pycbpf/issues/1/labels{/name}",
        locked: false,
        milestone: null,
        node_id: "I_kwDOJlGsVc6KOIk_",
        number: 1,
        performed_via_github_app: null,
        reactions: {
          "+1": 0,
          "-1": 0,
          confused: 0,
          eyes: 0,
          heart: 0,
          hooray: 0,
          laugh: 0,
          rocket: 0,
          total_count: 0,
          url: "https://api.github.com/repos/junka/pycbpf/issues/1/reactions",
        },
        repository_url: "https://api.github.com/repos/junka/pycbpf",
        state: "open",
        state_reason: null,
        timeline_url:
          "https://api.github.com/repos/junka/pycbpf/issues/1/timeline",
        title: "test issue",
        updated_at: "2024-05-27T12:20:44Z",
        url: "https://api.github.com/repos/junka/pycbpf/issues/1",
        user: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/junka/events{/privacy}",
          followers_url: "https://api.github.com/users/junka/followers",
          following_url:
            "https://api.github.com/users/junka/following{/other_user}",
          gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/junka",
          id: 2344498,
          login: "junka",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/junka/orgs",
          received_events_url:
            "https://api.github.com/users/junka/received_events",
          repos_url: "https://api.github.com/users/junka/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/junka/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/junka/subscriptions",
          type: "User",
          url: "https://api.github.com/users/junka",
        },
      },
      repository: {
        allow_forking: true,
        archive_url:
          "https://api.github.com/repos/junka/pycbpf/{archive_format}{/ref}",
        archived: false,
        assignees_url:
          "https://api.github.com/repos/junka/pycbpf/assignees{/user}",
        blobs_url: "https://api.github.com/repos/junka/pycbpf/git/blobs{/sha}",
        branches_url:
          "https://api.github.com/repos/junka/pycbpf/branches{/branch}",
        clone_url: "https://github.com/junka/pycbpf.git",
        collaborators_url:
          "https://api.github.com/repos/junka/pycbpf/collaborators{/collaborator}",
        comments_url:
          "https://api.github.com/repos/junka/pycbpf/comments{/number}",
        commits_url: "https://api.github.com/repos/junka/pycbpf/commits{/sha}",
        compare_url:
          "https://api.github.com/repos/junka/pycbpf/compare/{base}...{head}",
        contents_url:
          "https://api.github.com/repos/junka/pycbpf/contents/{+path}",
        contributors_url:
          "https://api.github.com/repos/junka/pycbpf/contributors",
        created_at: "2023-05-19T15:10:31Z",
        default_branch: "main",
        deployments_url:
          "https://api.github.com/repos/junka/pycbpf/deployments",
        description: "python script which compile cbpf to C code for BCC",
        disabled: false,
        downloads_url: "https://api.github.com/repos/junka/pycbpf/downloads",
        events_url: "https://api.github.com/repos/junka/pycbpf/events",
        fork: false,
        forks: 0,
        forks_count: 0,
        forks_url: "https://api.github.com/repos/junka/pycbpf/forks",
        full_name: "junka/pycbpf",
        git_commits_url:
          "https://api.github.com/repos/junka/pycbpf/git/commits{/sha}",
        git_refs_url:
          "https://api.github.com/repos/junka/pycbpf/git/refs{/sha}",
        git_tags_url:
          "https://api.github.com/repos/junka/pycbpf/git/tags{/sha}",
        git_url: "git://github.com/junka/pycbpf.git",
        has_discussions: false,
        has_downloads: true,
        has_issues: true,
        has_pages: false,
        has_projects: true,
        has_wiki: true,
        homepage: "",
        hooks_url: "https://api.github.com/repos/junka/pycbpf/hooks",
        html_url: "https://github.com/junka/pycbpf",
        id: 642886741,
        is_template: false,
        issue_comment_url:
          "https://api.github.com/repos/junka/pycbpf/issues/comments{/number}",
        issue_events_url:
          "https://api.github.com/repos/junka/pycbpf/issues/events{/number}",
        issues_url: "https://api.github.com/repos/junka/pycbpf/issues{/number}",
        keys_url: "https://api.github.com/repos/junka/pycbpf/keys{/key_id}",
        labels_url: "https://api.github.com/repos/junka/pycbpf/labels{/name}",
        language: "Python",
        languages_url: "https://api.github.com/repos/junka/pycbpf/languages",
        license: {
          key: "mit",
          name: "MIT License",
          node_id: "MDc6TGljZW5zZTEz",
          spdx_id: "MIT",
          url: "https://api.github.com/licenses/mit",
        },
        merges_url: "https://api.github.com/repos/junka/pycbpf/merges",
        milestones_url:
          "https://api.github.com/repos/junka/pycbpf/milestones{/number}",
        mirror_url: null,
        name: "pycbpf",
        node_id: "R_kgDOJlGsVQ",
        notifications_url:
          "https://api.github.com/repos/junka/pycbpf/notifications{?since,all,participating}",
        open_issues: 1,
        open_issues_count: 1,
        owner: {
          avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
          events_url: "https://api.github.com/users/junka/events{/privacy}",
          followers_url: "https://api.github.com/users/junka/followers",
          following_url:
            "https://api.github.com/users/junka/following{/other_user}",
          gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
          gravatar_id: "",
          html_url: "https://github.com/junka",
          id: 2344498,
          login: "junka",
          node_id: "MDQ6VXNlcjIzNDQ0OTg=",
          organizations_url: "https://api.github.com/users/junka/orgs",
          received_events_url:
            "https://api.github.com/users/junka/received_events",
          repos_url: "https://api.github.com/users/junka/repos",
          site_admin: false,
          starred_url:
            "https://api.github.com/users/junka/starred{/owner}{/repo}",
          subscriptions_url: "https://api.github.com/users/junka/subscriptions",
          type: "User",
          url: "https://api.github.com/users/junka",
        },
        private: false,
        pulls_url: "https://api.github.com/repos/junka/pycbpf/pulls{/number}",
        pushed_at: "2024-05-27T11:41:05Z",
        releases_url: "https://api.github.com/repos/junka/pycbpf/releases{/id}",
        size: 57,
        ssh_url: "git@github.com:junka/pycbpf.git",
        stargazers_count: 0,
        stargazers_url: "https://api.github.com/repos/junka/pycbpf/stargazers",
        statuses_url:
          "https://api.github.com/repos/junka/pycbpf/statuses/{sha}",
        subscribers_url:
          "https://api.github.com/repos/junka/pycbpf/subscribers",
        subscription_url:
          "https://api.github.com/repos/junka/pycbpf/subscription",
        svn_url: "https://github.com/junka/pycbpf",
        tags_url: "https://api.github.com/repos/junka/pycbpf/tags",
        teams_url: "https://api.github.com/repos/junka/pycbpf/teams",
        topics: ["bcc", "cbpf", "ebpf", "packet-capture", "tcpdump"],
        trees_url: "https://api.github.com/repos/junka/pycbpf/git/trees{/sha}",
        updated_at: "2024-05-27T11:41:08Z",
        url: "https://api.github.com/repos/junka/pycbpf",
        visibility: "public",
        watchers: 0,
        watchers_count: 0,
        web_commit_signoff_required: false,
      },
      sender: {
        avatar_url: "https://avatars.githubusercontent.com/u/2344498?v=4",
        events_url: "https://api.github.com/users/junka/events{/privacy}",
        followers_url: "https://api.github.com/users/junka/followers",
        following_url:
          "https://api.github.com/users/junka/following{/other_user}",
        gists_url: "https://api.github.com/users/junka/gists{/gist_id}",
        gravatar_id: "",
        html_url: "https://github.com/junka",
        id: 2344498,
        login: "junka",
        node_id: "MDQ6VXNlcjIzNDQ0OTg=",
        organizations_url: "https://api.github.com/users/junka/orgs",
        received_events_url:
          "https://api.github.com/users/junka/received_events",
        repos_url: "https://api.github.com/users/junka/repos",
        site_admin: false,
        starred_url:
          "https://api.github.com/users/junka/starred{/owner}{/repo}",
        subscriptions_url: "https://api.github.com/users/junka/subscriptions",
        type: "User",
        url: "https://api.github.com/users/junka",
      },
    };

    jest.replaceProperty(context, "payload", issue_comment_event);
    jest.replaceProperty(context, "eventName", "issue_comment");
    jest.replaceProperty(context, "actor", "nbody");

    const resp = await main.PostGithubEvent();
    expect(runMock).toHaveReturned();
    expect(resp).toEqual(200);
    expect(debugMock).toHaveBeenNthCalledWith(1, 0);
    expect(debugMock).toHaveBeenNthCalledWith(2, "success");

    expect(errorMock).not.toHaveBeenCalled();
  });
});

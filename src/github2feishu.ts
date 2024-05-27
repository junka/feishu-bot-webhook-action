import * as core from "@actions/core";
import { context } from "@actions/github";
import getTrending from "./trend";
import { sign_with_timestamp, PostToFeishu } from "./feishu";
import { BuildGithubTrendingCard, BuildGithubNotificationCard } from "./card";

async function PostGithubTrending(
  webhookId: string,
  timestamp: number,
  sign: string,
): Promise<number | undefined> {
  return getTrending().then((repos) => {
    const cardmsg = BuildGithubTrendingCard(timestamp, sign, repos);
    return PostToFeishu(webhookId, cardmsg);
  });
}

export async function PostGithubEvent(): Promise<number | undefined> {
  const webhook = core.getInput("webhook")
    ? core.getInput("webhook")
    : process.env.FEISHU_BOT_WEBHOOK || "";
  const signKey = core.getInput("signkey")
    ? core.getInput("signkey")
    : process.env.FEISHU_BOT_SIGNKEY || "";

  const payload = context.payload || {};
  console.log(payload);

  const webhookId = webhook.slice(webhook.indexOf("hook/") + 5);
  const tm = Math.floor(Date.now() / 1000);
  const sign = sign_with_timestamp(tm, signKey);

  const actor = context.actor;
  const eventType = context.eventName;
  const repo = context.payload.repository?.name || "junka";
  var status = context.payload.action || "closed";
  var etitle =
    context.payload.issue?.html_url ||
    context.payload.pull_request?.html_url ||
    "";
  var detailurl = "";
  switch (eventType) {
    case "branch_protection_rule":
      const rule = context.payload.rule;
      etitle = rule.name + ":\n" + JSON.stringify(rule);
      status = context.payload.action || "created";
      detailurl = context.payload.repository?.html_url || "";
      break;
    case "check_run":
      break;
    case "check_suite":
      break;
    case "create":
      etitle =
        (context.payload["ref_type"] === "tag" ? "create tag" : "create") +
        "\n\n" +
        context.payload["ref"];
      status = "create";
      detailurl = context.payload.repository?.html_url || "";
      break;
    case "delete":
      etitle =
        (context.payload["ref_type"] === "tag" ? "delete tag" : "delete") +
        "\n\n" +
        context.payload["ref"];
      status = "delete";
      detailurl = context.payload.repository?.html_url || "";
      break;
    case "deployment":
      break;
    case "deployment_status":
      break;
    case "discussion":
      break;
    case "discussion_comment":
      break;
    case "fork":
      break;
    case "gollum":
      break;
    case "issue_comment":
      const comment = context.payload.comment;
      etitle =
        "[No." +
        context.payload.issue?.number +
        " " +
        context.payload.issue?.title +
        "](" +
        context.payload.issue?.html_url +
        ")" +
        "\n\n" +
        comment?.body +
        "\n\n" +
        "";
      detailurl = comment?.html_url || "";
      break;
    case "issue":
      const issue = context.payload.issue;
      etitle =
        "[No." +
        issue?.number +
        " " +
        issue?.title +
        "](" +
        issue?.html_url +
        ")" +
        "\n\n" +
        issue?.body +
        "\n\n";
      detailurl = issue?.html_url || "";
      break;
    case "label":
      break;
    case "merge_group":
      break;
    case "milestone":
      break;
    case "page_build":
      break;
    case "project":
      break;
    case "project_card":
      break;
    case "project_column":
      break;
    case "public":
      break;
    case "pull_request":
      break;
    case "pull_request_comment":
      break;
    case "pull_request_review":
      break;
    case "pull_request_review_comment":
      break;
    case "pull_request_target":
      break;
    case "push":
      const head_commit = context.payload["head_commit"];
      console.log(context.payload["ref"]);
      etitle =
        (context.payload["ref"].indexOf("refs/tags/") != -1
          ? "tag: " +
            context.payload["ref"].slice(
              context.payload["ref"].indexOf("refs/tags/") + 10,
            )
          : context.payload["ref"].indexOf("refs/heads/") != -1
            ? "branch: " +
              context.payload["ref"].slice(
                context.payload["ref"].indexOf("refs/heads/") + 11,
              )
            : "") +
        "\n\nCommits: [" +
        head_commit["id"] +
        "](" +
        head_commit["url"] +
        ")\n\n" +
        head_commit["message"];
      status =
        context.payload["created"] === true
          ? "created"
          : context.payload["forced"] === true
            ? "force updated"
            : "";
      detailurl = context.payload["compare"];
      break;
    case "registry_package":
      break;
    case "release":
      const release = context.payload.release;
      etitle =
        release["name"] +
        "\n" +
        release["body"] +
        "\n" +
        release["tag_name"] +
        (release["prerelease"] === true ? "  prerelease" : "");
      status = context.payload.action || "published";
      detailurl = release["html_url"];
      break;
    case "repository_dispatch":
      break;
    case "schedule":
      return PostGithubTrending(webhookId, tm, sign);
    case "status":
      break;
    case "watch":
      //trigger at star started
      console.log(context.payload.repository);
      etitle =
        "Total stars: " + context.payload.repository?.["stargazers_count"];
      status = "stared";
      detailurl = context.payload.repository?.html_url || "";
      break;
    case "workflow_call":
      break;
    case "workflow_dispatch":
      break;
    case "workflow_run":
      break;
    default:
      break;
  }

  const color: string = "blue";
  const cardmsg = BuildGithubNotificationCard(
    tm,
    sign,
    repo,
    eventType,
    color,
    actor,
    status,
    etitle,
    detailurl,
  );
  return PostToFeishu(webhookId, cardmsg);
}

# Rewrite Your Git History Before Review

This repo is a hands-on demo showing why you should clean up your feature branch history before opening a PR for review, even if you squash-merge at the end.

## The scenario

A TypeScript project with a simple `UserService`. The feature being added: **email notifications** on user creation and deactivation.

Three branches exist to illustrate three approaches:

### `feat/email-notifications` -- The messy branch

This is what a branch looks like after real-world development: WIP commits, typo fixes, debug logging added then removed, and multiple merges of `main`.

```
* cleanup: remove todo and console.log
* Merge branch 'main' into feat/email-notifications
* finish tests i think
* also notify on deactivation
* remove debug log oops
* wip tests
* merge main into feature branch
* fix typo
* add some debug logging
* hook up notifications on user create
* wip: start notification service
```

Problems for a reviewer:
- **Merge commits** bring in unrelated changes (a logger utility, an error test) -- the reviewer has to figure out what's part of the feature and what isn't
- **Self-correcting noise** -- "add debug logging" is undone 3 commits later by "remove debug log oops". "fix typo" fixes a mistake from 2 commits ago. None of this is relevant to the review
- **WIP commits** -- "wip: start notification service" and "finish tests i think" don't convey intent
- **Split concerns** -- tests are added in different commits than the code they cover, making commit-by-commit review unreliable

### `feat/email-notifications-single-commit` -- The squashed branch

This is what happens when you squash everything into one commit before review (or what your reviewer sees if you skip history cleanup and rely on the "Files changed" tab).

```
* add email notifications
```

Problems for a reviewer:
- **No granularity** -- 3 files changed, ~90 lines in a single diff. The reviewer can't break it into logical pieces
- **No intent** -- Was the notification service designed first, then wired in? Or was it all done together? The reviewer can't tell
- **Harder to spot issues** -- Reviewing a new interface, its integration into an existing service, and all the tests at once is more cognitively demanding than reviewing each piece separately

### The clean branch (exercise for the reader)

Run `git rebase -i main` on `feat/email-notifications` to produce something like:

```
* add notification service
* send welcome email on user creation
* send deactivation email
```

Each commit is atomic, has a clear purpose, and includes the relevant tests. A reviewer can go commit-by-commit and reason about each change in isolation.

## Why rewrite history before review

1. **Reviewer experience** -- A clean commit sequence tells a story. Reviewers follow a logical progression instead of deciphering WIP, typo fixes, and reverted debug logging.

2. **Better review granularity** -- Reviewing commit-by-commit with atomic commits is far easier than reviewing a massive diff all at once. GitHub's "review by commit" feature becomes actually useful.

3. **Easier to spot issues** -- When each commit has a single purpose, a reviewer can reason about correctness per-commit. A refactor commit should have no behavior change. A feature commit should have its tests. Mixed commits hide bugs.

4. **Demonstrates intent** -- The commit structure communicates *why* changes were made in a particular order. "First I built the notification service, then I wired it into user creation" is clearer than a flat diff showing both at once.

5. **Self-review tool** -- Rewriting history forces the author to re-read their own changes. This often catches mistakes, dead code, or forgotten debug statements before a reviewer ever sees them.

6. **Bisectability during review** -- If a reviewer finds something odd, they can check intermediate commits to understand how the code evolved.

## Counter-arguments and rebuttals

| Counter-argument | Rebuttal |
|---|---|
| "We squash anyway, so history doesn't matter" | Squash determines what lands on `main`. Clean history determines the quality of the *review*. These are different concerns. |
| "It takes too much time" | `git rebase -i` is fast once practiced. The time saved by reviewers (often multiple people) outweighs the author's effort. |
| "I might introduce bugs while rebasing" | You're reordering and combining commits, not changing code. Run tests after rebasing -- if the branch was correct before, it's correct after. |
| "Force-pushing is scary" | Force-pushing to a *feature branch* is fine. Use `--force-with-lease` for safety. It's force-pushing to `main` that's dangerous. |
| "The PR diff is what matters, not individual commits" | For small PRs, maybe. For anything non-trivial (300+ lines), commit-by-commit review is significantly more effective. |
| "Git should preserve the real development process" | The real development process includes wrong turns, typo fixes, and coffee breaks. None of that helps a reviewer. History should communicate *intent*, not *process*. |

## TL;DR

> Squash merge decides what `main` looks like. Clean history decides what the **review** looks like. You owe your reviewers a readable story, not a diary.

## Running the demo

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Look at the messy history
git log --oneline --graph feat/email-notifications

# Look at the single-commit history
git log --oneline --graph feat/email-notifications-single-commit

# Try cleaning it up yourself
git checkout feat/email-notifications
git rebase -i main
```

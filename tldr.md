⏺ Why rewrite history before review (even with squash merge)

  Arguments FOR rewriting history

  1. Reviewer experience — A clean, logical commit sequence tells a story. Reviewers can follow the progression (refactor → implement → test) instead of deciphering a stream of "wip", "fix typo", "oops" commits. This
  reduces cognitive load and review time.
  2. Better review granularity — Reviewing commit-by-commit with atomic, well-scoped commits is far easier than reviewing a massive diff all at once. GitHub's "review by commit" feature becomes actually useful.
  3. Easier to spot issues — When each commit has a single purpose, a reviewer can reason about correctness per-commit. A refactor commit should have no behavior change. A logic commit should have tests. Mixed commits hide
  bugs.
  4. Demonstrates intent — The commit structure communicates why changes were made in a particular order. "First I extracted the interface, then I swapped the implementation" is clearer than a flat diff showing both at
  once.
  5. Self-review tool — Rewriting history forces the author to re-read their own changes. This often catches mistakes, dead code, or forgotten debug statements before a reviewer ever sees them.
  6. Bisectability during review — If a reviewer finds something odd, they can check intermediate commits to understand how the code evolved. With messy history, this is impossible.

  ---
  Counter-arguments (and rebuttals)

  ┌──────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │                   Counter-argument                   │                                                                            Rebuttal                                                                             │
  ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ "We squash anyway, so history doesn't matter"        │ Squash determines what lands on main. Review quality determines what gets into the squash. These are different concerns.                                        │
  ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ "It takes too much time"                             │ Interactive rebase (git rebase -i) is fast once practiced. The time saved by reviewers (often multiple people) outweighs the author's effort.                   │
  ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ "I might introduce bugs while rebasing"              │ You're not changing code, just reordering/combining commits. Run tests after rebasing. If the branch was correct before, it's correct after.                    │
  ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ "Force-pushing is scary/dangerous"                   │ Force-pushing to a feature branch is fine. It's force-pushing to main that's dangerous. Use --force-with-lease for safety.                                      │
  ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ "The PR diff is what matters, not individual         │ For small PRs, sure. For anything non-trivial (300+ lines), commit-by-commit review is significantly more effective.                                            │
  │ commits"                                             │                                                                                                                                                                 │
  ├──────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
  │ "Git preserves the real development process"         │ The real development process includes wrong turns, typo fixes, and coffee breaks. None of that helps a reviewer. History should communicate intent, not         │
  │                                                      │ process.                                                                                                                                                        │
  └──────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘

  ---
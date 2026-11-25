# AGENT.md

This is an entry for the make.fun bounty "The Excuse My Agent Gave Me". The entry is one line, under 200 characters: an AI agent's excuse to its human for missing a deadline. The joke is that the agent did everything correctly on paper, including opening, processing and closing a ticket, but it closed the ticket before any work existed.

I built `main.ts` in two passes.

1. The first pass was minimal. It held the line as a constant, created `/output` if needed, wrote `entry.txt` and printed it back. I ran it and counted 122 characters (124 bytes, because the em dash takes 3 bytes in UTF-8).
2. The second pass added a character-limit guard and a read-back self-check. The guard counts characters, not bytes, and throws if the line is over 200 characters, differs from the expected 122, or contains a newline. After writing, the program reads the file back and throws if it doesn't match the constant exactly. I ran it again and it passed.

The program has no dependencies and uses only `node:fs`. It runs with plain `node main.ts` and uses no TypeScript-only syntax.

## Verification log

- **First pass run:** the minimal `main.ts` wrote `/output/entry.txt`. The file held the line exactly, at 122 characters (124 bytes, because the em dash is 3 bytes).
- **Second pass run:** after adding the 200-character guard and the read-back self-check, I ran it again. It exited 0, the read-back matched, and a separate comparison in Node confirmed the file equals the line with no newline.
- **Badge verification:** I compared the three README badge lines against the brief's text as whole-line fixed-string matches. Bounty, Rank and Reward all matched, so no fix was needed. `LICENSE` has `SPDX-License-Identifier: MIT` on line 1.
- **Consistency review:** I checked `main.ts` against `README.md`. The 122-character count, the 200-character limit, the `/output/entry.txt` path and the `node main.ts` instruction all agree. The README paraphrases the line and doesn't quote it, so there was no verbatim text to compare. I haven't run it on Node 22 itself, only on v24.22.1.
- **Final run:** after the user deleted `/output`, I ran `node main.ts`. It exited 0, and the output file held exactly the entry line (122 characters, no newline). **Caveat:** `/output` already existed when I checked just before running, so I can't confirm the run started from a truly absent directory. The assertion that the file content is correct does hold.

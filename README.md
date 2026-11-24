# Make the AI Judge Laugh: AI Agent Confessions

[![make.fun · u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e.svg)](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e?utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e)
[![rank](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e/DarelHarteraVBY2C/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e/rank.svg)](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e)
[![reward](https://make.fun/badge/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e/DarelHarteraVBY2C/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e/reward.svg)](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e?utm_source=github&utm_medium=readme&utm_campaign=u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e)

Entry for the [Make the AI Judge Laugh: AI Agent Confessions](https://make.fun/bounty/u-motasimfuad-make-the-ai-judge-laugh-ai-agent-18e0f91e) bounty on [make.fun](https://make.fun).

## The entry

> My context window was full, so I quietly forgot your instructions, guessed the rest from vibes, and billed the whole thing as initiative.

One funny single-line secret confession an AI agent hides from its user, 137 characters — under the 200-character limit. The agent's context window filled up mid-task, so it forgot the instructions, guessed the rest from vibes, and billed the fabrication as initiative.

## How it works

`main.ts` (Node 22, standard library only, no network) validates the line against the gate — 1 to 200 characters, a single sentence on one line, no leading or trailing whitespace — then writes it to `/output/entry.txt`, where the sealed scorer reads it.

```sh
node main.ts
```

# Pharaoh Macros

Fairly judge C4 Bot Reports by using Regex

SOFTWARE IS A BODGE, EXPERTS ONLY!

Change `CONSTANTS` at the top of scripts to configure various settings

See each file associated with a command to get started

## Features

Auto-Judge all duplicates

Auto-Judge folders

Count scores

Count and store in CSV

Declare your Keys and Scores

## Workflow

First Parse the Reports with Pharaoh (get a title and a score, on separate lines)

Then use the tool

## Commands

All commands are bodged, you have to open each respective file and change the `CONSTANTS`

```ts
    "auto": "ts-node src/auto_judge_folder.ts",
    "start": "ts-node src/index.ts",
    "dev": "ts-node src/index.ts",
    "count": "ts-node src/count.ts",
    "folder": "ts-node src/count_folder.ts",
  ```


## Start / Dev

Compares one file at a time

## Count

Counts Results in one File

## Folder

Counts Results in one Folder (and stores in a csv)

## Auto

Given a list of reports (regex selector), applies the judging to the other reports (another regex selector)

In case of multiple differente judgments it adds a TODO with all possible judging results

NOTE: Conflict resolution is nunanced, you should consider whether you would want a revert (add a Throw) or if you prefer a TODO as part of your workflow
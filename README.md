# Test App for Reproducing MobX-State-Tree Bug

This repository contains a minimal application set up to reproduce a suspected bug with MobX-State-Tree (MST) in a React Native application. The bug is described in detail below.

## Overview

The app simulates a simple RootStore with a model AppStateStore within the RootStore. We will get access to the RootStore using a `getRoot()` function. The AppStateStore has an action that has to call an async RootStore action.

## Bug Description

Using typescript, the RootStore typings become `any` the moment we call a RootStore action using `yield`. See `./rootStore.ts:12` for the line that causes the issue. Try commenting out that line, and uncommenting the next one `./rootStore.ts:13` and the typescript typings will work as expected, but without any way to stop the execution.

Also worth noting, the `flow()` wrapper does not inherit the typings from the function it wraps. See `./rootStore.ts:23`

## Steps to Reproduce

None, just open the `./rootStore` file in VSCode and see the typescript typings for the `rootStore` variable.

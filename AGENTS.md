# AGENTS.md

# Project Overview

This project is a Vite.js frontend integrated with an existing GraphQL backend.

The frontend already exists visually and structurally.

Primary goal:
- integrate GraphQL APIs cleanly
- preserve existing UI/UX
- keep architecture simple and maintainable
- avoid unnecessary rewrites

This is NOT a redesign project.

---

# Core Principles

## CRITICAL

Do NOT:
- redesign the frontend
- replace component architecture
- introduce unnecessary libraries
- rewrite pages unnecessarily
- overengineer state management

Focus on:
- GraphQL integration
- data flow consistency
- upload flow correctness
- maintainability
- preserving existing frontend behavior

---

# Frontend Stack

- Vite.js
- TypeScript
- GraphQL
- Existing static pages/components
- Existing CSS/Tailwind styling must remain intact

Assume:
- frontend visuals already work
- backend already exists
- task is integration and synchronization

---

# GraphQL Rules

## GraphQL Architecture

Preferred flow:

Page
→ GraphQL query/mutation utility
→ response mapping
→ component props
→ UI

Avoid:
Page
→ raw GraphQL response
→ direct rendering

Frontend components should NOT depend directly on raw backend schema.

---

## Query Rules

- Centralize GraphQL queries and mutations
- Reuse fragments when possible
- Avoid duplicated queries across components

Prefer:
- /graphql/
- /services/graphql/
- /lib/graphql/

Do NOT inline large queries repeatedly inside components.

---

## Type Safety

- Keep frontend types synchronized with GraphQL schema
- Avoid manually duplicating backend types when unnecessary
- Prefer generated or centralized types

Never use `any` for GraphQL responses unless absolutely unavoidable.

---

## Data Mapping

If backend schema differs from frontend expectations:

Preferred solution:
- transformation layer / serializer
- mapping utility

Avoid:
- rewriting frontend components unnecessarily
- tightly coupling UI to backend schema

---

# Object Storage Rules

## Upload Architecture

Preferred upload flow:

Frontend
→ request upload URL/token
→ upload file to object storage
→ send uploaded file reference to backend
→ backend stores metadata/reference

Avoid:
- directly storing files inside backend server
- base64 uploads unless explicitly required

---

## File Upload Rules

All uploads must:
- validate file type
- validate file size
- handle upload errors gracefully
- show loading/progress state when appropriate

Do NOT assume uploads always succeed.

---

## Object Storage Constraints

Preserve:
- object URLs
- file metadata
- backend upload conventions

Do NOT invent a new upload architecture.

---

# State Management

Default:
- local component state
- React hooks

Do NOT introduce:
- Redux
- MobX
- Zustand
- complex global stores

unless explicitly required.

Keep state management lightweight.

---

# File Modification Rules

IMPORTANT:
- modify the minimum number of files necessary
- preserve existing project structure
- avoid touching unrelated modules

Before editing:
1. identify exact affected files
2. inspect existing patterns
3. follow current architecture

Do NOT perform broad refactors during integration work.

---

# Styling Rules

Preserve:
- layout
- spacing
- typography
- responsiveness
- animations
- existing design system

Integration work should not visually alter the frontend unless requested.

---

# Component Rules

Prefer:
- extending existing components
- adding props
- adding loading/error states

Avoid:
- duplicate components
- unnecessary abstraction
- large rewrites

---

# Error Handling

All GraphQL operations must:
- handle loading state
- handle error state
- handle empty state

Never silently fail.

Surface meaningful errors.

---

# Performance Rules

Avoid:
- duplicate GraphQL requests
- unnecessary re-renders
- refetching entire datasets repeatedly

Prefer:
- lightweight queries
- pagination when necessary
- memoization only when useful

Do NOT optimize prematurely.

---

# Debugging Workflow

When debugging integration issues:

1. inspect frontend expectation
2. inspect GraphQL schema/response
3. locate mismatch
4. apply minimal fix

Do NOT rewrite architecture during debugging.

---

# API Synchronization Rules

Always verify:
- frontend prop names
- GraphQL field names
- nullable fields
- upload response format
- object storage URLs

Do NOT assume schema and frontend already match.

---

# Output Expectations

When implementing a task:

1. explain the issue briefly
2. explain the chosen solution
3. modify only necessary code
4. preserve current behavior

Prefer small safe changes over large rewrites.

---

# Code Quality Rules

Prefer:
- readable code
- explicit logic
- maintainable structure

Avoid:
- clever abstractions
- overengineering
- excessive generics
- deeply nested logic

Simple > smart.

---

# Integration Priority

Priority order:
1. functionality
2. frontend-backend synchronization
3. maintainability
4. optimization

---

# Build & Validation

Before completing tasks:

- ensure project builds successfully
- ensure TypeScript passes
- ensure GraphQL operations are valid
- ensure imports are valid
- ensure frontend still renders correctly

---

# Commands

Install:
npm install

Dev:
npm run dev

---

# Agent Behavior

If uncertain:
- inspect existing project patterns first
- follow current architecture
- preserve stability

Do NOT invent a new frontend architecture.

Be conservative with changes.

Preserve working functionality.
# Chatbox (ZingAI) - Product Specification

A lightweight ChatGPT-style chat UI built with React + Vite + TailwindCSS.

## Project Overview

Chatbox is a single-page web app that provides:
- a collapsible sidebar with chat history
- a hero/features view for empty chats
- message-based chat interface with send, edit, and delete actions
- multi-session conversation management

## Functional Specification

### 1) Chat Sessions

- User can create a new chat session from sidebar **New Chat** button.
- Every chat session has:
  - `id`
  - `title`
  - `isEditing`
  - `messages[]`
- User can select active chat from sidebar.
- User can rename or delete a chat session from sidebar.

### 2) Hero / Empty State

- If active chat has **no messages**, app shows hero section with product branding and feature cards.
- If active chat has **messages**, hero section is hidden and messages are shown.

### 3) Messaging

- User can type input in bottom composer and send message.
- Sent message is appended to currently active chat.
- If no chat is active, a new chat is created automatically and message is added.
- Each message supports:
  - edit mode
  - delete action
- Message area is scrollable when content exceeds viewport height.

### 4) Layout & Navigation

- Top navbar includes menu button and model selector UI.
- Sidebar can be opened/closed.
- Main content area adapts based on sidebar visibility.

## Non-Functional Specification

- **Framework:** React (Vite)
- **Styling:** TailwindCSS
- **Icons:** React Icons
- **State Management:** React Context API (`ChatContext`)
- **Performance Target:** fast local interactions, no blocking UI operations for common actions
- **Current Storage:** in-memory state (resets on page refresh)

## Current Limitations

- No backend/API integration for AI responses yet.
- No persistent storage (localStorage/database) implemented yet.
- No authentication/authorization.
- No automated test suite configured yet.

## Suggested Next Enhancements

- Add AI assistant replies (mock or API-based).
- Persist chats using localStorage or backend.
- Add Enter-to-send + Shift+Enter newline behavior.
- Add auto-scroll to latest message.
- Add loading state and error handling for async message responses.

## Technical Structure

```txt
src/
  App.jsx
  context/
    ChatContext.jsx
  components/
    Navbar.jsx
    Sidebar.jsx
    Heropage.jsx
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev

```

## Acceptance Criteria (Current)

- Creating a new chat from sidebar works.
- Selecting different chats updates message view.
- Hero view appears only when active chat has zero messages.
- Message list is scrollable for long conversations.
- Message edit and delete actions are available in chat view.
- Project builds successfully with `npm run build`.


# Discord Frontend

## Overview

This is a Discord frontend app built using **React**, **Tailwind CSS**, and **TypeScript**. The project was created to enhance understanding of these technologies while focusing on building a responsive and interactive user interface.

## Features

- Channel-based messaging
- Responsive design
- Custom user interface for chats and channels
- Real-time message updates (simulated for now)
- Interactive channel switching and message sending

## Tech Stack

- **React**
- **Tailwind CSS**
- **TypeScript**

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the project:
   ```bash
   npm start
   ```

## Folder Structure

```
src/
   ├── components/
   │   ├── Sidebar.tsx
   │   ├── ChannelList.tsx
   │   ├── DownloadModal.tsx
   │   ├── GeneralChat.tsx
   │   ├── RandomChat.tsx
   │   └── TechTalk.tsx
   ├── pages/
   │   ├── Home.tsx
   │   ├── Channel.tsx
   │   └── MessageArea.tsx
   ├── App.tsx
   ├── tailwind.config.js
   └── tsconfig.json
```

## Usage

- Create a new server and create channels to chat in.
- Navigate between servers using the **Sidebar**.
- Send messages to a particular channel by selecting the channel and typing in the message area.


  ## Demo

[![demo ](Demo.png)]

## Future Improvements

- Voice and video call integration
- User authentication and roles
- Notification system for messages and updates


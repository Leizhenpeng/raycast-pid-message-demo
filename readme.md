# Development Session Manager

This project provides a simple way to manage development sessions using a PID file and `signal-exit`. You can start, stop, and restart development sessions with different parameters.

## Getting Started

### Prerequisites

- Node.js installed
- `npm` installed

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/leizhenpeng/dev-session-manager.git
    cd dev-session-manager
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

### Usage

1. Start the server:
    ```sh
    npm run start-server
    ```

2. Start a development session with optional arguments:
    ```sh
    curl -X POST -H "Content-Type: application/json" -d '{"args":["arg1","arg2"]}' http://localhost:3000/start-dev
    ```
    This will start a new development session with the provided arguments.

3. Stop the development session:
    ```sh
    curl http://localhost:3000/stop-dev
    ```
    This will stop the currently running development session.

4. Restart the development session with optional new arguments:
    ```sh
    curl -X POST -H "Content-Type: application/json" -d '{"args":["newArg1","newArg2"]}' http://localhost:3000/restart-dev
    ```
    This will stop the current session and start a new one with the provided arguments.

### Scripts

- `npm run dev`: Starts the development session script (`dev.js`).
- `npm run start-server`: Starts the control server (`server.js`).


# DevChallenge

Dev Challenge is a to-do app that assigns todos with assessments to an user and assesses their programming skills.

## Project Installation

1. Clone from master.
2. Open console and go to project root.
3. Run npm install.
4. Open config.example.ts, copy the contents of it into a new file called config.ts, in the same directory.
5. Open config.ts and enter the right credentials.
  * API_ENDPOINT is API url
  * APPLICATION_TOKEN is the token generated from the API. When you configure your API, you will generate a token, paste it here.
  * Configure one signal if you wish to use notifications.
6. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.
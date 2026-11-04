# Futurum Technology Recruitment Task

**Live demo:** https://futurum-campaigns.onrender.com/

**API docs (Swagger UI):** https://futurum-campaigns.onrender.com/swagger-ui.html

Note: hosted on Render's free plan - the first request after a period of inactivity may take up to a minute while the service wakes up.

## Features

- List of all campaigns, with a details view after clicking a campaign
- Create and edit campaigns
- Delete campaigns
- Current funds shown in the top-right corner, updated after every change

## Tech stack

- Backend: Java 25, Spring Boot 4
- Database: H2
- Frontend: React.js, TypeScript

## Assumptions

The task description left some points open, so the following decisions were made:

- Single seller: there is one default Emerald account, user management was out of scope
- Emerald account balance starts at 10 000 and is calculated as `initial balance - sum of all campaign funds`:
  - creating a campaign deducts its fund,
  - editing a campaign charges or refunds the difference,
  - deleting a campaign returns its full fund to the account
- Campaigns do not spend their budget - the fund is reserved, as ad delivery is not part of this application
- Keywords are suggested from a predefined list, but sellers can also enter their own
- Towns come from a fixed list (enum) exposed by the API
- Minimum bid amount is 1.00, as the task did not specify a value
- H2 database runs in memory, so all data resets when the application restarts

## API

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| GET    | `/campaigns`         | List all campaigns                   |
| GET    | `/campaigns/{id}`    | Get a single campaign                |
| POST   | `/campaigns`         | Create a campaign                    |
| PUT    | `/campaigns/{id}`    | Update a campaign                    |
| DELETE | `/campaigns/{id}`    | Delete a campaign                    |
| GET    | `/balance`           | Current Emerald account funds        |
| GET    | `/towns`             | Available towns                      |
| GET    | `/keywords?q=`       | Keyword suggestions for the typeahead |

## Running locally

**Requirements:** JDK 25, Node.js 22

**Backend** (runs on http://localhost:8080):

```bash
cd backend
./gradlew bootRun
```

**Frontend** (runs on http://localhost:5173):

```bash
cd frontend
npm install
npm run dev
```
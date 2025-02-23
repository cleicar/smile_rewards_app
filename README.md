# Smile Rewards App 

Welcome to the Smile Rewards App, an intuitive application that integrates with the Smile.io API to manage customer loyalty points, enable point redemption, and facilitate manual points adjustments. This app is designed with both customers and administrators in mind, offering an clean user experience.

## Features

#### 🛍️ Customer Dashboard
Points Balance: Displays the current points balance in a visually appealing manner.
Ways to Redeem: Shows available rewards and allows customers to redeem them if they have sufficient points.
Ways to Earn: Offers opportunities to earn points by completing simple tasks, such as answering a math question correctly.

#### ✨ Points Management
Math Question Feature: Earn 50 points by answering a simple randomized math question.
Manual Points Issuing (Admin Only): Administrators can manually add or remove points from a customer's balance using a straightforward interface.
Confirmation Prompt: Avoid accidental changes with a built-in "Are you sure?" prompt.

#### 🔑 Admin Mode
Admin Access: Activate the admin panel by adding ?admin=true to the app’s URL.
Manual Points Adjustment: Add or deduct points with a simple input and confirmation process.

## Tech Stack
#### Frontend
- React with TypeScript for a type-safe and maintainable codebase.
- Apollo Client for seamless GraphQL integration.
- TailwindCSS for modern, simple, and responsive UI design.

#### Backend
- Ruby on Rails with GraphQL for a robust and flexible API layer.
- Integration with Smile.io API for real-time customer points management.

## Getting Started

1. Clone the Repository

```bash
git clone https://github.com/yourusername/smile-rewards-app.git
```

2. Install Dependencies
- Backend (Ruby on Rails)

```bash
cd smile-rewards-app
bundle install
```

- Frontend (React)

```bash
yarn install
```

3. Setup Environment Variables
Create a .env file in both the frontend and backend directories with the variables on the .env.sample

4. Run the Application

- Backend

```bash
rails server
```

- Frontend

```bash
yarn start
```

5. Access the App
Open http://localhost:3000 in your browser.

## 📦 Application Structure

```
smile-rewards-app/
├── backend/                     # Ruby on Rails API
│   ├── app/graphql/             # GraphQL Mutations and Types
│   ├── app/services/            # Integration with Smile API
│   └── config/                  # Rails configuration
├── frontend/                    # React Frontend
│   ├── src/components/          # UI Components
│   ├── src/hooks/               # Custom React hooks
│   ├── src/pages/               # Application pages
│   └── src/types/               # TypeScript types
└── README.md                    # Documentation
```

## 🧠 Usage

#### Customer View
- View Points Balance: Automatically displayed on the dashboard.
- Redeem Rewards: Click on redeemable rewards if you have enough points.
- Earn Points: Answer the math question correctly to earn additional points.
 
#### Admin View
- Enable Admin Mode: Append ?admin=true to the URL.
- Adjust Points Manually: Enter the points to add or remove and confirm the action.

## 💡 Future Improvements
- Role-Based Access Control: Implement proper authentication for customer and admin roles.
- Enhanced Validation: Improve form validations and error handling.
- Enhanced UI: Improve how erors are displayed to for a better user experience (Toast Messages)
- Better log in the backend to help with troubleshooting.
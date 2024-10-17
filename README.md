# Interactive Dashboard

## Project Description

This project is a Full Stack Development Intern Assignment focused on developing an interactive dashboard application using **Next.js**, **Recharts**, and **Supabase**. The dashboard is designed to display various metrics, support user authentication, and provide data visualization capabilities. It aims to offer a user-friendly interface while ensuring secure data management and real-time updates.

## Objective

The primary goal of this project is to create a comprehensive dashboard that meets the following requirements:

- Implement user authentication using Supabase Auth.
- Design and implement a dashboard with various widgets and charts using Recharts.
- Ensure responsive design for mobile compatibility.
- Deploy the application on Vercel.
- Provide clear documentation on setup and usage.

## Features

- **User Authentication:** Secure login and registration using Supabase.
- **Interactive Dashboard:** Real-time data updates with charts and metrics.
- **Customizable User Settings:** Personalize user profiles and preferences.
- **Data Management:** Easily manage data entries and updates through the UI.
- **Responsive Design:** Fully functional on both desktop and mobile devices.

## How to Run This Next.js Project

### 1. Clone the Repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/your-username/project-repo.git
```

> Replace `your-username` with your actual GitHub username.

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
cd project-repo
npm install
```

### 3. Setup Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> Replace `your-supabase-url` and `your-anon-key` with actual values from your Supabase dashboard.

### 4. Running the Project Locally

You can start the development server by running:

```bash
npm run dev
```

> The application will be accessible at [http://localhost:3000](http://localhost:3000).

### 5. Additional Commands

- **Build the project:**
  ```bash
  npm build
  ```

- **Run the production build:**
  ```bash
  npm start
  ```

### 6. Database Setup

Ensure your Supabase database is set up correctly with the necessary tables for user authentication and dashboard data. Refer to the [Supabase documentation](https://supabase.io/docs) for guidance.

### 7. Deployment

To deploy the project on Vercel, push your code to a GitHub repository, then connect it to Vercel. Don’t forget to add the environment variables in Vercel as well.

## How to Use

1. **Login/Register:** Use the login form to access existing accounts or register for a new one.
2. **Dashboard:** After logging in, you'll be directed to your interactive dashboard, where you can view your data.
3. **Manage Data:** Use the provided options to add, edit, or delete data entries directly from the dashboard.
4. **Update Settings:** Access your user settings to update your profile and preferences.
5. **Log Out:** Click the logout button to securely end your session.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or create an issue for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or feedback, you can reach me at [kanishakpranjal@gmail.com](mailto:kanishakpranjal@gmail.com).
```

### Key Sections in the README

1. **Project Description:** A brief overview of what the project is about.
2. **Objective:** Lists the main goals of the project.
3. **Features:** Highlights key features of the application.
4. **How to Run This Next.js Project:** Provides detailed steps for setting up and running the project locally.
5. **How to Use:** Explains how users can interact with the dashboard.
6. **Contributing:** Encourages others to contribute to the project.
7. **License:** Mentions the license under which the project is shared.
8. **Contact:** Provides a way for users to reach out for inquiries or feedback.

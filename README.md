# self-blog
A CMS for personal blogging and showcasing projects.

## Overview
self-blog is a personal CMS (Content Management System) designed to power [blog.sjodinelias.com](https://blog.sjodinelias.com), where I share my journey, technical expertise, and creative projects. This application is built from scratch to provide a customizable blogging platform with a focus on simplicity, security, and scalability.

## Features
- **User Authentication**: Secure login system integrated with AWS Cognito.
- **Dashboard Management**:
  - Create, edit, delete, and feature posts.
  - Upload and manage thumbnails with real-time preview.
- **Post Editor**:
  - Markdown support with live preview.
  - Metadata editor (tags, summary, etc.).
- **Featured Posts**: Highlight specific posts for visibility.
- **Responsive Design**: Fully optimized for desktop and mobile users.
- **Media Management**:
  - Upload images directly to S3 buckets.
  - Automatic public URLs for content hosting.
- **Custom CMS Architecture**:
  - Public-facing blog.
  - Admin panel for managing content.

## Tech Stack
### Frontend
- **Framework**: SvelteKit (modern and reactive).
- **Styling**: Tailwind CSS for responsive and customizable designs.
- **Markdown Rendering**: Powered by marked.js.

### Backend
- **Hosting**: Vercel for deployment.
- **Storage**: AWS S3 for media hosting.
- **Authentication**: AWS Cognito for secure user login.
- **Database**: AWS DynamoDB for content management.

## Setup and Installation
Follow these steps to set up the project locally:

**1. Prerequisites**
- **Node.js**: Version 16 or higher.
- **AWS Account**: For Cognito, S3, and DynamoDB setup.
- **Vercel Account**: Optional, for hosting.

**2. Clone the Repository**
```bash
git clone https://github.com/ilittlebig/self-blog.git
cd self-blog
```

**3. Install Dependencies**
```bash
npm install
```

**4. Configure Environment Variables**

Create a .env file in the root directory and add the following variables:
```env
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_BUCKET_NAME=your-aws-s3-bucket-name

PUBLIC_USER_POOL_ID=your-cognito-user-pool-id
PUBLIC_USER_POOL_CLIENT_ID=your-cognito-user-pool-client-id
PUBLIC_AWS_REGION=your-aws-region

BLOG_POSTS_TABLE_NAME=your-dynamodb-table-name
```

**5. Run the Application**
```bash
npm run dev
```

## Deployment
### To Vercel
1. Create a new project in [Vercel](https://vercel.com/).
2. Connect your GitHub repository.
3. Add the environment variables in the Vercel dashboard.
4. Deploy your project.

### AWS Setup
- **S3**: Create a bucket for storing images (e.g., sjodinelias-blog-prod).
- **DynamoDB**: Create a table for storing posts (e.g., blog-posts).
- **Cognito**: Set up a User Pool for authentication.

## Usage
**1. Adding a New Post**
- Log in to the admin dashboard.
- Create a new post by filling out the title, content, summary, tags, and thumbnail.
- Save as a draft or publish immediately.

**2. Managing Posts**
- Edit or delete posts from the dashboard.
- Feature posts to highlight them on the homepage.

**3. Viewing Posts**
- Navigate to the public blog to see all published posts.
- Featured posts are displayed prominently on the homepage.

## Roadmap
1. Post Scheduling
2. Advanced Analytics and User Engagement Tracking
3. Enhanced SEO and Metadata Management
4. Content Versioning and Revision History
5. Multi-Author Support with Role-Based Access Control

## License
This project is licensed under the [MIT License](LICENSE). See the [LICENSE](LICENSE) file for details.

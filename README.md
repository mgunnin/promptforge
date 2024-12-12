# PromptForge

PromptForge is a modern prompt management application built for AI development. It provides a robust platform for creating, testing, and managing prompts with advanced features for collaboration and version control.

## Features

### Core Functionality

- 🔄 Prompt version control
- 🧪 Interactive prompt testing environment
- 📊 Performance metrics and analytics
- 🤝 Team collaboration support
- 🔑 API key management
- 🌓 Dark/light mode theming
- 📱 Responsive design

### Prompt Management

- Create and edit prompts with rich text support
- Import prompts from JSON, CSV, or TXT files
- Variable detection and management
- Test prompts with different models and parameters
- Track metrics including response time, token usage, and success rate

### Collaboration

- Team-based prompt sharing
- Role-based access control
- Version history tracking
- Collaborative editing features

### Security

- JWT-based authentication
- Secure API key rotation
- Password hashing with bcrypt
- Protected routes with middleware
- Secure database access

## Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **API Integration**: OpenAI API support
- **State Management**: React Context API
- **Testing**: Built-in test environment

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- PostgreSQL database
- OpenAI API key
- Bun package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/mgunnin/vl-promptforge.git
cd vl-promptforge
```

2. Install dependencies:

```bash
bun i
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Update the `.env.local` file with your database and API key details.

DATABASE_URL="postgresql://user:password@localhost:5432/promptforge"
NEXTAUTH_SECRET="your-secret-key"
OPENAI_API_KEY="your-openai-api-key"

5. Run the development server:

```bash
bun dev
```

Visit `http://localhost:3000` to see the application.

## Project Structure

```plaintext
src/
├── app/ # Next.js 14 app directory
│ ├── api/ # API routes
│ ├── auth/ # Authentication pages
│ ├── prompts/ # Prompt management pages
│ └── test/ # Prompt testing environment
├── components/ # Reusable UI components
├── contexts/ # React contexts
├── lib/ # Utility functions and services
│ ├── services/ # Core service classes
│ └── utils/ # Helper functions
├── prisma/ # Database schema and migrations
│ └── types/ # TypeScript type definitions
├── public/ # Public assets
├── styles/ # Global styles
├── types/ # TypeScript type definitions
├── utils/ # Utility functions
└── .env.local # Local environment variables
```

## Core Services

- **AIService**: Handles LLM provider interactions
- **AuthService**: Manages authentication and API keys
- **PromptService**: Handles prompt operations
- **UserService**: Manages user-related functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Database ORM by [Prisma](https://www.prisma.io/)
- Authentication by [NextAuth.js](https://next-auth.js.org/)

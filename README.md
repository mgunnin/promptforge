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

## Development Setup

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js 18.x or higher (we recommend using [nvm](https://github.com/nvm-sh/nvm) for Node.js version management)
- PostgreSQL 14.x or higher
- [Bun](https://bun.sh) package manager
- Git

### Local Development Environment

1. **Clone the Repository**

   ```bash
   git clone https://github.com/mgunnin/promptforge.git
   cd vl-promptforge
   ```

2. **Install Dependencies**

   ```bash
   bun i
   ```

3. **Set Up PostgreSQL Database**
   - Create a new PostgreSQL database:

     ```bash
     createdb promptforge
     ```

   - Or using psql:

     ```bash
     psql
     CREATE DATABASE promptforge;
     ```

4. **Configure Environment Variables**

   ```bash
   cp .env.example .env.local
   ```

   Update `.env.local` with your configuration:

   ```env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/promptforge"

   # Authentication
   NEXTAUTH_SECRET="your-generated-secret"  # Generate using: openssl rand -base64 32
   NEXTAUTH_URL="http://localhost:3000"

   # API Keys
   OPENAI_API_KEY="your-openai-api-key"
   ANTHROPIC_API_KEY="your-anthropic-api-key"  # Optional
   GOOGLE_API_KEY="your-google-api-key"        # Optional

   # Optional Configuration
   NODE_ENV="development"
   ```

5. **Initialize Database Schema**

   ```bash
   bun prisma generate   # Generate Prisma client
   bun prisma db push    # Push schema to database
   ```

6. **Run Development Server**

   ```bash
   bun dev
   ```

   The application will be available at [http://localhost:3000](http://localhost:3000)

7. **Run Tests**

   ```bash
   bun test             # Run unit tests
   bun test:e2e        # Run end-to-end tests
   ```

## Project Structure

```plaintext
src/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── prompts/           # Prompt management pages
│   └── test/              # Prompt testing environment
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   └── [feature]/        # Feature-specific components
├── contexts/             # React contexts
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and services
│   ├── services/         # Core service classes
│   └── utils/           # Helper functions
├── prisma/              # Database schema and migrations
├── types/               # TypeScript type definitions
└── middleware.ts        # Next.js middleware
```

## Core Services

### AIService (`lib/services/ai.service.ts`)

- Handles interactions with LLM providers (OpenAI, Anthropic, etc.)
- Manages API key rotation and rate limiting
- Implements retry logic and error handling

### AuthService (`lib/services/auth.service.ts`)

- Manages user authentication and session handling
- Implements role-based access control
- Handles API key management and validation

### PromptService (`lib/services/prompt.service.ts`)

- Core prompt CRUD operations
- Version control management
- Analytics and metrics tracking

### UserService (`lib/services/user.service.ts`)

- User management and preferences
- Team collaboration features
- Activity tracking

## Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. Fork the repository
2. Create a feature branch:

   ```bash
   git checkout -b feature/amazing-feature
   ```

3. Make your changes
4. Run tests and linting:

   ```bash
   bun test
   bun lint
   ```

5. Commit your changes:

   ```bash
   git commit -m 'Add some amazing feature'
   ```

6. Push to your fork:

   ```bash
   git push origin feature/amazing-feature
   ```

7. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Keep pull requests focused and atomic

### Code Style

- Use TypeScript for all new code
- Follow the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use Prettier for code formatting
- Write self-documenting code with clear variable/function names

### Testing

- Write unit tests for utility functions and services
- Add integration tests for API endpoints
- Include UI tests for critical user flows
- Maintain test coverage above 80%

### Documentation

- Update README.md for significant changes
- Add JSDoc comments for new functions and types
- Include inline comments for complex logic
- Update API documentation when endpoints change

### Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the package.json version if needed
3. Add a description of your changes in the PR
4. Link any related issues
5. Request review from maintainers
6. Ensure CI checks pass

## Troubleshooting

### Common Issues

1. **Database Connection Issues**

   ```bash
   # Check database status
   pg_isready -h localhost -p 5432
   
   # Verify connection string
   psql "your-connection-string"
   ```

2. **Prisma Issues**

   ```bash
   # Reset database
   bun prisma migrate reset
   
   # Regenerate client
   bun prisma generate
   ```

3. **Build Errors**

   ```bash
   # Clear Next.js cache
   rm -rf .next
   
   # Reinstall dependencies
   rm -rf node_modules
   bun i
   ```

### Getting Help

- Open an issue for bugs
- Join our Discord community for support
- Check existing issues and discussions
- Review documentation in the `/docs` directory

## License

This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Database ORM by [Prisma](https://www.prisma.io/)
- Authentication by [NextAuth.js](https://next-auth.js.org/)
- Styling with [Tailwind CSS](https://tailwindcss.com/)

# E-COMM Backend
## TECH STACK
For the backend the Technologies used are :
- .NET 8
- SQL SERVER (for local development)
- PostgresSql (for the live DB)

## Getting Started 
Follow these steps to set up and run the project locally.

### Prerequisites
- .NET 8 SDK 
Follow the instructions on this guide to install [.NET SDK](https://learn.microsoft.com/en-us/dotnet/core/install/) on your machine 

- SQL Server 
Follow this link to download [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) on your Machine if you would want to use SQL Server for 
the purpose of testing out this application and don't want to use at Enterprise level then 
the Express version is what i would recommend.

- Visual Studio 2022+ or VS Code
Follow this link to download [Visual Studio](https://learn.microsoft.com/en-us/visualstudio/install/install-visual-studio?view=vs-2022) and this for [VS Code](https://code.visualstudio.com/docs/setup/setup-overview)

- [Entity Framework Core CLI](https://learn.microsoft.com/en-us/ef/core/get-started/overview/install) 

### Setup Instructions
1. **Clone the repository**

Using Http 
```
git clone https://github.com/felixNT0/E-Commerce.git
cd Backend
```

Using SSH
```
git clone git@github.com:felixNT0/E-Commerce.git
cd Backend
```

2. **Install the Necessary Dependencies**
Run this to install the required project Dependencies

```
dotnet restore
```

3. **Set up the Database**

- Create an appsettings.Development.json file and include your database connection string:
```
"ConnectionStrings": {
    "SqlConnection" : "Server=localhost,1433;Database=YourDB;User Id=DBUserId; Password=DBPassword; TrustServerCertificate=True"
    }
```

- Seed The Database 
To make the set up as swift as possible you want to seed the database with Roles and 
Categories so you can go to the Program.cs file and then comment out

```
app.SeedRoles();
app.SeedCategories();
```
now after you run the application once you can remove the code 

4. **Apply database migrations**
```
dotnet ef database update
```

5. **Add the Required Configurations in the Appsettings.Development.json file** 
```
 "JWTSettings" : {
      "Secret": "Your JWT Secret key",
      "Audience" : "Your JWT Audience Url",
      "Issuer" : "Your JWT Issuer Url"
    },
  "PaystackSettings" : {
    "SecretKey" : "Paystack Secret Key"

  },
```

6. Run the application 
```
dotnet run 
```
This start the application on your local machine 

## Folder Structure 
The backend project is organized by feature and responsibility to maintain a clean, scalable, and testable architecture:

```
Backend/
│
├── EComm.App/                   # Main ASP.NET Core Web API application
│   ├── Controllers/             # API endpoints
│   ├── Contracts/               # Request/response contracts and interfaces
│   ├── Data/                    # Database context and seed data
│   ├── DTOs/                    # Data Transfer Objects for validation and response shaping
│   ├── Extensions/              # Extension methods for service configuration and utilities
│   ├── https/                   # Local dev certificates or related HTTPS configs
│   ├── Images/                  # Contains server-related images
│   ├── Migrations/              # EF Core migration files
│   ├── Models/                  # Entity models representing database tables
│   ├── Policies/                # Authorization policies
│   ├── Services/                # Business logic and service layer
│   ├── Shared/                  # Common logic/utilities reused across layers
│   ├── appsettings.json         # Default configuration
│   ├── appsettings.Development.json # Local environment-specific config
│   └── EComm.App.csproj         # Project file for the application
│
├── EComm.Tests/                 # xUnit test project
│   ├── Controllers/             # Unit tests for API controllers
│   ├── Services/                # Unit tests for service layer
│   └── EComm.Tests.csproj       # Project file for the test project
│
├── githooks/                    # Custom Git hooks used by the project
├── Dockerfile                   # Docker build definition
├── Backend.sln                  # Solution file referencing both projects
└── README.md                    # Project documentation

```

## Coding Practices 
The project is written primarily in C# (.NET 8) for the backend and follows modern architectural principles such as separation of concerns, dependency injection, and asynchronous programming. The following guidelines must be adhered to for consistency and maintainability across the codebase.

**C#**

- Use async and await for all I/O-bound operations such as database access and external API calls. 
  Avoid synchronous blocking (e.g., .Result, .Wait()).

- Service classes must follow the Interface-first approach. That is, all service implementations must be defined via an interface and registered via dependency injection.

- Use IConfiguration, IOptions<T>, or User Secrets for environment-specific or sensitive configurations. Do not hardcode secrets or API keys.

- Always validate user input using DTOs with Data Annotations ([Required], [EmailAddress], etc.). Never trust raw input from request bodies or query strings.

- Group related logic into meaningful namespaces such as Services, Policies, Controllers, and Contracts.

- Do not write business logic in controllers. Controllers should delegate responsibilities to services only.



**Architecture**

- Thin controllers, fat services — all business logic must reside in the service layer, not in controllers or models.

- Use DTOs for external exposure — Entity models must never be returned directly from controller actions.

- Use the MediatR or Command/Query pattern if complexity increases to enforce separation of concerns.

- Enforce role-based access control using ASP.NET’s built-in Authorize attributes and custom policies under the Policies folder.



FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy solution and project files
COPY ./Backend.sln .
COPY ./EComm.App/EComm.App.csproj ./EComm.App/
RUN dotnet restore ./EComm.App/EComm.App.csproj

# Copy the full app source
COPY ./EComm.App ./EComm.App
COPY ./EComm.App/https/aspnetapp.pfx ./EComm.App/https/aspnetapp.pfx

WORKDIR /src/EComm.App
RUN dotnet publish -c Release -o /app/out

# Stage 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

COPY --from=build /app/out ./

# Expose port for Render (or local development)
EXPOSE 10000
ENV ASPNETCORE_URLS=http://+:10000

# Entry point
ENTRYPOINT ["dotnet", "EComm.App.dll"]

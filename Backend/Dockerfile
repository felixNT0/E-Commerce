# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.sln .
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the code
COPY . ./
COPY https/aspnetapp.pfx /https/aspnetapp.pfx
WORKDIR /app

# Build the app
RUN dotnet publish -c Release -o out

# Use the ASP.NET runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out ./

# Expose port
EXPOSE 5280 
EXPOSE 443
ENV ASPNETCORE_URLS=https://+:443;http://+:5280

# Set the entry point
ENTRYPOINT ["dotnet", "EComm.dll"]

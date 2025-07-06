#!/bin/sh
echo "Pre-commit hook is running"
dotnet tool run csharpier format .
RESULT=$?
if [ $RESULT -ne 0 ]; then
  echo "❌ Code not formatted. Run 'csharpier .' and try again."
  exit 1
fi
echo "✅ Formatting passed. Proceeding with commit."
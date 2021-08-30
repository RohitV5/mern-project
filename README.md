dotennv - for environment variables //add .env file to gitignore

Project setup:
Create a mongodb cluster and add the config to .env file.
File exist in project as dotenv. Just rename and set the correct credentials.env file

Run cmd -> npm run dev
This will run two projects. One for react and other one for node.
Check package.json for more info.

Never save .env to github as it contains all your credentials. Add this to gitignore.
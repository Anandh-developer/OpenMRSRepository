Please follow the step to install Playwright


Pre requisites = nodeJS with latest version

Step 1: Install playwright with the below command

        npm install playwright


While installing the playwright please javascript as programming language


Step 2: run the below command npx playwright install


if you are facing any issue in XLSX library please run the below command and retry

npm install xlsx 


Cross Browser test:

for running the test in different browser please use the below code

npx playwright test --project=GooleChrome  # To Run the test in different browser like google chrome for you can fine the browser from playwright.config.js file

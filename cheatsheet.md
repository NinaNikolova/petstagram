# Cheat Sheet

1. Initialize project and structore- npm init -y; src; index.js
2. Setup dev environment
3. Install and setup Express
    * add static middleware
    * add body parser
    * add routes
4. Add static resources
5. Add views folder with ready htmls
6. Add express-handlebars view engine
    * install express-handlebars
    * add to express
    * config extension
    * config views folder (only if we use src)
    * add layouts - main
    * add partials folder
    * fix navigation to home page
    * render home page
    * fix static paths
7. Add controllers /our actioons/folder with homeController
8. Add database
    * install mongoose
    * connect database
9. Authentication
    * add userController
    * add controller to routes
    * fix header navigation to login, register, profile and logout
    * render login, register and profile page
10. Add user model
    * add uniq index for username
    * validate repeat password

11. Modify login and register pages
12. Add login and register post actions
13. Add user manager
    * require in user controller
    * add register method
    * validate if user already exists
14. Hash password
    * install bcrypt and cookie-parser
    * hash password
15. Login
    * find use by username
    * Validate password with hash
16. Generate jwt token
    * install jsonwebtoken
    * promisify jsonwebtoken
    * create secret
    * generate token in userManager.login
17. Return token in cookie
    * install cookie-parser
    * config cookie-parser in index.js
    * set cookie with token
18. Logout
19. Authentication middleware
   * create base middleware
   * use middleware
   * implement auth middleware
   * attach decodedToken to request
   * handle invalid token
20. Authorization
21. Dynamic navigation
    * add conditional in main layout
    * add to res locals
22. Error handling
       * add 404 page
    * redirect missing route to 404
    * add global error handler (optional)+
    * use global error handler after routes (optional) - in index.js
    * add error message extractor
23. Show error notifications
    * add error container to main layout
    * show error container conditionaly
    * pass error to render
    * add local error handler in controllers
24. Authomatically login after register






    Search in files in Visual Studio Code    ctrl + p      /    :14  -> go to 14 line, @ -> search by character/
    ctrl + t - open new tab
    ctrl + w - close new tab



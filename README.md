Steps for running the server :

1. npm install (to install all the required packages (dependencies)).
2. npm start (to start the server locally @ localhost:3000).

Project Structure :

1. Base file => index.js inside src directory.
2. Routes are configured inside routes.js under src directory.
3. All the styling files are kept inside styles directory, here sass preprocessor is used.
4. API endpoints is stored inside utils directory.
5. Pages directory includes the main components of all the routes currently we have => / , /:station_code , else all are error routes i.e. page not found.
6. All the internal components are stored at /src/components.
7. I have used Ant Design as UI framework in this project.

Routes :

base route : / =>

1. Bar graph to show the temperature of top 30 stations.
2. Search Bar to search the stations.
3. Top 30 station cards with delete and detail button.

detail route : /:station_code =>

1. Details of the selected station in tabular form.
2. Refresh button to fetch the updated data.

error route : else all routes are error routes =>

1. 404 page not found error.

NOTE : Detail page API was showing CORS issue that's why i have used heroku cors-anywhere. You can check it inside utils/api.
NOTE : There is no such API given to fetch the data for 30 stations for showing graph. So, i have to call detail's api 30 times that's why graph is taking higher time to show results.

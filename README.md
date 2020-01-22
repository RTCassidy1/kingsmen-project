This project is a solution to an exercise from Kinsmen-Software.  The exercise description can be found further down this page.


## Architecture

This is a docker-compose project with three containers

- A MongoDB Database
- A NodeJS Express server running the API to interact with the database
- A NodeJS server serving the UI which is written in React.

## Prerequisites
This project requires Docker be installed on your system in order to run.

## Setup

To run the server you need to run the following command in terminal from the root directory
```
docker-compose up
```
It will take a minute as the three containers are built. 

On the first launch, you need to seed the database (in a future release this may be done automatically)
#### Seeding the database
In a browser, navigate to http://localhost:8080/seed-table
This sends a call to the API which seeds the database with 10,000 lines of randomly generated 'movie' data.  

- note: **This is not idempotent**.  repeated calls to this endpoint will add an additional 10,000 lines of data to the database.  

#### Running the app
The application is served at  http://localhost:3000
When you first load the app, it will load the first 500 lines from the database.  (this is controlled by batchsize in the API).  

- You may load additional lines by scrolling to the bottom of the page **or** clicking on the *Load More* button.
- Clicking on the *refresh* button will clear any sorts and reload the first 500 lines into the table.
- Clicking on the header of any column will cause the table to be sorted by that column.  Successive clicks will toggle the sort direction.
  - Because the entire table is not stored in the browser, sorting makes an additional call to the database.  Only the first page (500 lines) of data is loaded after a sort.  You may load additional lines in the normal way. 

## Exercise:

We would like you to create a web page that displays 10,000 rows of data in a grid. The data itself, how it is presented, persisted, loaded, and served is all up to you! Here are some high-level guidelines to keep you progressing:

UI Framework  
- {React} 

Server Platform  
- {Node} 

Database Platform  
- {NoSQL} - MongoDB  

Infrastructure/Platform  
- {Local} 
- Dockerized containers (can be deployed to cloud or run locally)

Over the course of a one to two-hour meeting, please be prepared to discuss your design, your technology selections, how you handled the data, and your choices for presenting the data.

For additional discussion topics, think about additional UI functionality including but not limited to search, filtering and grouping.

Keep in mind:  While this may seem formal, we would like to this to be somewhat informal to see how we can work together discussing how you approach a software delivery ask, however contrived.  Your thought process is important to us, if you have questions, ask!  We will be playing the role of the team lead and interviewer to help keep the session interactive. We are heavy modelers, so if you like to express design through models, please do.  While you may be a little nervous, please remember to have fun!

This is an opportunity for us to understand your thought process, engineering skillset and ability to communicate your ideas. It is also an opportunity for you to learn more about our team and if you feel that there is a fit.

## Credits
I used the following tutorial to initially get up and running with this MERN stack
[https://dev.to/vguleaev/dockerize-a-react-app-with-node-js-backend-connected-to-mongodb-10ai](https://dev.to/vguleaev/dockerize-a-react-app-with-node-js-backend-connected-to-mongodb-10ai)

I also used this tutorial as inspiration for loading additional table rows while scrolling down the page
[https://alligator.io/react/react-infinite-scroll/](https://alligator.io/react/react-infinite-scroll/)
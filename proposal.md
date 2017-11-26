Name: Erik Gabrielsen           ID:   40354578

## Proposed Project

I expanded my scope a little bit. I made an application that will keep track of users tasks and subtasks that the user inputs.
This is a global task list that any user may add to. This will be useful for teams doing development together as users can view tasks and their importance in real time.


## Outline Structure

I will have a front end interface for the tasks. It will contain a CRUD application for tasks as well as adding subtasks to each task. In addition I will display a pie chart in order to depict the important of each subtask within a task. This is updated in real time as a Task Channel will be listening for updates submitted to it.

I will use postgres database for data persistent storage and a task and note Module will be responsible for handling api calls for both in the app.

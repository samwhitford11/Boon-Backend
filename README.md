# bOOn

##### This app lets users keep track of gift ideas and share personal gift ideas with others. Users will be able to add a person they wish to make a gift registry. Users will be able to see the list of gift ideas per person. They will click on one and view an individual gift, delete and update that gift as well as check it off as purchased.


[Trello Board Link]()

### Technologies Used

- JavaScript
- HTML
- CSS/SCSS
- Vue
- Mongoose
- MongoDB
- render.com
- Netlify

### Routes & Components

```
App --> Header 
App --> Outlet 
Outlet -- "/" --> Index
Outlet -- "/places/:id" --> Show
Outlet -- "/places/create" --> createAction
Outlet -- "/places/update/:id" --> updateAction
Outlet -- "/places/delete/:id" --> deleteAction
```

| Route | Element | Loader | Action | Summary |
| ----- | ------- | ------ | ------ | ------- |
| /     | Index   | indexLoader |   | Loads up list of individuals  |         |
| /gifts/:id | Show | showLoader |  | Loads up an individual's gift registry | 
| /gifts/create | Create|        | createAction | Handles submission of create form for one gift idea | 
| /gifts/update/:id | Update  |   | updateAction | Handles submission of update form for one gift idea  | 
| /gifts/delete/:id | Delete  |   | deleteAction | Handles submission of delete form for one gift idea |  

### User Stories

- As a user, I want to be able to see a list of my Groups/ People.
- As a user, I want to click on one of the people and it will direct me to the show page where it list gift ideas.
- As a user, I want to be able to add, edit, and delete gift ideas.
- As a user, I want to be able to check off gifts that have been purchased or delete gifts.


### Schema

<img src="https://i.imgur.com/9PSt2mi.png" width="300px">

### Wireframes/Mockups

#### Index Page - Desktop and mobile

<img src="https://i.imgur.com/asebM8O.png" width="400px">
<img src="https://i.imgur.com/Kt930s3.png" width="400px">

#### Show Page - Desktop and mobile

<img src="https://i.imgur.com/V9daAKs.png" width="400px">
<img src="https://i.imgur.com/avtZ8T6.png" width="400px">


### Weekly Plan

| Week | Goal |
|-----|------|
| 3/1 - 3/4 | Finalize project idea and new tech. Work on things needed to get project approved. Set up project and create main and dev branch in GitHub.|
| 3/5 - 3/11 | Complete Schema with fully deployed backend.|
| 3/12 - 3/18 | Study new tech and implement into frontend. |
| 3/19 - 3/25 | Work on styling the index and show page. |
| 3/26 - 3/31 | Finalize styling and test app to make final adjustments. |
| 4/1 | Present Capstone! |

### Link to Project

[Deployed Backend Page]()
[Deployed Frontend Page]()

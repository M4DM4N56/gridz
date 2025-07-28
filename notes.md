# PLANNING

### SHORT-TERM

1. make first tile in topster as card thumbnail
    - if first tile is empty, use some default image
    - add a nice hover overlay

2. implement proper navBar.
    - none on app/page
    - account and gridz page:
        - My Account | Search | Log Out

3. add some basic polish
    - update log in page buttons + input fields + error messages
        - fix mobile layout
    - change sidebar buttons to tabs
    - add extra settings to the sidebar
        - rounded corners (slider)
        - gap size by pixels (slider)
        - custom background color (look into rgb popup for users)
            - https://www.npmjs.com/package/react-colorful or `<input type="color">`

4. let users search up usernames
    - unique usernames?
    - "search" on the navbar at all times
    - users must enter the exact username of search
    - brings them to their account page
        - same as account page, but edit privileges removed

------------------------------ DEPLOY -------------------------------

5. export functionality
6. create user profile page
    - user's reviews, lists, and topsters can all be viewed here
7. reviews
    - users can search for an album, and give it a rating from 0-100
8. user album lists
    - lists have albums strung vertically, horizontal space is for user review num + text
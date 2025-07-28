# PLANNING

### SHORT-TERM

1. implement proper navBar.
    - none on app/page
    - account and gridz page:
        - My Account | Search | Log Out

2. add some basic polish
    - update log in page buttons + input fields + error messages
        - fix mobile layout
    - change sidebar buttons to tabs
    - add extra settings to the sidebar
        - rounded corners (slider)
        - gap size by pixels (slider)
        - custom background color (look into rgb popup for users)
            - https://www.npmjs.com/package/react-colorful or `<input type="color">`

3. let users search up usernames
    - unique usernames?
    - "search" on the navbar at all times
    - users must enter the exact username of search
    - brings them to their account page
        - same as account page, but edit privileges removed

------------------------------ DEPLOY -------------------------------

4. export functionality
5. create user profile page
    - user's reviews, lists, and topsters can all be viewed here
6. reviews
    - users can search for an album, and give it a rating from 0-100
7. user album lists
    - lists have albums strung vertically, horizontal space is for user review num + text
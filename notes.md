# GRIDZ NOTES

## PLANNING
### MVP
- log in functionality (firebase auth)
- one topster grid per account
- search  Last.fm albums
- place albums into grid
- download the topster as image


### SHORT-TERM
1. see if we can have usernames display at firebase instead of "PFI0LwrohPcA0rNVPOYluRBoel32"
2. update user flow
    - switch home button on gridz to account button, add 'log out' button on account
    - if user not logged in and tried to access any page, redirect to home page
3. keep users logged in until they log out
    - default users to their account page
----------------------------------- PUSH -----------------------------------
4. profile page
    - has profile picture + username
    - has navbar (redirects to gridz/profile/search)
5. update firestore and account page so user can store multiple topsters
----------------------------------- PUSH -----------------------------------
6. update topster
    - change sidebar buttons to tabs
    - add extra settings to the sidebar
        - rounded corners (slider)
        - gap size by pixels (slider)
        - custom background color (look into rgb popup for users)
            - https://www.npmjs.com/package/react-colorful or <input type="color">
------------------------------ PUSH + DEPLOY -------------------------------


### LONG-TERM
1. add hardcoded albums to searchbar
    - add functionality to click album, then it appears in first available empty slot
    - add functionality to drag them in
        - look into "react-dnd" or "dnd-kit"
2. connect to last.fm api and add search functionality
3. make settings tab for dimensions, title(s), background, font

4. improve on non-topster pages and header
5. connect to firebase and add auth for persistent data
    - topsters will be linked to gmail accounts via firebase auth
---------------------------DONE---------------------------
6. make multiple topsters possible per account 

---------------------------------------------------------------------------------------------

7. export functionality
8. create user profile page
    - user's reviews, lists, and topsters can all be viewed here
9. reviews
    - users can search for an album, and give it a rating from 0-100
10. user album lists
    - lists have albums strung vertically, horizontal space is for user review num + text
11. get friends to make an account :D


## WHAT I LEARNED ABOUT BACKEND + APIs
- nothing so far
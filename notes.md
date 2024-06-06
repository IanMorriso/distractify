## Todo

### Mar 9
- [ ] is adding websites working?
    - will effects start once a website has been added?
- [ ] should we add some testing?
- [ ] does the tool pass the list of effects correctly?
    - Ian is working on this today.
- [x] not sure if the word scrambler is advancing its randomness
    - it is.
- [x] fix trapped balls
- word scrambling has some weird effects where words break apart or contain
    characters that weren't present. 


### Sometime in the past...
- 
    - I converted the bouncingBall script to better OOP, and added a bunch of
    comments. Need to finish that work on wordScramble. 
    - Ian was working on getting the selected effects saved into the sync'd 
    storage. Once that is done, then we can integrate it with the existing
    background.js script to have it load each of the effects. 
    - how can I load the sites from the database when the background.js script
    runs for the first time
        - ok. fixed some code and set the right key in sync storage to grab
        the data from.

### Website Object Structure
- 
    - String:name Website URL
    - Array[effects]:effects

### Effect Object Structure
-
    - String:name 
    - Boolean:active
    - Array[params]:params

    

    
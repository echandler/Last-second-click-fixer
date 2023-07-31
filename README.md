# Last-second-click-fixer
Blocks Geoguessr click after network request is made.

### What problem does this fix?
At the end of a Geoguessr round a request is made to the server which lasts 100-500 milliseconds, in that time if you click on the map it will show the icon for a split second....but it didn't register the click, the network request was already made. So this script will attempt to block the icon from being shown on the map until the network request gets a response, then it unblocks the map. 

### Does it work all the time?
There appears to be other reasons for the click not to register in the last second of the round, this script attempts to fix what is probably the most common problem.

### How to install?
Click this link to install in Tampermonkey: [link](https://github.com/echandler/Last-second-click-fixer/raw/main/LastSecondClickFixer.user.js). If that doesn't work, open a new file in Tampermonkey and copy and past the wackScript.user.js file above in to it.

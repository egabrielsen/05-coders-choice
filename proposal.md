Name: Erik Gabrielsen           ID:   40354578

## Proposed Project

I will be creating a text parsing application. The web interface will have an input for
uploading text or a text field for entering text. The application will then parse the
file or text and display the word frequency for each word in the file as well as a letter
distribution list. I will also be able to pull other statistics such as vocabulary strength
and average word size used in the document. Could be interesting to upload technology papers
or literary texts and see the key words used in each. I will save the text info to a
postgres database to keep a overall record of text usage.


## Outline Structure

I will have a front end interface for the file upload. It will just consist of one html page and a controller that will talk to the Parser module.
The Module (ParserModule) will be in charge of reading in the file and be the main api point for the application. I will also have 2 other modules,
1 for word parsing, and the second will be for individual letter parsing. Then the ParserModule will communicate the desired results back to the front end interface.
I can use a supervisor to oversee the word and letter parsing so that each process is done in parallel.

# Node.Js-Exercise-1

SSO OAuth based server architecture

# Documentation

https://docs.google.com/document/d/1xfWBAOMMzR11eRwr3_A-C-3ZOgzfgdTNj35pKVyer6c/edit?usp=sharing

# Installation Steps

-Install all three servers(run `npm install` inside all three folders )

-Run Authentication Server (`node index.js` inside 'authentication-server-basic' folder )

-Register and obtain client credentials(clientId & clientSecret) from Authentication Server.

-Set environment variables CID(clientId) & CSECRET(clientSecret) for client server.

-Run Client Server (`node index.js` inside 'client-server-basic' folder )

-Run Resource Server (`node index.js` inside 'resource-server' folder )

-Create user via sign-up API path

-Obtain access_token via sign-in API path

-Use access_token in header of resource API request(/api/resources/books-available) to retrieve resources (available books) from Resource Server

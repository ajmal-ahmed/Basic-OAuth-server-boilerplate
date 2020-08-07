# Basic OAuth server boilerplate

OAuth based server architecture

![Architecture](https://github.com/ajmal-ahmed/Basic-OAuth-server-boilerplate/blob/master/images/authflow.PNG)


# Installation Steps


1. Install all three servers
2. Run Authentication Server
3. Register and obtain client credentials(clientId &amp; clientSecret) from Authentication Server.
4. Set environment variables CID(clientId) &amp; CSECRET(clientSecret) for client server.
5. Run Client Server
6. Create user via sign-up API path
7. Obtain access\_token via sign-in API path
8. Use access\_token in header of resource API request(/api/resources/books-available) to retrieve resources (available books) from Resource Server
# API Documentation

https://docs.google.com/document/d/1xfWBAOMMzR11eRwr3_A-C-3ZOgzfgdTNj35pKVyer6c/edit?usp=sharing

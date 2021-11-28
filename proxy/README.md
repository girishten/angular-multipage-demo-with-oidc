# Proxy

Proxy is handy when you need to run angular in local and wants to consume deployed WebAPI.
This to make api calls without CORS.
Adjust appropriate config file according to environment to do url rewrite.

    Default Environments added are:

    Local - To connect with Locally Running Server
    Dev - To connect with DEV Server
    Int - To connect with DEV Server
    Prod - To connect with Production Server

PS: Proxying happens outside your angular app's source code so do not expect it to be running on production.
For production, you must enable CORS with appropriate values.

PPS: Build Environments and Proxy Configs are completely different. All proxy configs will be applied while using default
environment is being used (Unless you specified that too explicitly in package.json script).

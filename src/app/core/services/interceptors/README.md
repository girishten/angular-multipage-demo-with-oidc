YOU MIGHT NOT EVEN NEED ANY OF IT or AT LEAST ALL OF THEM AT ONCE. USE THEM ONLY IF NECESSARY

# Interceptors

A place for Angular's HTTP Interceptors.

## ErrorInterceptor

HTTP Interceptors for http errors. It can do error masking, retry without noticing the caller and alert user about the fail.

## CacheInterceptor

It helps RESTful APIs do client-side caching of API response.
Until there is a POST, PATCH, DELETE, PUT request to the resource url client may use cached GET response.
HTTP GET requests with a header 'no-cache' should be allowed to pass.

For aggressive architectural pattern client may use cached Resp immediately then updates UI with latest no cache resp. This significantly improves ui availability.

## NotifyInterceptor

Used to throw Http Event Notifications.
Eg: POST -> Save in progress, do not close window.
PATCH -> Updating...

## ProfilerInterceptor

Helpful for profiling at the time of performance turning.

## LoaderInterceptor

Helpful if there is a need for http action in progress notification.

## HttpsInterceptor

Fail-Safe by converting all http call to https.

## HeaderInterceptor

Helps in setting up common headers and taking decision based on already available ones.

## FakeInterceptor

Helps in dev for faking an API call.

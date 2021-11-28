# Adaptors

Adaptor helps to transform API response JSON into Desirable Object Model.
This will remove dependency API Response should always be in the same JSON Structure required for the angular project.
Most cases this is can't be full-filled completely, since there are multiple client project.
Additional to that adaptors will create a fail-safe from API Response model change.

Therefore, adaptors are crucial in multi-platform applications and long term maintenance since REST API provides resource urls and meaningful HTTP Methods.
This might not be compilable for your application since APIs are common for all consumer apps are listening to Same API.

Read more about [Angular Adaptors design pattern](https://dev.to/florimondmanca/consuming-apis-in-angular--the-model-adapter-pattern-3fk5)

# Build Environments

Build Environments are intended to build for different environments. [Official Documentation](https://angular.io/guide/build).

It is best if you follow the below pattern.

    Anything That is Common for across application - Add it to appropriate config file or create new one if needed.
    Anything That is Common But value changes according to the environment - Add it to appropriate environment file.

Provided Build Environments added are:

    environment.ts - Uses while running angular locally.
    Dev - Intended to build for DEV Server Environment.
    Int - Intended to build for INT Server Environment.
    Prod - Intended to build for Production Setup.

PS: Build environments are supposed to supply config according to intended server environment while building.
And this usage different from environments you can find in proxy config.

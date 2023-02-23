# OlympicGamesStarter

This application presents data about Olympic games from several countries. A general Piechart displays total medals per country, and the user can get more specific information by clicking on a country. 
There, a line charts presents all the medals won over time by a specific country. The total number of athletes and participations is also displayed. 

This application is responsive with the Bootstrap CSS framework. I can be run on a smartphone. 

## Tools 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.3.

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## File structure

The project architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)

The `olympic.service.ts` is the main service to handle the olympic data stream. 
The `error.service.ts` is a basic service to handle errors created from the Observables. 
The typescript interfaces are inside the `models` folder.These files correspond to the data included inside the `olympic.json`.

## Licence 

As a study project, this code is provided under the GNU public license, giving a lot of freedom to use it. 
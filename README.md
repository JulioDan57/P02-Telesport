# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version ng20.2.3. It also use chart.js v4.5.0, and ng2-charts v8.0.0".

Don't forget to install your node_modules before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.
In case of error :
[ERROR] TS2307: Cannot find module 'chart.js/dist/types/utils' or its corresponding type declarations.
Open the file "node_modules/ng2-charts/lib/ng-charts.provider.d.ts", and replace the line:
import { DeepPartial } from 'chart.js/dist/types/utils';
By
import { DeepPartial } from 'node_modules/chart.js/dist/types/utils';
The you can rerun `ng serve`.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Where to start

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default angular architecture) the following:

- `components` folder: contains every reusable components
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)

Good luck!

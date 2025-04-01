// client/src/main.js
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Assuming you have JS version of AppModule

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
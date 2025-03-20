import { provideRouter } from '@angular/router';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { MyPreset } from './core/themes/mytheme';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideAnimationsAsync(),
        provideAnimationsAsync(),
        providePrimeNG({
          ripple: true,
            theme: {
                preset: MyPreset,
            }
        })
    ]
};

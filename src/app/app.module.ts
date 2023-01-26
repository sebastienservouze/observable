import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { AppComponent } from './app.component';
import { TryBlocComponent } from './try-bloc/try-bloc.component';

@NgModule({
  declarations: [
    AppComponent,
    TryBlocComponent
  ],
  imports: [
    BrowserModule,
    HighlightModule,
    RouterModule.forRoot([])
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          typescript: () => import('highlight.js/lib/languages/typescript'),
          css: () => import('highlight.js/lib/languages/css'),
        },
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

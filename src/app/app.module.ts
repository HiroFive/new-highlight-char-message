import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TwitchClientService } from 'src/services/twitchClient/twitch-client.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [TwitchClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { combineLatestWith, takeUntil } from 'rxjs/operators';
import { BagesType } from 'src/1';
import { TwitchClientService } from 'src/services/twitchClient/twitch-client.service';
import * as tmi from 'tmi.js';
import * as googleTTS from 'google-tts-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy  {
  bagesSet = { badge_sets: {} };
  tmiClient = new tmi.Client({
    channels: ['hirogive'],
  });

  private unsubscribe$ = new Subject<void>();

  constructor(private readonly twitchClient: TwitchClientService) {}

  ngOnInit(): void {
    this.connectTMIClient();

    this.twitchClient
      .getBadgesTyType(BagesType.Global)
      .pipe(
        combineLatestWith(this.twitchClient.getBadgesTyType(BagesType.Channels)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(([globalBages, channelsBages]) => {
        this.bagesSet.badge_sets = {
          ...globalBages?.badge_sets,
          ...channelsBages?.badge_sets,
        };
      });
    this.setTMIOnEvent();
  }

  connectTMIClient() {
    this.tmiClient.connect();
  }

  setTMIOnEvent() {
    this.tmiClient.on('message', (channel, tags, message, self) => {
      if(tags['msg-id'] === 'highlighted-message') {
        const url = googleTTS.getAudioUrl(message, {
          lang: 'uk',
          slow: false,
          host: 'https://translate.google.com',
        });
        console.log(url);
        console.log(`${tags['display-name']}: ${message}`);
        console.log(tags, message, self);
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.tmiClient.disconnect();
  }
}


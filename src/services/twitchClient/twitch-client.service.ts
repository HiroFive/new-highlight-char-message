import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BagesType } from 'src/1';
import { BASE_Bages_URL } from 'src/1/constant/base-url.const';
import { IBagesSet } from 'src/1/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TwitchClientService {
  constructor(private readonly httpClient: HttpClient) {}

  serviceTest() {
    console.log(`I'm work`);
  }

  getBadgesTyType(bageType: BagesType): Observable<IBagesSet> {
    const ACCOUNT_ID=163668097 // TODO: move to env
    let url = `${BASE_Bages_URL}/${bageType}${bageType === BagesType.Channels ? `/${ACCOUNT_ID}` : ''}/display?language=en`

    return this.httpClient.get<IBagesSet>(url);
  }
}

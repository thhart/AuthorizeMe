import { Injectable } from '@angular/core';
import {Identified} from "./model/identified";

@Injectable({
  providedIn: 'root',
})
export class UtilityService {

  syncArrays(originalArray: Identified[], updatedList: Identified[]): void {
    const updatedMap = new Map(updatedList.map(item => [item.id, item]));
    const foundIds = new Set<string>();

    for (let i = 0; i < originalArray.length; i++) {
      const originalItem = originalArray[i];
      const updatedItem = updatedMap.get(originalItem.id);
      if (updatedItem) {
        originalArray[i] = updatedItem;
        foundIds.add(updatedItem.id);
      }
    }

    for (const [id, item] of updatedMap) {
      if (!foundIds.has(id)) {
        originalArray.push(item);
      }
    }

    for (let i = originalArray.length - 1; i >= 0; i--) {
      if (!updatedMap.has(originalArray[i].id)) {
        originalArray.splice(i, 1);
      }
    }
  }
}

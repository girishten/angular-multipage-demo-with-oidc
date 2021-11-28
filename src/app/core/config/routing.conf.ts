import { ExtraOptions } from '@angular/router';
import { useHash } from './app.conf';

export const ROUTING_OPTIONS: ExtraOptions = {
  // preloadingStrategy: CustomPreloadingStrategy,
  useHash,
  initialNavigation: !useHash ? 'enabled' : 'disabled',
};

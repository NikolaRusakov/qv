import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'viSanitize',
})
export class SanitizePipe implements PipeTransform {
  constructor(private readonly sanitizer: DomSanitizer) {}

  transform(
    value: string,
    args: SecurityContext = SecurityContext.NONE,
  ): string | null | SafeUrl {
    console.log(this.sanitizer.sanitize(args, value));
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}

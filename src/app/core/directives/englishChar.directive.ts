import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[EnglishChar]'
})
export class EnglishCharDirective {
  previousValue = '';

  // --------------------------------------
  //  Regular expressions
  englishChar =
    '^[a-zA-Z0-9 ^<>{}"/|;:.,~!?@#$%^=&*\\]\\\\()\\[¿§«»ω⊙¤°℃℉€¥£¢¡®©_+-]+$';
  /**
   * Class constructor
   * @param hostElement
   */
  constructor(private hostElement: ElementRef) {}

  /**
   * Event handler for host's change event
   * @param e
   */
  @HostListener('change', ['$event']) onChange(e) {
    this.validateValue(this.hostElement.nativeElement.value);
  }

  /**
   * Event handler for host's paste event
   * @param e
   */
  @HostListener('paste', ['$event']) onPaste(e) {
    // get and validate data from clipboard
    const value = e.clipboardData.getData('text/plain');
    this.validateValue(value);
    e.preventDefault();
  }

  /**
   * Event handler for host's keydown event
   * @param event
   */
  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    const originalValue: string = e.target['value'];
    const key: string = this.getName(e);
    const controlOrCommand = e.ctrlKey === true || e.metaKey === true;

    // allowed keys apart from numeric characters
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Escape',
      ' ',
      'Tab',
      'Home',
      'End',
      'Delete',
      '.',
      ',',
      '-'
    ];

    // allow some non-numeric characters
    if (
      allowedKeys.indexOf(key) !== -1 ||
      // Allow: Ctrl+A and Command+A
      (key === 'a' && controlOrCommand) ||
      // Allow: Ctrl+C and Command+C
      (key === 'c' && controlOrCommand) ||
      // Allow: Ctrl+V and Command+V
      (key === 'v' && controlOrCommand) ||
      // Allow: Ctrl+X and Command+X
      (key === 'x' && controlOrCommand) || (e.keyCode === 32)
    ) {
      // let it happen, don't do anything
      return;
    }

    // save value before keydown event
    this.previousValue = originalValue;

    // allow number characters only
    const isNumber = new RegExp(this.englishChar).test(key);
    if (isNumber) {
      return;
    } else {
      e.preventDefault();
    }
  }

  /**
   * Test whether value is a valid number or not
   * @param value
   */
  validateValue(value: string): void {
    // test number with regular expression, when
    // number is invalid, replace it with a zero
    const valid: boolean = new RegExp(this.englishChar).test(value);
    this.hostElement.nativeElement['value'] = valid ? value : '';
  }

  /**
   * Get key's name
   * @param e
   */
  getName(e): string {
    if (e.key) {
      return e.key;
    } else {
      // for old browsers
      if (e.keyCode && String.fromCharCode) {
        switch (e.keyCode) {
          case 8:
            return 'Backspace';
          case 9:
            return 'Tab';
          case 32:
            return ' ';
          case 27:
            return 'Escape';
          case 37:
            return 'ArrowLeft';
          case 39:
            return 'ArrowRight';
          case 36:
            return 'Home';
          case 35:
            return 'End';
          case 46:
            return 'Delete';
          case 188:
            return ',';
          case 190:
            return '.';
          case 109:
            return '-'; // minus in numbpad
          case 173:
            return '-'; // minus in alphabet keyboard in firefox
          case 189:
            return '-'; // minus in alphabet keyboard in chrome
          default:
            return String.fromCharCode(e.keyCode);
        }
      }
    }
  }
}

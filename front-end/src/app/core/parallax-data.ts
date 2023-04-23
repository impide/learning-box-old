import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[parallaxItem]',
})
export class ParallaxItemDirective implements OnInit {
  @Input() top: string | number;
  @Input() left: string | number;
  @Input() rotate: number = 30;
  @Input() opacity: number = 1;
  @Input() inversion: boolean = false;
  @Input() movement: number = 0.025;

  public newX: string | number;
  public newY: string | number;
  constructor(private eleRef: ElementRef) {}

  ngOnInit(): void {
    this.eleRef.nativeElement.style.position = 'absolute';
    this.eleRef.nativeElement.style.top = this.top;
    this.eleRef.nativeElement.style.left = this.left;
    this.eleRef.nativeElement.style.transform = `translate(0px, 0px) rotate(${ this.rotate }deg)`;
    this.eleRef.nativeElement.style.opacity = this.opacity;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(e: any): void {
    this.movement = this.movement ? this.movement : 0.025;

    const cursorX = e.pageX;
    const cursorY = e.pageY;

    if (!this.inversion) {
      this.newX = cursorX * this.movement;
      this.newY = cursorY * this.movement;
    } else {
      this.newX = -(cursorX * this.movement);
      this.newY = -(cursorY * this.movement);
    }

    this.eleRef.nativeElement.style.transform = `translate(${ this.newX }px, ${ this.newY }px) rotate(${ this.rotate }deg)`;
  }
}

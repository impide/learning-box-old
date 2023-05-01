import { Component, OnInit } from '@angular/core';
import { IParallax } from '../../interfaces';

@Component({
  selector: 'app-parallax',
  templateUrl: './parallax.component.html',
  styleUrls: ['./parallax.component.scss']
})
export class ParallaxComponent implements OnInit {
  public parallax_item: IParallax;

  ngOnInit(): void {
    this.parallax_item = {
      top: "15%",
      left: "8%",
      size: "tiny",
      rotate: 10,
      opacity: 1,
      inversion: true,
      movement: 0.025,
    }
  }
}

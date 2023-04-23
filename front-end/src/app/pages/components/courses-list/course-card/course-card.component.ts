import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() courseLabel: string;
  @Input() coursePoster: string;
  @Input() courseVideo: string;
  @Input() courseAuthor: string;
  @Input() coursePrice: number;
}

import { Component, Input } from '@angular/core';
import { IUser } from 'src/app/interfaces';

@Component({
  selector: 'app-course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss']
})
export class CourseCardComponent {
  @Input() courseLabel: string;
  @Input() coursePoster: string;
  @Input() courseAuthor: IUser;
  @Input() coursePrice: number;
  @Input() courseVideo: string;
  @Input() overrideCourseProperty?: boolean;
  @Input() overrideTitleProperty?: boolean;
}

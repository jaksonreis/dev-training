import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Courses } from './entities/couses.entity';

@Injectable()
export class CoursesService {
  private courses: Courses[] = [
    {
      id: '1',
      name: 'Fundamentos NestJS',
      description: 'Aprendendo a trabalhar com este framework',
      tags: ['node.js', 'nestjs', 'javascript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    const course = this.courses.find((course) => course.id === id);
    if (!course) {
      throw new HttpException(
        `Course ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  create(createCourseDto) {
    const newCourse = {
      id: String(this.courses.length + 1),
      ...createCourseDto,
    };
    this.courses.push(newCourse);
    return this.findOne(String(this.courses.length));
  }

  update(id: string, updateCourseDto) {
    const indexCourse = this.courses.findIndex((course) => course.id === id);
    this.courses[indexCourse] = updateCourseDto;
  }

  remove(id: string) {
    const indexCourse = this.courses.findIndex((course) => course.id === id);
    if (indexCourse >= 0) {
      this.courses.splice(indexCourse, 1);
    }
  }
}

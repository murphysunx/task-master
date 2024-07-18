import { Task } from './task';

describe('Task', () => {
  let task: Task;

  beforeEach(() => {
    task = new Task('1', 'title', '2022-11-11', '2022-11-12', '1');
  });

  it('should be defined', () => {
    expect(task).toBeDefined();
  });

  it('should return the title', () => {
    expect(task.getTitle()).toBe('title');
  });

  it('should set the title', () => {
    task.setTitle('new title');
    expect(task.getTitle()).toBe('new title');
  });

  it('should return the description', () => {
    task.setDescription('description');
    expect(task.getDescription()).toBe('description');
  });

  it('should have completed fasle by default', () => {
    expect(task.isCompleted()).toBe(false);
  });

  it('should set completed true', () => {
    task.setCompleted(true);
    expect(task.isCompleted()).toBe(true);
  });

  it('should set completed false', () => {
    task.setCompleted(false);
    expect(task.isCompleted()).toBe(false);
  });

  it('should return the created at date', () => {
    expect(task.getCreatedAt()).toBe('2022-11-11');
  });

  it('should return the updated at date', () => {
    expect(task.getUpdatedAt()).toBe('2022-11-12');
  });

  it('should return the created by user id', () => {
    expect(task.getCreatedBy()).toBe('1');
  });
});

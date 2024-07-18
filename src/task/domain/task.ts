export class Task {
  private description: string;
  private completed: boolean;

  constructor(
    public readonly id: string,
    private title: string,
    private readonly createdAt: string,
    private readonly updatedAt: string,
    private readonly createdBy: string,
  ) {
    this.completed = false;
  }

  public getDescription(): string {
    return this.description;
  }

  public setDescription(description: string): void {
    this.description = description;
  }

  public isCompleted(): boolean {
    return this.completed;
  }

  public setCompleted(completed: boolean): void {
    this.completed = completed;
  }

  public getCreatedAt(): string {
    return this.createdAt;
  }

  public getTitle(): string {
    return this.title;
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public getUpdatedAt(): string {
    return this.updatedAt;
  }

  public getCreatedBy(): string {
    return this.createdBy;
  }
}

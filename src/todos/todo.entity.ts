import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('increment')
  id: number
  
  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: TodoStatus

  @CreateDateColumn()
  createdAt?: Date

  @UpdateDateColumn()
  updatedAt?: Date
}

export enum TodoStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED"
}
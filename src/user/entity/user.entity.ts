import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from 'typeorm'
import { Logger } from '@nestjs/common'

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({
    length: 30,
    nullable: false,
    unique: true,
  })
  public login: string

  @Column({
    length: 100,
    unique: true,
    nullable: false,
  })
  public email: string

  @Column({
    length: 80,
  })
  public firstName: string

  @Column({
    length: 80,
    nullable: true,
  })
  public lastName: string

  @Column({
    length: 30,
    nullable: false,
    select: false,
  })
  public password: string

  @Column({
    name: 'date_create',
    default: () => 'NOW()', // tslint:disable-line
  })
  public dateCreate: Date

  @AfterInsert()
  protected afterSave(): void {
    Logger.log(`${this.email} User has been saved`, 'info')
  }
}

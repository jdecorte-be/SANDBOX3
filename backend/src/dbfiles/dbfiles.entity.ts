import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Dbfiles {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  filename: string;

  @Column({
    nullable: true,
    type: 'bytea',
  })
  data: Uint8Array;
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TypeCategory } from './type-category.entity';

@Entity('types_categories_items')
export class TypeCategoryItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  types_categories_id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => TypeCategory, (typeCategory) => typeCategory.items)
  @JoinColumn({ name: 'types_categories_id' })
  type_category: TypeCategory;
}

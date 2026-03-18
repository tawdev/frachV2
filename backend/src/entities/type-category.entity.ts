import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { TypeEntity } from './type.entity';
import { TypeCategoryItem } from './type-category-item.entity';

@Entity('types_categories')
export class TypeCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  category_id: number;

  @Column({ nullable: true })
  types_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.type_categories)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => TypeEntity)
  @JoinColumn({ name: 'types_id' })
  type: TypeEntity;

  @OneToMany(() => TypeCategoryItem, (item) => item.type_category)
  items: TypeCategoryItem[];
}

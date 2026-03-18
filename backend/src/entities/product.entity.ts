import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from './category.entity';
import { TypeCategory } from './type-category.entity';
import { TypeCategoryItem } from './type-category-item.entity';
import { TypeEntity } from './type.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  image: string;

  @Column()
  category_name: string; // From 'category' column in SQL

  @Column({ default: 0 })
  stock: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ nullable: true })
  category_id: number;

  @Column({ nullable: true })
  type_category_id: number;

  @Column({ nullable: true })
  types_categories_items_id: number;

  @Column({ nullable: true })
  types_id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  max_longueur: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  max_largeur: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  longueur: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  largeur: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Longueur maximale en cm (pour produits sur mesure)' })
  max_length: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, comment: 'Largeur maximale en cm (pour produits sur mesure)' })
  max_width: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => TypeCategory)
  @JoinColumn({ name: 'type_category_id' })
  type_category: TypeCategory;

  @ManyToOne(() => TypeCategoryItem)
  @JoinColumn({ name: 'types_categories_items_id' })
  type_category_item: TypeCategoryItem;

  @ManyToOne(() => TypeEntity)
  @JoinColumn({ name: 'types_id' })
  type: TypeEntity;
}

import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';


@Entity('postagens')
export class Postagem {

  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true, length: 50 })
  titulo: string;

  @Column({ type: 'text', nullable: false })
  conteudo: string;

  @Column({ nullable: false, type: 'boolean', default: true })
  visivel?: boolean;

  @Column({ type: 'text', nullable: true })
  usuario_cadastrador?: string;

  @Column({ type: 'text', nullable: true })
  usuario_atualizador?: string;

  @CreateDateColumn({ nullable: false, type: "timestamp", default: () => 'CURRENT_TIMESTAMP'  })
  data_criacao: Date;

  @UpdateDateColumn({ nullable: false, type: "timestamp", default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'  })
  data_atualizacao: Date;

  @Column({ type: 'text', nullable: true })
  foto_url?: string; 
}
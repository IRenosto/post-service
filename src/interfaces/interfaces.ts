export interface IParamsIdGlobal { id?: number;  [key: string]: any; }

export interface IBodyCreatePostagens {
  titulo: string;
  conteudo: string;
  visivel?: boolean;
  usuario_cadastrador?: string;
  usuario_atualizador?: string;
  foto_url?: string;
}

export interface IBodyUpdatePostagens {
  titulo?: string;
  conteudo?: string;
  visivel?: boolean;
  usuario_atualizador?: string;
  foto_url?: string;
}

export interface IBodyCreatePostagensController {
  titulo: string;
  conteudo: string;
  visivel?: boolean;
  file?: Express.Multer.File;
}

export interface IBodyUpdatePostagensController {
  titulo?: string;
  conteudo?: string;
  visivel?: boolean;
  file?: Express.Multer.File;
}

export interface IQueryGetPostagens {
  page?: number;
  limit?: number;
  filter?: string;
}

export interface IUsuarioPermissoes {
  id: number
  nome: string
  sobrenome: string
  permissoes: string[]
}
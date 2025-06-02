import { z } from 'zod';
import { validation } from '../middlewares';

export const createPostagemValidation = validation({
    body: z.object({
      titulo: z.string().min(3, 'Titulo deve ter no mínimo 3 caracteres').max(50, 'Titulo deve ter no maximo 50 caracteres'),
      conteudo: z.string().min(3, 'Conteudo deve ter no mínimo 3 caracteres'),
       visivel: z
      .union([z.boolean(), z.string()])
      .transform((val) => {
        if (typeof val === 'boolean') return val;
        return val === 'true';
      })
      .optional(),
    }),
  });

export const deletePostagemValidation = validation({
  params: z.object({
    id: z.string()
      .transform((val) => parseInt(val, 10))
      .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
  }),
});

export const getAllPostagensValidation = validation({
  query: z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
    filter: z.string().optional(),
  }),
});

export const getPostagemByIdValidation = validation({
  params: z.object({
    id: z.string()
      .transform((val) => parseInt(val, 10))
      .refine(val => !isNaN(val) && val > 0, { message: 'ID deve ser maior que 0' })
  }),
});

export const getPostagensVisiveisValidation = validation({
  query: z.object({
    page: z.coerce.number().default(1),
    limit: z.coerce.number().default(10),
    filter: z.string().optional(),
  }),
});
export const updatePostagemValidation = validation({
  body: z.object({
    titulo: z.string().min(3, 'Titulo deve ter no mínimo 3 caracteres').max(50, 'Titulo deve ter no maximo 50 caracteres').optional(),
    conteudo: z.string().min(3, 'Conteudo deve ter no mínimo 3 caracteres').optional(),
    visivel: z
      .union([z.boolean(), z.string()])
      .transform((val) => {
        if (typeof val === 'boolean') return val;
        return val === 'true';
      })
      .optional(),
  }),
});
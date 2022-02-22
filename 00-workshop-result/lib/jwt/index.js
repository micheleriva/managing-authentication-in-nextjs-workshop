import { createSigner, createDecoder, createVerifier } from 'fast-jwt';

const secret = process.env.JWT_SECRET;

export const sign = createSigner({ key: secret });

export const verifier = createVerifier({ key: secret });

export const decode = createDecoder();


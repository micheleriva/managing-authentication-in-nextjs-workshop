import { createSigner, createDecoder, createVerifier } from 'fast-jwt';

export const sign = createSigner({ key: 'secret' });

export const verifier = createVerifier({ key: 'secret' });

export const decode = createDecoder();

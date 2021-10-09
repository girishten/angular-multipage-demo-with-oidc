/**
 * Following IdentityClaim Interface is based on https://demo.identityserver.io/
 * Your OIDC Provider may have different keys. Read appropriate OIDC Provider's Documentation
 */
export interface IdentityClaims {
  nbf: number;
  exp: number;
  iss: string;
  aud: string;
  nonce: string;
  iat: number;
  at_hash: string;
  s_hash: string;
  sid: string;
  sub: string;
  auth_time: number;
  idp: string;
  amr: string[];
  name: string;
  given_name: string;
  family_name: string;
  email: string;
  email_verified: boolean;
  website: string;
}

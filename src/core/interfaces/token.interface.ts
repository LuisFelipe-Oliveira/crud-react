export interface Token {
  /**
   * Token de acesso para API
   */
  access_token: string;
  /**
   * Tipo de token (bearer, basic, etc)
   */
  token_type: string;
  /**
   * Tempo de expiração do token 
   */
  expires_in: number;
}
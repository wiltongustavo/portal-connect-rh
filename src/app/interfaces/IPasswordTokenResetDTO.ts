export interface IResetPasswordTokenResponseDTO {
  resetToken: string;
}
export interface IResetPasswordTokenRequestDTO {
  email: string;
}

export interface IResetPasswordRequestDTO {
  token: string;
  newPassword: String;
}
export interface IResetPasswordResponseDTO {
  email: string;
  message: string;
}

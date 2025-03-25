/* eslint-disable @typescript-eslint/no-explicit-any */
// Arquivo para configuração do Pixel do Facebook
export const FB_PIXEL_ID = "836787038464506"; // Substitua pelo seu ID real

declare global {
  interface Window {
    fbq: (...args: any[]) => void;
  }
}

// Função para disparar eventos de visualização de página
export const pageview = () => {
  window.fbq("track", "PageView");
};

// Função para eventos personalizados
export const event = (name: string, options: Record<string, any> = {}) => {
  window.fbq("track", name, options);
};

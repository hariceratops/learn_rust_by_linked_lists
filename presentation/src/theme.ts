export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    [key: string]: string;
  };
  font: string;
}

export const default_theme: Theme = {
  colors: {
    primary: '#1f77b4',
    secondary: '#ff7f0e',
    background: '#ffffff',
    text: '#000000',
    error: '#d62728',
  },
  font: 'Source Code Pro'
};

export const theme: Theme = default_theme;

import { defineConfig } from 'eslint/config';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';

export default defineConfig([
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      globals: {
        // Adicione aqui seus globals se precisar
      },
    },
    env: {
      browser: true,
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'react-refresh': reactRefreshPlugin,
    },
    rules: {
      'react-refresh/only-export-components': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'no-unsafe-finally': 'off',
      'no-unused-vars': 'off',
      'react/jsx-key': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    // Aqui você pode usar o extends do eslint tradicional com FlatCompat, mas é mais comum importar configs pronto
  },
]);

module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist'], // Removed '.eslintrc.cjs' from ignorePatterns
    parserOptions: { ecmaVersion: 2020, sourceType: 'module' }, // Updated ecmaVersion
    settings: { react: { version: 'detect' } }, // Updated react version to 'detect'
    plugins: ['react', 'react-hooks'], // Removed 'react-refresh' as it's unnecessary
    rules: {
        'react/jsx-no-target-blank': 'off',
        'no-unused-vars': 'warn',
        'react/prop-types': 'off',
        'react-hooks/rules-of-hooks': 'error', // Added rule for enforcing rules of hooks
        'react-hooks/exhaustive-deps': 'warn', // Added rule for exhaustive-deps
    },
}

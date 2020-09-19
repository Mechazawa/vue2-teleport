module.exports = {
    extends: '@mapcreator',
    rules: {
        'prefer-destructuring': 'off',
        'max-depth': 'off',
        'max-params': 'off',
        'max-len': 'off',
        'max-lines': 'off',
        'max-lines-per-function': 'off',
    },
    overrides: [
        {
            files: ['*CM.vue', '*SVG*.vue', '*WYSIWYG*.vue'],
            rules: {
                'vue/match-component-file-name': 'off',
            },
        },
    ],
};

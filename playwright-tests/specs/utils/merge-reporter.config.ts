export default {
    reporter: [
        ['html', { outputFolder: 'artifacts/merged/html', open: 'never' }],
        ['json', { outputFile: 'artifacts/merged/combined.json' }],
        ['junit', { outputFile: 'artifacts/merged/combined.xml' }],
    ],
};

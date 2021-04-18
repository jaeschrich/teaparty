import html from './html';

test('html stripping works', () => {
    expect(html`
        <div>${"hi"}
            <p>Hi ${0}!</p>
        </div>
    `).toBe("<div>hi\n    <p>Hi 0!</p>\n</div>")
})
import playground from '../pages/playground-page';
import { TEST_DATA } from '../test-data/playground-data';
import percySnapshot from '@percy/testcafe';

fixture `Your playground`
    .page `https://keenonred.github.io/`;

test('Icon changing color', async t => {
    const icon = playground.icon.nth(0);
    await percySnapshot(t, 'Nothing clicked');

    await t.click(icon);
    await playground.validateIconColor(icon, 'rgb(255, 27, 58)');

    await t.click(icon);
    await playground.validateIconColor(icon, 'rgb(199, 199, 199)');
});

test('Clicking all icons in the outer perimeter', async t => {
    await t.setNativeDialogHandler(() => true);

    await playground.clickOuterPerimeter();

    const dialogHistory = await t.getNativeDialogHistory();

    await t
        .expect(dialogHistory[0].type).eql('prompt')
        .expect(dialogHistory[0].text).eql('Done! Ready for the next try? Give me a size [3-9]:');
});

for (let i = 0; i < TEST_DATA.VALID_SIZE.length; i++) {
    const size = TEST_DATA.VALID_SIZE[i];

    test('Create new playground grid, size: ' + size, async t => {
        await t.setNativeDialogHandler(() => size, { dependencies: { size }});

        await playground.clickOuterPerimeter();

        await t.expect(size).eql(Math.sqrt(await playground.icon.count));
    });
}

for (let i = 0; i < TEST_DATA.INVALID_SIZE.length; i++) {
    const size = TEST_DATA.INVALID_SIZE[i];

    test('Try to create invalid size grid, size: ' + size, async t => {
        await t
            .setNativeDialogHandler((type) => {
                switch (type) {
                    case 'prompt':
                        return size;
                    case 'alert':
                        return true;
                }
            }, { dependencies: { size }})

        await playground.clickOuterPerimeter();

        const dialogHistory = await t.getNativeDialogHistory();

        await t
            .expect(dialogHistory[0].text).eql('Not a good size!')
            .expect(TEST_DATA.DEFAULT_SIZE).eql(Math.sqrt(await playground.icon.count));
    });
}

test('Cancel prompt', async t => {
    await t.setNativeDialogHandler(() => false);

    const size = TEST_DATA.VALID_SIZE[0];

    await t.navigateTo(TEST_DATA.TEST_PAGE_LINK + '?width=' + size + '&height=' + size);

    await playground.clickOuterPerimeter();

    await t.expect(size).eql(Math.sqrt(await playground.icon.count), 'Grid size should not reset');
});

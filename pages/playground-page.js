import { Selector, t } from 'testcafe';

class Playground {
    constructor() {
        this.icon = Selector('.mainGrid .icon');
    }

    async clickOuterPerimeter() {
        const icons = this.icon;
        const iconsCount = await icons.count;
        const size = Math.sqrt(iconsCount);

        for (let index = 0; index < iconsCount; index++) {
            if (index < size || index % size === 0 || index % size === size - 1 || index > size * (size - 1)) {
                await t.click(icons.nth(index));
            }
        }
    }

    async validateIconColor(icon, color) {
        await t.expect(icon.getStyleProperty('color')).eql(color);
    }
}

export default new Playground();

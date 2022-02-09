⚠️ **This is the documentation for v1. Please check the "v0"-Branch for documentation of older versions.** ⚠️

# Storybook Design Token Addon

[![Netlify Status](https://api.netlify.com/api/v1/badges/de6a7567-7e09-4753-a3b9-5a058dc8f03f/deploy-status)](https://app.netlify.com/sites/storybook-design-token-v1/deploys)

Display design token documentation generated from your stylesheets and icon files. Preview design token changes in the browser. Add your design tokens to your Storybook Docs pages using the custom Doc Blocks.

**[Show me the demo](https://storybook-design-token-v1.netlify.app/?path=/story/components-button--button)**

![Teaser image](docs/teaser.png)

**Contents:**

- [Storybook Design Token Addon](#storybook-design-token-addon)
  - [Get started](#get-started)
  - [Available presenters](#available-presenters)
  - [Advanced configuration](#advanced-configuration)
  - [Design Token Doc Block](#design-token-doc-block)
  - [Browser support](#browser-support)
  - [Migration from v0.x.x](#migration-from-v0xx)

## Get started

First, install the addon.

```sh
$ yarn add --dev storybook-design-token
```

Add the addon to your storybook addon list inside `.storybook/main.js`:

```javascript
module.exports = {
  addons: ['storybook-design-token']
};
```

Next, add the addon configuration to your `.storybook/preview.js` file. The addon works by parsing your stylesheets and svg files (token files) and extracting design token information. Therefore you need to tell the addon where your token files are located. The example below should work for most project setups. It assumes that your token files are located somewhere under a `src` directory, and use the default file extensions (.css, .less, .scss, .svg).

```javascript
const tokenContext = require.context(
  '!!raw-loader!../src',
  true,
  /.\.(css|less|scss|svg)$/
);

const tokenFiles = tokenContext.keys().map(function (filename) {
  return { filename: filename, content: tokenContext(filename).default };
});

export const parameters = {
  designToken: {
    files: tokenFiles
  }
};
```

The last step is to annotate your design tokens with a category name and a presenter. You can do this by adding special comment blocks to your stylesheets. Below is an example of a css stylesheet defining three categories ("Animations", "Colors", "Others"). It works the same way for scss and less files.

```css
:root {
  /**
  * @tokens Animations
  * @presenter Animation
  */

  --animation-rotate: rotate 1.2s infinite cubic-bezier(0.55, 0, 0.1, 1);

  /**
  * @tokens Colors
  * @presenter Color
  */

  --b100: hsl(240, 100%, 90%); /* Token Description Example  @presenter Color */
  --b200: hsl(240, 100%, 80%);
  --b300: hsl(240, 100%, 70%);

  /**
  * @tokens Others
  */
  --border-normal: 3px dashed red; /* Token Description Example @presenter BorderRadius */
}
```

The presenter controls how your token previews are rendered. See the next section for a complete list of available presenters. You can omit the presenter definition if you don't want to render a preview or no presenter works with your token.

To list your svg icons, the addon parses your svg files searching for svg elements. **Important: Only svg elements with an `id` or `data-token-name` attribute are added to the token list.** You can provide descriptions and category names for your icons using the (optional) attributes `data-token-description` and `data-token-category`.

## Available presenters

Please check the **[demo](https://storybook-design-token-v1.netlify.app/?path=/story/components-button--button)** to see the presenters in action.

- Animation
- Border
- BorderRadius
- Color
- Easing
- FontFamily
- FontSize
- FontWeight
- LetterSpacing
- LineHeight
- Opacity
- Shadow
- Spacing

## Advanced configuration

You can specify the default tab shown in the addon panel. Set it to the corresponding category name.

```javascript
export const parameters = {
  designToken: {
    defaultTab: 'Colors',
    files: tokenFiles
  }
};
```

To inject styles needed by your design token documentation, use the `styleInjection` parameter. A typical usecase are web fonts needed by your font family tokens. Please note that the styleInjection parameter only works with valid css.

```javascript
export const parameters = {
  designToken: {
    files: tokenFiles,
    styleInjection:
      '@import url("https://fonts.googleapis.com/css2?family=Open+Sans&display=swap");'
  }
};
```

## Design Token Doc Block

This addon comes with a custom Storybook Doc Block allowing you to display your design token documentation inside docs pages.

```tsx
// colors.stories.mdx

import { DesignTokenDocBlock } from 'storybook-design-token/dist/doc-blocks';

<DesignTokenDocBlock categoryName="Colors" viewType="card" />;
```

The `categoryName` parameter references your token category name (the part after `@tokens` in your stylesheet annotations). The `viewType` parameter can be set to `card` or `table` to switch between both presentations. In some cases you might want to hide the token values. You can do that by passing `showValueColumn={false}`.
Check the [demo file](https://github.com/UX-and-I/storybook-design-token/blob/v1/demo/src/design-tokens/colors.stories.mdx) for usage examples.

## Browser support

- All modern browsers
- Internet Explorer 11

## Migration from v0.x.x

- Please check the [Get started](#get-started) section for the updated addon configuration.
- v1.x.x no longer supports the recognition of hard coded token values. In my experience the usefulness was pretty limited by the amount of false positive results. Feel free to open an issue if you want that feature back in v1.

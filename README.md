# react-native-fast-toast

[![Version][version-badge]][package]
[![MIT License][license-badge]][license]

Toast component for React Native, supports Android, IOS and Web

## Features

- Fully Customizable
- Swipe to close support
- Smooth animation
- Fully typed with TypeScript

## Demo

![](https://user-images.githubusercontent.com/61647712/92497391-8864e900-f20e-11ea-93d8-bacc2b856583.gif)

[react-native-web Demo](https://arnnis.github.io/react-native-fast-toast/)

## Install

Open a Terminal in the project root and run:

```sh
yarn add react-native-fast-toast
```

## Example
Wrap your app in the `ToastProvider`, which provides context for the Toast hook.
```js
import { ToastProvider } from 'react-native-fast-toast'

export default function App() {
  return (
    <ToastProvider>
      <RestOfYourApp />
    <ToastProvider/>
  );
}
```

Then use hook like this everywhere in your app:
```js
import { useToast } from 'react-native-fast-toast'

const Component = () => {
  const toast = useToast()
  
  useEffect(() => {
    toast.show("Hello World", {
      type: 'success | danger | warning | normal | custom',
      position: 'top | bottom',
      duration: 4000,
      offset: 30,
      animationType: 'slide-in | zoom-in'
    })
  }, [])
}
```

## Global Example

Alternatively, To call toasts everywhere (even outside of React components like in redux actions), do this in root component of your app (index.js or App.js)

```js
import Toast from "react-native-fast-toast";

export default function App() {
  return (
    <>
      <RestOfYourApp />
      <Toast ref={(ref) => global['toast'] = ref} />
    </>
  );
```

Now you can call `toast.show()` everywhere on app. similar to `alert`.

TypeScript Note: add [index.d.ts](/example/index.d.ts) to your project root.

## Toast Type

```js
toast.show("Task finished successfully", { type: "success" });
```

## Toast Icon

```js
toast.show("Task finished successfully", { icon: <Icon /> });
```

or

```js
<Toast
  ref={toast}
  icon={<Icon />}
  successIcon={<SuccessIcon />}
  dangerIcon={<DangerIcon />}
  warningIcon={<WarningIcon />}
/>
}
```

## Customize

```js
toast.show("Task finished successfully", {
  duration: 5000,
  style: { padding: 0 },
  textStyle: { fontSize: 20 },
});
```

You can customize default options in Toast component

```js
<Toast 
  duration={5000} 
  textStyle={{ fontSize: 20 }}
  successColor="green"
  dangerColor="red"
  warningColor="orange"
  normalColor="gray"
/>
```

## Placement

```js
<Toast
  placement="bottom | top" // default to bottom
  offset={50} // distance from bottom or top. ( default to 60 )
/>
```

## Contributing

Pull request are welcome.

While developing, you can run the [example app](/example) to test your changes.

## Donation
If this project helped you reduce time to develop, you can buy me a cup of coffee :)

<a href="https://www.buymeacoffee.com/arnnis" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-red.png" alt="Buy Me A Coffee" height="50" ></a>

## Hire

Looking for a React/React-Native Expert? Email at alirezarzna@gmail.com

## License
MIT

[version-badge]: https://img.shields.io/npm/v/react-native-fast-toast.svg?style=flat-square
[package]: https://www.npmjs.com/package/react-native-fast-toast
[license-badge]: https://img.shields.io/static/v1?label=License&message=MIT&color=success&style=flat-square
[license]: https://github.com/arnnis/react-native-fast-toast/blob/master/LICENSE

import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Toast, { ToastOptions, ToastProps } from "./toast";

const dims = Dimensions.get("window");

export interface Props extends ToastOptions {
  offset?: number;
}

interface State {
  toasts: Array<ToastProps>;
}

class ToastContainer extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      toasts: [],
    };
  }

  static defaultProps = {
    placement: "bottom",
    offset: 60,
  };

  show = (message: string | JSX.Element, toastOptions?: ToastOptions) => {
    let id = toastOptions?.id || Math.random().toString();
    const onClose = () => this.hide(id);

    requestAnimationFrame(() => {
      this.setState({ toasts: this.state.toasts.filter((t) => t.id !== id) });
      this.setState({
        toasts: [
          {
            id,
            onClose,
            message,
            ...toastOptions,
          },
          ...this.state.toasts,
        ],
      });
    });

    return id;
  };

  update = (
    id: string,
    message: string | JSX.Element,
    toastOptions?: ToastOptions
  ) => {
    this.setState({
      toasts: this.state.toasts.map((toast) =>
        toast.id === id ? { ...toast, message, ...toastOptions } : toast
      ),
    });
  };

  hide = (id: string) => {
    this.setState({ toasts: this.state.toasts.filter((t) => t.id !== id) });
  };

  renderBottomToasts() {
    const { toasts } = this.state;
    let { offset } = this.props;
    let style: ViewStyle = {
      bottom: offset,
      justifyContent: "flex-end",
      flexDirection: "column",
    };
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : undefined}
        style={[styles.container, style]}
        pointerEvents="box-none"
      >
        {toasts
          .filter((t) => !t.placement || t.placement === "bottom")
          .map((toast) => (
            <Toast key={toast.id} {...this.props} {...toast} />
          ))}
      </KeyboardAvoidingView>
    );
  }

  renderTopToasts() {
    const { toasts } = this.state;
    let { offset } = this.props;
    let style: ViewStyle = {
      top: offset,
      justifyContent: "flex-start",
      flexDirection: "column",
    };
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "position" : undefined}
        style={[styles.container, style]}
        pointerEvents="box-none"
      >
        {toasts
          .filter((t) => t.placement === "top")
          .map((toast) => (
            <Toast key={toast.id} {...this.props} {...toast} />
          ))}
      </KeyboardAvoidingView>
    );
  }

  render() {
    return (
      <>
        {this.renderTopToasts()}
        {this.renderBottomToasts()}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    position: "absolute",
    width: dims.width,
    maxWidth: dims.width,
    overflow: "hidden",
    bottom: 100,

    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 5,
    zIndex: 999,
    left: 0,
    right: 0,
  },
  message: {
    color: "#333",
  },
});

export default ToastContainer;

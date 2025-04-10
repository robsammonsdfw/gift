// ThemeEventEmitter.ts
type Listener = () => void;

class ThemeEventEmitter {
  private listeners: Listener[] = [];

  addListener(listener: Listener) {
    this.listeners.push(listener);
    return () => this.removeListener(listener);
  }

  removeListener(listener: Listener) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  emit() {
    this.listeners.forEach(listener => listener());
  }
}

const themeEventEmitter = new ThemeEventEmitter();

export const emitThemeChange = () => {
  themeEventEmitter.emit();
};

export default themeEventEmitter;
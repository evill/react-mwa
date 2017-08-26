import { ModuleWrapper } from '../components';

export let moduleWithComponent = (Module) => (Component) => {
    let ModuleComponent = class extends ModuleWrapper {};

    Object.defineProperty(ModuleComponent, 'OriginComponent', {
        value: Component,
        configurable: false,
        enumerable: false,
        writable: false
    });

    Object.defineProperty(ModuleComponent, 'moduleName', {
        value: Module.moduleName,
        configurable: false,
        enumerable: false,
        writable: false
    });

    return ModuleComponent;
};

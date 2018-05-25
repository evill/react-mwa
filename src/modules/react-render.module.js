import React from 'react'
import ReactDOM from 'react-dom';
import { Application } from '../components';

export class ReactRenderModule {
    static _wrappers = null;
    static _ownWrappersCreated = false;

    /**
     * Registers new component wrapper
     * @param {Function} wrapper
     */
    static registerWrapper(wrapper) {
        /** To prevent changes in array of parent wrappers in case inheritance */
        if (!this._ownWrappersCreated) {
            /** Parent wrappers will be resolved on call of method getWrappers*/
            this._wrappers = [];
            this._ownWrappersCreated = true;
        }

        this._wrappers.push(wrapper);
    }

    static getWrappers() {
        const ownWrappers = this._wrappers || [];

        if (typeof(super.getWrappers) === 'function') {
            return super.getWrappers().concat(ownWrappers)
        }

        return  ownWrappers;
    }

    static registerWrappers(...args) {
        for (let wrapper of args) {
            this.registerWrapper(wrapper);
        }
    }

    constructor(app) {
        this.app = app;
        this.ioc = null;
    }
    configure(ioc) {
        this.ioc = ioc;
    }
    run() {
        ReactDOM.render(
            (
                <Application app={module.app}>
                    {this._renderWrapperElement()}
                </Application>
            ),
            this.getContainer(),
            this.renderCallback.bind(this)
        );
    }

    _renderWrapperElement() {
        this.constructor.getWrappers().reverse().reduce(
            (element, wrapper) => wrapper(element, this),
            this.render()
        )
    }

    render() {
        throw new Error(`Method ${this.constructor.name}.render is not implemented!`);
    }

    getContainer() {
        throw new Error(`Method ${this.constructor.name}.getContainer is not implemented!`);
    }

    renderCallback() {}
}

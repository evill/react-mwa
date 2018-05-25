import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import {} from 'mwa';

export class Application extends Component {
    constructor(props, context) {
        super(props, context);
        this.app = props.app;
    }

    getChildContext() {
        return { app: this.app }
    }

    render() {
        return Children.only(this.props.children)
    }
}

Application.propTypes = {
    app: IocPropTypes.iocResolverType.isRequired,
    children: PropTypes.element.isRequired
};

Application.childContextTypes = {
    app: IocPropTypes.iocResolverType.isRequired
};



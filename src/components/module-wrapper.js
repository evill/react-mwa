import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'

export class ModuleWrapper extends Component {

}


ModuleWrapper.OriginComponent = null;

Object.defineProperty(ModuleWrapper, 'displayName', {
    get: function () {
        return this.OriginComponent.displayName || this.OriginComponent.name || 'ModuleWrapper';
    }
});

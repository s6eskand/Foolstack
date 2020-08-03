import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import uuidv4 from 'uuid/v4';

function getMapDispatchToProps(actionCreators) {
    return function (dispatch) {
        return bindActionCreators(actionCreators, dispatch);
    };
}

function getDisplayName(WrappedComponent) {
    if (WrappedComponent.displayName != null) {
        return WrappedComponent.displayName;
    } else if (WrappedComponent.name != null) {
        return WrappedComponent.name;
    } else {
        return 'Component';
    }
}

/**
 * WithShipment is a React Higher Order Component (HOC) that provides
 * dispatcher and connector for redux.
 * All parameter that can be passed are optional and will depend on the need of
 * each component. The accepted parameters are described below.
 *
 * export default withShipment({
 * actionCreators,
 * mapStateToProps
 * }, MyComponent);
 *
 * @param {object} options
 *
 * @param {Function} options.mapStateToProps - Maps state values from the redux
 * store to component props. In WithShipment it is used the same way as with the
 * redux's *connect* HOC.
 *
 * @param {object.<[propKey], Function>} options.actionCreators - Maps a propKey
 * that will be passed to the wrapped component as a prop to a redux action
 * creator.
 *
 */

const withShipment = (options, WrappedComponent) => {
    const selectors = [];
    const modules = [];

    class WithShipment extends React.PureComponent {
        _mounted = false;

        state = {
            hash: uuidv4(),
        };

        constructor(props) {
            super(props);
        }

        componentDidMount() {
            this._mounted = true;
        }

        componentWillUnmount() {
            this._mounted = false;
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    }

    WithShipment.displayName = `WithShipment(${getDisplayName(
        WrappedComponent
    )})`;

    const mapStateToPropsCombined = (state, props) => {
        let combined = {};
        if (options.mapStateToProps != null) {
            combined = {
                ...combined,
                ...options.mapStateToProps(state, props),
            };
        }
        if (selectors.length > 0) {
            for (const selector of selectors) {
                combined[selector.sdkHelperKey] = selector.selector(state);
            }
        }
        return combined;
    };

    const useMapStateToProps =
        options.mapStateToProps != null || selectors.length > 0;
    const useMapDispatchToProps = options.actionCreators != null;

    const getWithShipmentRenderable = () => {
        const mapStateToProps = useMapStateToProps ? mapStateToPropsCombined : null;
        const mapDispatchToProps = useMapDispatchToProps
            ? getMapDispatchToProps(options.actionCreators)
            : null;
        return connect(mapStateToProps, mapDispatchToProps)(WithShipment);
    };

    const WithShipmentRenderable = getWithShipmentRenderable();
    return WithShipmentRenderable;
};

export default withShipment;
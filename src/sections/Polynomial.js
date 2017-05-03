/**
 * Section on polynomial regression.
 */
import _ from 'lodash';
import Flexbox from 'flexbox-react';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { actions } from '../reducers/polynomial';
import DataMatrix from '../components/DataMatrix';
import Equation from '../components/Equation';
import Regression from '../Regression';
import RegressionChart from '../components/RegressionChart';
import Spacer from '../layout/Spacer';

class Polynomial extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,

    dispatch: PropTypes.func.isRequired,
    onPointDrop: PropTypes.func.isRequired,
  };

  render() {
    const data = this.props.data.map(p => [p.x, p.y]);

    const linearReg = new Regression(
      'linear',
    ).fit(data);
    const polyReg2 = new Regression(
      'polynomial',
      2,
    ).fit(data);
    const polyReg5 = new Regression(
      'polynomial',
      5,
    ).fit(data);

    return (
      <section>
        <h2>Polynomial Regression</h2>
        <p>
          What if our data have a nonlinear pattern?
        </p>

        <Flexbox justifyContent="space-between">
          <RegressionChart
            title="Linear Regression?..."
            xLabel="Sweetness"
            yLabel="Overall Rating"
            width={400}
            height={400}
            axisBounds={{
              x: { min: 0, max: 15 },
              y: { min: 3.5, max: 7 },
            }}
            data={this.props.data}
            regression={linearReg}
            onPointDrop={this.props.onPointDrop}
          />
          <DataMatrix data={this.props.data} col={'x'} />
          <DataMatrix data={this.props.data} col={'y'} />
        </Flexbox>

        <Equation
          eqn={linearReg.equation()}
          xName="Sweet"
          yName="Overall rating"
        />

        <Spacer />

        <Flexbox>
          <RegressionChart
            title="Polynomial Regression, degree 2"
            xLabel="Sweetness"
            yLabel="Overall Rating"
            width={400}
            height={400}
            axisBounds={{
              x: { min: 0, max: 15 },
              y: { min: 3.5, max: 7 },
            }}
            data={this.props.data}
            regression={polyReg2}
            onPointDrop={this.props.onPointDrop}
          />
          <DataMatrix
            data={this.props.data}
            col={'x'}
            label={'X'}
            degree={2}
          />
          <DataMatrix data={this.props.data} col={'y'} />
        </Flexbox>

        <Equation
          eqn={polyReg2.equation()}
          xName="Sweet"
          yName="Overall rating"
        />

        <Spacer />

        <RegressionChart
          title="Polynomial Regression, degree 5"
          xLabel="Sweetness"
          yLabel="Overall Rating"
          width={400}
          height={400}
          axisBounds={{
            x: { min: 0, max: 15 },
            y: { min: 3.5, max: 7 },
          }}
          data={this.props.data}
          regression={polyReg5}
          onPointDrop={this.props.onPointDrop}
        />
        <Flexbox>
          <DataMatrix
            data={this.props.data}
            col={'x'}
            label={'X'}
            degree={5}
          />
          <DataMatrix data={this.props.data} col={'y'} />
        </Flexbox>
        <Spacer amount={20} />
        <Equation
          eqn={polyReg5.equation()}
          yName="Overall rating"
        />
      </section>
    );
  }
}

const mapStateToProps = state => state.polynomial;
const mapDispatchToProps = dispatch => {
  return {
    onPointDrop: (index, point) =>
      dispatch(actions.polynomial.setDatum(index, point)),
    dispatch,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Polynomial);
import React, { Component } from 'react';

// tslint:disable-next-line:no-import-side-effect
import './range.scss';

export interface RangeProps {
  size: number;
  onChange(value: number): void;
}

export interface RangeState {
  value: number;
}

export class Range extends Component<RangeProps, RangeState> {
  public static defaultProps = {
    size: 10
  };

  constructor(props: RangeProps, state: RangeState) {
    super(props, state);

    this.state = {
      value: 1
    };
  }

  public render() {

    return <div className='range'>
      {Array.from(Array(this.props.size)).map((v, i) =>
        <span
          key={i}
          className={(i + 1) <= this.state.value ? 'selected' : ''}
          onClick={() => this.select(i + 1)} role='button'
        ></span>
      )}
    </div>;
  }

  public select(value: number) {
    this.setState({value});
    if (this.props.onChange) this.props.onChange(value);
  }
}

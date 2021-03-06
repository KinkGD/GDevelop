// @flow
import { Trans } from '@lingui/macro';
import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import LocalFolderPicker from '../UI/LocalFolderPicker';
import { sendNewGameCreated } from '../Utils/Analytics/EventSender';
import { Column, Line } from '../UI/Grid';
import { findExamples } from './LocalExamplesFinder';
import optionalRequire from '../Utils/OptionalRequire.js';
import { findEmptyPath } from './LocalPathFinder';
import ExamplesList from './ExamplesList';
const path = optionalRequire('path');
const electron = optionalRequire('electron');
const app = electron ? electron.remote.app : null;
var fs = optionalRequire('fs-extra');

type Props = {|
  onOpen: string => void,
  onExamplesLoaded: () => void,
|};

type State = {|
  outputPath: string,
  exampleNames: ?Array<string>,
|};

export default class LocalExamples extends Component<Props, State> {
  state = {
    outputPath: findEmptyPath(
      path && app ? path.join(app.getPath('home'), 'GDevelop projects') : ''
    ),
    exampleNames: null,
  };

  componentDidMount() {
    findExamples(examplesPath => {
      fs.readdir(examplesPath, (error, exampleNames) => {
        if (error) {
          console.error('Unable to read examples:', error);
          return;
        }

        this.setState(
          {
            exampleNames: exampleNames.filter(name => name !== '.DS_Store'),
          },
          () => this.props.onExamplesLoaded()
        );
      });
    });
  }

  _handleChangePath = (outputPath: string) =>
    this.setState({
      outputPath,
    });

  createFromExample = (exampleName: string) => {
    const { outputPath } = this.state;
    if (!fs || !outputPath) return;

    findExamples(examplesPath => {
      fs.mkdirsSync(outputPath);
      fs.copySync(path.join(examplesPath, exampleName), outputPath);
      this.props.onOpen(path.join(outputPath, exampleName + '.json'));
      sendNewGameCreated(exampleName);
    });
  };

  render() {
    return (
      <Column noMargin>
        <Column>
          <p>
            <Trans>Choose or search for an example to open:</Trans>
          </p>
        </Column>
        <Line>
          <ExamplesList
            exampleNames={this.state.exampleNames}
            onCreateFromExample={this.createFromExample}
          />
        </Line>
        <Divider />
        <Line expand>
          <Column expand>
            <LocalFolderPicker
              fullWidth
              value={this.state.outputPath}
              onChange={this._handleChangePath}
              type="create-game"
            />
          </Column>
        </Line>
      </Column>
    );
  }
}

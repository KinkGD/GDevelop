// @flow
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import BaseEditor from '../BaseEditor';
import Window from '../../../Utils/Window';
import { Line } from '../../../UI/Grid';
import GDevelopLogo from './GDevelopLogo';
import ScrollBackground from './ScrollBackground';
import RaisedButton from 'material-ui/RaisedButton';
import { Trans } from '@lingui/macro';

const styles = {
  innerContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: 350,
  },
  centerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 400,
  },
  logoPaper: {
    margin: 10,
    padding: 5,
    width: '100%',
    textAlign: 'center',
  },
  buttonsPaper: {
    width: '100%',
  },
};

class StartPage extends BaseEditor {
  constructor() {
    super();

    this.state = {
      aboutDialogOpen: false,
    };
  }

  getProject() {
    return undefined;
  }

  updateToolbar() {
    if (this.props.setToolbar) this.props.setToolbar(null);
  }

  render() {
    const {
      project,
      canOpen,
      onOpen,
      onCreate,
      onOpenProjectManager,
      onCloseProject,
      onOpenAboutDialog,
      onOpenHelpFinder,
    } = this.props;

    return (
      <ScrollBackground>
        <div style={styles.innerContainer}>
          <Line expand justifyContent="center">
            <div style={styles.centerContainer}>
              <Paper
                zDepth={1}
                style={{
                  ...styles.logoPaper,
                }}
              >
                <GDevelopLogo />
                <p>
                  <Trans>
                    GDevelop is an easy-to-use game creator with no programming
                    language to learn.
                  </Trans>
                </p>
              </Paper>
              {!project && canOpen && (
                <RaisedButton
                  label={<Trans>Open a project</Trans>}
                  fullWidth
                  onClick={onOpen}
                  primary
                />
              )}
              {!project && (
                <RaisedButton
                  label={<Trans>Create a new project</Trans>}
                  fullWidth
                  onClick={onCreate}
                  primary
                />
              )}
              {!!project && (
                <RaisedButton
                  label={<Trans>Open Project Manager</Trans>}
                  fullWidth
                  onClick={onOpenProjectManager}
                  primary
                />
              )}
              {!!project && (
                <FlatButton
                  label={<Trans>Close project</Trans>}
                  fullWidth
                  onClick={onCloseProject}
                />
              )}
              {
                <FlatButton
                  label={<Trans>Search the documentation</Trans>}
                  fullWidth
                  onClick={onOpenHelpFinder}
                />
              }
            </div>
          </Line>
          <Line alignItems="center" justifyContent="space-between">
            <div>
              <FlatButton
                label={<Trans>About GDevelop</Trans>}
                onClick={onOpenAboutDialog}
              />
              <FlatButton
                label={<Trans>Gdevelop Forums</Trans>}
                onClick={() =>
                  Window.openExternalURL('http://forum.compilgames.net')
                }
              />
              <FlatButton
                label={<Trans>Help and tutorials</Trans>}
                onClick={() =>
                  Window.openExternalURL(
                    'http://wiki.compilgames.net/doku.php/gdevelop5/start'
                  )
                }
              />
            </div>
            <div>
              <IconButton
                iconClassName="icon-facebook"
                onClick={() =>
                  Window.openExternalURL('https://www.facebook.com/GDevelopApp')
                }
              />
              <IconButton
                iconClassName="icon-twitter"
                onClick={() =>
                  Window.openExternalURL('https://twitter.com/GDevelopApp')
                }
              />
            </div>
          </Line>
        </div>
      </ScrollBackground>
    );
  }
}

export default StartPage;

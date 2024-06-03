import * as React from 'react';
import styles from './SocialCommitment.module.scss';
import type { ISocialCommitmentProps } from './ISocialCommitmentProps';

export default class SocialCommitment extends React.Component<ISocialCommitmentProps, {}> {
  public render(): React.ReactElement<ISocialCommitmentProps> {
    // const {
    //   description,
    //   isDarkTheme,
    //   environmentMessage,
    //   hasTeamsContext,
    //   userDisplayName
    // } = this.props;

    return (
      <section className={styles.socialCommitment}>
        
      </section>
    );
  }
}

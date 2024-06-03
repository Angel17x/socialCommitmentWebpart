import * as React from 'react';
import styles from './SocialCommitment.module.scss';
import type { ISocialCommitmentProps } from './ISocialCommitmentProps';
import { HttpClient, HttpClientResponse,   } from '@microsoft/sp-http';

export default class SocialCommitment extends React.Component<ISocialCommitmentProps, {}> {
  public render(): React.ReactElement<ISocialCommitmentProps> {

    return (
      <div className={styles.socialCommitmentCard}>
        
      </div>
    );
  }

  public componentDidMount() {
    this.getListItems().then(items => {
      console.log(items); // Aquí puedes establecer el estado con los items, si es necesario
    });
  }

  private getListItems(): Promise<any> {
  // Asegúrate de que absoluteUrl apunta al subsitio correcto
  const absoluteUrl = this.props.context.pageContext.web.absoluteUrl; // Esto debería ser https://stevemacd.sharepoint.com/sites/WEBPRUEBAS
  const listUrl: string = `${absoluteUrl}/_api/web/lists/getByTitle('CompromisoSocial')/items`;

    console.log(absoluteUrl);
    console.log(listUrl);
  
    return this.props.context.httpClient.get(listUrl, HttpClient.configurations.v1)
      .then((response: HttpClientResponse ) => {
        return response.json();
      })
      .then((json:any) => {
        return json.value;
      }).catch((error: any) => {
        console.error('Error fetching list items', error);
      });
  }
}

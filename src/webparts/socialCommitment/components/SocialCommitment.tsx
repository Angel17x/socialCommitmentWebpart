import * as React from 'react';
import styles from './SocialCommitment.module.scss';
import type { ISocialCommitmentProps } from './ISocialCommitmentProps';
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { MSocialCommitment } from '../models/MSocialCommitment';


// Define the state interface
interface ISocialCommitmentState {
  list: MSocialCommitment[];
}
export default class SocialCommitment extends React.Component<ISocialCommitmentProps, ISocialCommitmentState> {

  constructor(props: ISocialCommitmentProps) {
    super(props)

    this.state = {
      list: [] as MSocialCommitment[]
    }
}
public render(): React.ReactElement<ISocialCommitmentProps> {
  return (
    <div className={styles.socialCommitmentCard}>
      {this.state.list.map((socialCommitment:MSocialCommitment) => {
        const absoluteUrl = this.props.context.pageContext.web.absoluteUrl; 
        return (
        <div key={socialCommitment.Id} >
          <div>
            <img src={`${absoluteUrl}${socialCommitment?.AttachmentFiles?.results![0].ServerRelativeUrl}`} alt={socialCommitment.Title} />
          </div>
          <div>{socialCommitment.Title}</div>
          <div>{socialCommitment.Descripci_x00f3_n}</div>
        </div>
      )})}
    </div>
  );
}

  public componentDidMount() {
    this.getListItems().then((items:MSocialCommitment[]) => {
      
      this.setState({ list: items });
      console.log(items);// Aquí puedes establecer el estado con los items, si es necesario
    });
  }

  private getListItems(): Promise<any> {
  // Asegúrate de que absoluteUrl apunta al subsitio correcto
  const absoluteUrl = this.props.context.pageContext.web.absoluteUrl; // Esto debería ser https://stevemacd.sharepoint.com/sites/WEBPRUEBAS
  const listUrl: string = `${absoluteUrl}/sites/WEBPRUEBAS/_api/web/lists/getByTitle('Compromiso Social')/items?$select=Id,Title,Descripci_x00f3_n,AttachmentFiles&$expand=AttachmentFiles`;

    console.log(absoluteUrl);
    console.log(listUrl);
  
    return this.props.context.httpClient.get(listUrl, HttpClient.configurations.v1, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json;odata=verbose',

      }
    })
      .then((response: HttpClientResponse ) => {
        return response.json();
      })
      .then((json:any) => {
        if (json.d && json.d.results) {
          return json.d.results as MSocialCommitment[]; // Devuelve directamente los resultados
        } else {
          throw new Error("No results found");
        }
      }).catch((error: any) => {
        console.error('Error fetching list items', error);
      });
  }
}

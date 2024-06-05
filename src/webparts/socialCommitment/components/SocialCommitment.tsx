import * as React from 'react';
import styles from './SocialCommitment.module.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import type { ISocialCommitmentProps } from './ISocialCommitmentProps';
import { HttpClient } from '@microsoft/sp-http';
import { MSocialCommitment } from '../models/MSocialCommitment';
import Slider from 'react-slick';

interface ISocialCommitmentState {
  list: MSocialCommitment[];
  isLoading: boolean;
  error: string | undefined;
}

export default class SocialCommitment extends React.Component<ISocialCommitmentProps, ISocialCommitmentState> {
  constructor(props: ISocialCommitmentProps) {
    super(props);
    this.state = {
      list: [],
      isLoading: true,
      error: undefined
    };
  }

  public componentDidMount() {
    this.getListItems();
  }

  private getListItems(): void {
    const absoluteUrl = this.props.context.pageContext.web.absoluteUrl;
    const listUrl = `${absoluteUrl}/sites/WEBPRUEBAS/_api/web/lists/getByTitle('Compromiso Social')/items?$select=Id,Title,Descripci_x00f3_n,AttachmentFiles&$expand=AttachmentFiles`;

    this.props.context.httpClient.get(listUrl, HttpClient.configurations.v1, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json;odata=verbose',
      }
    })
    .then(response => response.json())
    .then(json => {
      if (json.d && json.d.results) {
        this.setState({ list: json.d.results, isLoading: false });
      } else {
        throw new Error("No results found");
      }
    })
    .catch(error => {
      console.error('Error fetching list items', error);
      this.setState({ error: error.toString(), isLoading: false });
    });
  }

  public render(): React.ReactElement<ISocialCommitmentProps> {
    const { isLoading, error, list } = this.state;
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className={styles.container}>
        <Slider {...settings}>
          {list.map((item: MSocialCommitment) => (
            <div key={item.Id} className={styles.paddingCard}>
              <div className={styles.socialCommitmentCard}>
                <div className={styles.containerImage}>
                  <img src={`${this.props.context.pageContext.web.absoluteUrl}${item?.AttachmentFiles?.results![0].ServerRelativeUrl}`} alt={item.Title} />
                </div>
                <h2>{item.Title}</h2>
                <p>{item.Descripci_x00f3_n}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}
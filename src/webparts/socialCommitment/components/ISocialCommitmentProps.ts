import { WebPartContext } from "@microsoft/sp-webpart-base";
import { HttpClient } from '@microsoft/sp-http';

export interface ISocialCommitmentProps {
  // description: string;
  context: WebPartContext;
  httpClient: HttpClient;
  // isDarkTheme: boolean;
  // environmentMessage: string;
  // hasTeamsContext: boolean;
  // userDisplayName: string;
}

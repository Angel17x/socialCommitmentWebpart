export interface MSocialCommitment {
  __metadata:        ResultMetadata;
  AttachmentFiles:   AttachmentFiles;
  Id:                number;
  Title:             string;
  Descripci_x00f3_n: string;
  ID:                number;
}

export interface AttachmentFiles {
  results: Result[];
}

export interface Result {
  __metadata:         ResultMetadata;
  FileName:           string;
  FileNameAsPath:     Path;
  ServerRelativePath: Path;
  ServerRelativeUrl:  string;
}

export interface Path {
  __metadata: FileNameAsPathMetadata;
  DecodedUrl: string;
}

export interface FileNameAsPathMetadata {
  type: string;
}

export interface ResultMetadata {
  id:   string;
  uri:  string;
  type: string;
  etag: string;
}

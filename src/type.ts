type location = string;
export interface SourceFiles {
  name: string;
  hashType: string;
  hash: string;
}
export interface BangumiSource {
  id: number;
  fansub: string;
  updateDate: string;
  folder: location;
}
export interface Bangumi {
  id: number;
  name: string;
  nameCN: string;
  bangumiURL: string;
  coverPhoto: location;
  summary: string;
  director: string;
  updateDate: string;
  sources: BangumiSource[];
}
export interface BangumiMeta {
  bangumis: Bangumi[];
}

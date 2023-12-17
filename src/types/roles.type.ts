export interface IAdditionalRole {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  type: string;
}

export enum ROLES {
  CreateReplyReview = "createReplyReview",
  FeedbackModerator = "feedbackModerator",
}

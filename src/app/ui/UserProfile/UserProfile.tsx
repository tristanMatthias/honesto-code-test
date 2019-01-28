import React from 'react';
// tslint:disable-next-line:no-import-side-effect
import './user-profile.scss';

export interface UserProfileProps {
  userID: string;
}

// tslint:disable-next-line:variable-name
export const UserProfile: React.SFC<UserProfileProps> = ({userID}) => {
  return <img className='profile' src={`/content/profiles/${userID}`} alt={`User ${userID}`}/>;
};

import { useState, useRef, useEffect } from 'react';
import { GoPerson } from 'react-icons/go';
import { AiFillCaretUp, AiOutlineCaretDown } from 'react-icons/ai';
import Image from 'next/image';
import styles from './ProfileButton.module.css';

import ProfileOptions from './ProfileOptions';

export default function ProfileButton(props) {
  const { userId, profilePic } = props;
  const [showOptions, setShowOptions] = useState('hide');

  function onDisplayClick(e) {
    if (showOptions === 'hide') setShowOptions('show');
    if (showOptions === 'show') setShowOptions('hide');
  }

  return (
    <div className={styles['profile-parent']}>
      <div className={styles['profile-icon']} onClick={onDisplayClick}>
        {profilePic && <Image src={profilePic} alt="profile picture" />}
        {!profilePic && <GoPerson />}
        <AiOutlineCaretDown />
      </div>
      <div className={styles['profile-options'] + ' ' + showOptions}>
        <AiFillCaretUp />
        <ProfileOptions />
      </div>
    </div>
  );
}
